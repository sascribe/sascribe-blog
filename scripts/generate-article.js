#!/usr/bin/env node
/**
 * Sascribe Content Pipeline — GitHub Actions replacement for n8n
 * Zero external dependencies — uses Node 20 built-in fetch + crypto
 *
 * Usage:
 *   node scripts/generate-article.js --type [long-form|short] --affiliate [name|auto] [--dry-run]
 *
 * Secrets (env vars):
 *   GH_TOKEN                    — GitHub personal access token
 *   ANTHROPIC_API_KEY           — Claude API key (uses claude-opus-4-6)
 *   YOUTUBE_API_KEY             — Google API key (YouTube Data API v3 + Custom Search API)
 *   GSHEETS_SERVICE_ACCOUNT_JSON — Full service account JSON (GitHub Actions)
 *   GOOGLE_APPLICATION_CREDENTIALS — Path to service account file (local)
 */

import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { argv, env, exit } from 'node:process';

// ─── Constants ────────────────────────────────────────────────────────────────

const SHEET_ID      = '1MUkQZRjOFqfpcPCnNL6sPaUETHa3I8q9okbV-wT7MXI';
const REPO          = 'sascribe/sascribe-blog';
const GH_TOKEN      = env.GH_TOKEN;
const ANTHROPIC     = env.ANTHROPIC_API_KEY;
const GOOGLE_KEY    = env.YOUTUBE_API_KEY; // Used for both YouTube Search + Custom Search API
const GOOGLE_CSE_CX = 'b5832306c3be3443d';
const INDEXNOW_KEY  = 'sascribe2026xK9mP3qR7nL5vT';

const LONG_FORM_TYPES = ['pillar', 'review', 'comparison', 'tutorial', 'use-cases', 'alternatives', 'guide'];
const SHORT_TYPES     = ['news', 'tips', 'quick-guide', 'roundup'];

const AFFILIATE_KEYWORDS = {
  adcreative: ['adcreative', 'ai ads', 'banner ads', 'advertising ai', 'ad generation', 'creative ai', 'ad design', 'marketing ai', 'ad automation', 'ad creative', 'facebook ads ai'],
  elevenlabs:  ['elevenlabs', 'eleven labs', 'voice ai', 'voice cloning', 'text to speech', 'tts', 'ai voice', 'voice synthesis', 'audiobook ai', 'podcast ai', 'ai audio', 'speech ai', 'voiceover ai'],
  synthesia:   ['synthesia', 'ai video', 'video generation', 'ai avatar', 'talking head video', 'video creation ai', 'training video ai', 'synthetic video', 'text to video'],
  beehiiv:     ['beehiiv', 'newsletter platform', 'email marketing', 'email list', 'substack alternative', 'mailchimp alternative', 'newsletter creator', 'creator economy email'],
  nordvpn:     ['nordvpn', 'nord vpn', 'best vpn', 'vpn review', 'vpn for streaming', 'vpn privacy', 'vpn security', 'virtual private network', 'cybersecurity', 'online privacy vpn'],
};

// Existing article URLs for internal linking
const INTERNAL_LINKS = {
  adcreative: {
    url:   'https://sascribe.com/posts/2026-04-01-adcreative-ai-review-1775073141037/',
    title: 'AdCreative AI Review 2026: Is It Worth $29/Month?',
  },
  elevenlabs: {
    url:   'https://sascribe.com/posts/2026-04-01-elevenlabs-pillar-1775073386400/',
    title: 'ElevenLabs 2026: New Features, Voice Cloning Updates & What\'s Changed',
  },
  synthesia: {
    url:   'https://sascribe.com/posts/2026-04-02-synthesia-pillar-1775152821147/',
    title: 'Synthesia Review 2026: AI Video Creation Platform Guide',
  },
  beehiiv: {
    url:   'https://sascribe.com/posts/2026-04-02-beehiiv-pillar-1775098345825/',
    title: 'Beehiiv Review 2026: The Complete Newsletter Platform Guide',
  },
  nordvpn: {
    url:   'https://sascribe.com/posts/2026-04-06-nordvpn-review-1775517557899/',
    title: 'NordVPN Review 2026: Is It Still the Best VPN?',
  },
};

// ─── CLI ──────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = argv.slice(2);
  const opts = { type: 'long-form', affiliate: 'auto', dryRun: false };
  for (let i = 0; i < args.length; i++) {
    if      (args[i] === '--type')      opts.type      = args[++i];
    else if (args[i] === '--affiliate') opts.affiliate = args[++i];
    else if (args[i] === '--dry-run')   opts.dryRun    = true;
  }
  if (!['long-form', 'short'].includes(opts.type)) {
    console.error('--type must be long-form or short'); exit(1);
  }
  return opts;
}

// ─── Google Auth (native JWT — zero deps) ────────────────────────────────────

function loadServiceAccount() {
  if (env.GSHEETS_SERVICE_ACCOUNT_JSON) return JSON.parse(env.GSHEETS_SERVICE_ACCOUNT_JSON);
  if (env.GOOGLE_APPLICATION_CREDENTIALS) return JSON.parse(readFileSync(env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));
  throw new Error('No Google credentials found. Set GSHEETS_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.');
}

async function getGoogleToken(sa, scope = 'https://www.googleapis.com/auth/spreadsheets') {
  const now   = Math.floor(Date.now() / 1000);
  const hdr   = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const pay   = Buffer.from(JSON.stringify({
    iss: sa.client_email, scope, aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600, iat: now,
  })).toString('base64url');
  const sign  = createSign('RSA-SHA256');
  sign.update(`${hdr}.${pay}`);
  const sig   = sign.sign(sa.private_key).toString('base64url');
  const jwt   = `${hdr}.${pay}.${sig}`;

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:   `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error(`Google token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

// ─── Sheet Operations ─────────────────────────────────────────────────────────

async function readSheet(token) {
  const url  = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:L`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await resp.json();
  if (!data.values) throw new Error(`Sheet read failed: ${JSON.stringify(data)}`);
  return data.values;
}

async function updateSheetRow(token, sheetRowNumber, contentType, newTotal, publishedTypes) {
  const today = new Date().toISOString().split('T')[0];
  const range = `Sheet1!H${sheetRowNumber}:L${sheetRowNumber}`;
  const url   = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  const resp  = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:   JSON.stringify({ values: [[contentType, today, String(newTotal), '', publishedTypes]] }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(`Sheet update failed: ${JSON.stringify(data.error)}`);
  return data;
}

async function logFailureToSheet(token, affiliateName, errorMsg) {
  const range = 'Sheet1!A:C';
  const url   = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:   JSON.stringify({ values: [[`FAILED - ${affiliateName}`, new Date().toISOString(), String(errorMsg).slice(0, 200)]] }),
  });
}

// ─── Affiliate Selection ──────────────────────────────────────────────────────

function parseAffiliate(row, rowIndex) {
  return {
    rowNumber:      rowIndex + 1,
    name:           row[0] || '',
    slug:           (row[3] || '').toLowerCase().trim(),
    dosAndDonts:    row[4] || '',
    status:         (row[5] || '').trim(),
    imagePath:      row[6] || '',
    lastContentType: row[7] || '',
    lastPublished:  row[8] || '2000-01-01',
    totalPublished: parseInt(row[9] || '0', 10),
    imageStyle:     (row[10] || 'logo').trim(),
    publishedTypes: (row[11] || '').split(',').map(t => t.trim()).filter(Boolean),
  };
}

function pickAffiliate(rows, requestedSlug, type) {
  const typePool  = type === 'long-form' ? LONG_FORM_TYPES : SHORT_TYPES;
  const COOLDOWN_DAYS = 7;
  const now = Date.now();
  function withinCooldown(aff) {
    const last = new Date(aff.lastPublished).getTime();
    return (now - last) < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  }

  const affiliates = rows.slice(1)
    .map((row, idx) => parseAffiliate(row, idx + 1))
    .filter(a => a.status === 'active');

  if (!affiliates.length) throw new Error('No active affiliates in Sheet');

  if (requestedSlug !== 'auto') {
    const aff = affiliates.find(
      a => a.slug === requestedSlug.toLowerCase() ||
           a.name.toLowerCase() === requestedSlug.toLowerCase()
    );
    if (!aff) throw new Error(`Affiliate not found: ${requestedSlug}`);
    if (withinCooldown(aff)) {
      console.warn(`   ⚠️  Cooldown: ${aff.name} last published ${aff.lastPublished} (within ${COOLDOWN_DAYS}d) — proceeding (explicit --affiliate flag)`);
    }
    const available = typePool.filter(t => !aff.publishedTypes.includes(t));
    const contentType = available.length ? available[0] : typePool[typePool.length - 1] + '-v2';
    return { affiliate: aff, contentType };
  }

  const sorted     = [...affiliates].sort((a, b) => new Date(a.lastPublished) - new Date(b.lastPublished));
  const mostRecent = sorted[sorted.length - 1];

  const coolFree = sorted.filter(a => !withinCooldown(a));
  const pool = coolFree.length ? coolFree : sorted;
  if (!coolFree.length) console.log(`   ℹ️  All affiliates within ${COOLDOWN_DAYS}-day cooldown — using oldest`);
  else if (coolFree.length < sorted.length) {
    const skipped = sorted.filter(a => withinCooldown(a)).map(a => a.name).join(', ');
    console.log(`   ⏭  Cooldown skip: ${skipped}`);
  }

  for (const aff of pool) {
    if (pool.length > 1 && aff.slug === mostRecent.slug) continue;
    const available = typePool.filter(t => !aff.publishedTypes.includes(t));
    if (available.length) return { affiliate: aff, contentType: available[0] };
  }
  const aff = pool[0];
  const available = typePool.filter(t => !aff.publishedTypes.includes(t));
  return { affiliate: aff, contentType: available.length ? available[0] : typePool[0] };
}

// ─── Research: Reddit signals ─────────────────────────────────────────────────

async function fetchRedditSignals(affiliateSlug) {
  const signals = [];

  // 1. General AI/tech trending posts (for supporting context only — NOT the article premise)
  const subs = ['artificial', 'ChatGPT', 'MachineLearning'];
  for (const sub of subs) {
    try {
      const resp = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?t=week&limit=5`,
        {
          headers: { 'User-Agent': 'SascribeBot/1.0 (+https://sascribe.com; content research)' },
          signal:  AbortSignal.timeout(8000),
        }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const c of (data?.data?.children || [])) {
        signals.push({
          type:     'trending',
          title:    c.data.title,
          score:    c.data.score,
          comments: c.data.num_comments,
          sub,
        });
      }
    } catch { /* Reddit may block — continue */ }
  }

  // 2. Affiliate-specific Reddit threads via CSE — real user opinions
  if (GOOGLE_KEY) {
    try {
      const query = encodeURIComponent(`site:reddit.com ${affiliateSlug} review`);
      const url   = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_CSE_CX}&q=${query}&num=5`;
      const resp  = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (resp.ok) {
        const data = await resp.json();
        for (const item of (data.items || [])) {
          signals.push({
            type:    'user_thread',
            title:   item.title,
            snippet: (item.snippet || '').slice(0, 250),
            url:     item.link,
          });
        }
      }
    } catch { /* CSE failure is non-fatal */ }
  }

  return signals;
}

// ─── Research: YouTube signals ────────────────────────────────────────────────

async function fetchYouTubeSignals(affiliateSlug, affiliateName) {
  const signals = [];
  if (!GOOGLE_KEY) return signals;

  // Affiliate-targeted YouTube search (replaces generic mostPopular category 28)
  const queries = [
    `${affiliateName} review 2026`,
    `${affiliateName} honest review`,
  ];

  for (const q of queries) {
    try {
      const resp = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&order=viewCount&maxResults=5&key=${GOOGLE_KEY}`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const item of (data.items || [])) {
        signals.push({
          type:         'youtube',
          title:        item.snippet.title,
          snippet:      (item.snippet.description || '').slice(0, 300),
          channelTitle: item.snippet.channelTitle,
          query:        q,
        });
      }
    } catch { /* non-fatal */ }
  }

  return signals;
}

// ─── Research: Competitor affiliate angles ────────────────────────────────────

async function fetchCompetitorAngles(affiliateName, contentType) {
  if (!GOOGLE_KEY) return [];
  const angles = [];
  try {
    const siteFilter = 'site:bloggingwizard.com OR site:authorityhacker.com OR site:nichepursuits.com OR site:affiliatefix.com OR site:pcmag.com OR site:tomsguide.com';
    const q = encodeURIComponent(`${affiliateName} ${contentType} ${siteFilter}`);
    const resp = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_CSE_CX}&q=${q}&num=5`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!resp.ok) return angles;
    const data = await resp.json();
    for (const item of (data.items || [])) {
      let hostname = item.link;
      try { hostname = new URL(item.link).hostname; } catch {}
      angles.push({
        title:   item.title,
        snippet: (item.snippet || '').slice(0, 250),
        site:    hostname,
      });
    }
  } catch { /* non-fatal */ }
  return angles;
}

// ─── Research: Recent article hook deduplication ──────────────────────────────

async function fetchRecentArticleHooks() {
  try {
    const resp = await fetch(
      `https://api.github.com/repos/${REPO}/contents/content/posts`,
      { headers: { Authorization: `token ${GH_TOKEN}` } }
    );
    if (!resp.ok) return new Set();
    const files = await resp.json();
    const posts = files
      .filter(f => f.name.endsWith('.md') && f.name !== '.gitkeep')
      .sort((a, b) => b.name.localeCompare(a.name))
      .slice(0, 10);

    const STOP = new Set([
      'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
      'is','are','was','were','be','been','have','has','had','do','does','did',
      'will','would','could','should','may','might','can','how','what','why','when',
      'where','who','which','this','that','these','those','its','your','our','their',
      'my','i','we','you','he','she','they','it','vs','versus','best','top','new',
      'here','make','use','get','using','from','into','than','more','most','about',
      'up','as','not','so','no','if','just','now','also','then','2025','2026',
      'ai','review','guide','complete','tutorial','between','them'
    ]);

    const hooks = new Set();
    for (const file of posts) {
      try {
        const r = await fetch(file.download_url, { signal: AbortSignal.timeout(6000) });
        const text = await r.text();
        const titleM = text.match(/^title:\s*[\"'"]?(.+?)[\"'"]?\s*$/m);
        const descM  = text.match(/^description:\s*[\"'"](.+?)[\"'"]\s*$/m);
        const combined = [(titleM?.[1] || ''), (descM?.[1] || '')].join(' ');
        const tokens = combined.replace(/[^\w\s]/g, ' ').split(/\s+/);
        for (const tok of tokens) {
          if (tok.length >= 4 && /^[A-Z]/.test(tok) && !STOP.has(tok.toLowerCase())) {
            hooks.add(tok.toLowerCase());
          }
        }
        const known = combined.match(/\b(Sam Altman|PlayStation|OpenAI|ChatGPT|Reddit|YouTube|Netflix|Google|Apple|Microsoft|Meta|Instagram|TikTok|Twitter|Elon Musk|Mark Zuckerberg|Jeff Bezos|Bing|Gemini|Grok|DeepSeek)\b/gi) || [];
        for (const e of known) hooks.add(e.toLowerCase());
      } catch { /* skip file on timeout */ }
    }
    return hooks;
  } catch {
    return new Set();
  }
}

function topicMatchesRecentHooks(topicTitle, recentHooks) {
  const TITLE_STOPS = new Set(['Best','Top','New','Review','Guide','Complete','Tutorial',
    'How','What','Why','When','Where','Which','The','Get','Use','Make','Your']);
  const entities = topicTitle.match(/\b[A-Z][a-zA-Z]{3,}(?:\s+[A-Z][a-zA-Z]{3,})?\b/g) || [];
  for (const entity of entities) {
    if (!TITLE_STOPS.has(entity) && recentHooks.has(entity.toLowerCase())) {
      return entity;
    }
  }
  return null;
}

// ─── Research Brief Builder ───────────────────────────────────────────────────

async function buildResearchBrief(affiliate, contentType, recentHooks) {
  const { slug, name } = affiliate;

  console.log(`   📡 Fetching Reddit signals, YouTube signals, competitor angles...`);

  const [redditSignals, ytSignals, competitorAngles] = await Promise.all([
    fetchRedditSignals(slug),
    fetchYouTubeSignals(slug, name),
    fetchCompetitorAngles(name, contentType),
  ]);

  // Trending posts — sorted by engagement, for SUPPORTING CONTEXT ONLY
  const trendingPosts = redditSignals
    .filter(s => s.type === 'trending')
    .sort((a, b) => (b.score + b.comments * 2) - (a.score + a.comments * 2));

  // Dedup: skip trending hooks that appear in recent articles
  let trendingHook = null;
  for (const post of trendingPosts) {
    const match = topicMatchesRecentHooks(post.title, recentHooks);
    if (match) {
      console.log(`   ⏭  Skipping trending hook "${post.title.slice(0, 60)}" — entity "${match}" in recent articles`);
      continue;
    }
    trendingHook = post;
    break;
  }

  const userThreads = redditSignals.filter(s => s.type === 'user_thread');
  const ytResults   = ytSignals.filter(s => s.type === 'youtube');

  const brief = {
    TARGET_KEYWORD: `${name.toLowerCase()} ${contentType === 'news' ? '2026' : contentType + ' 2026'}`,

    TRENDING_HOOK: trendingHook
      ? `"${trendingHook.title}" (r/${trendingHook.sub}, score ${trendingHook.score}) — supporting context only, ONE paragraph max, NOT the article premise or opening hook`
      : 'No trending hook available — use an evergreen, problem-first opening',

    REAL_USER_SIGNAL: userThreads.length
      ? userThreads.slice(0, 3).map(t => `- "${t.title}"\n  ${t.snippet}`).join('\n')
      : `No direct Reddit threads found for ${name} — synthesize from known user pain points and common questions`,

    YOUTUBE_COVERAGE: ytResults.length
      ? ytResults.slice(0, 5).map(v => `- [${v.channelTitle}] "${v.title}": ${v.snippet}`).join('\n')
      : `No YouTube results found — reference known ${name} features and use cases`,

    COMPETITOR_AFFILIATE_ANGLES: competitorAngles.length
      ? competitorAngles.slice(0, 4).map(a => `- [${a.site}] "${a.title}": ${a.snippet}`).join('\n')
      : `No competitor results found — focus on ${name}'s differentiating features vs alternatives`,
  };

  console.log(`   ✅ Brief: ${userThreads.length} user threads, ${ytResults.length} YT signals, ${competitorAngles.length} competitor angles, trending hook: ${trendingHook ? `"${trendingHook.title.slice(0,50)}..."` : 'none (evergreen)'}`);

  return brief;
}

// ─── Image Picker ─────────────────────────────────────────────────────────────

async function pickImage(affiliateImagePath) {
  if (/\.(png|jpg|jpeg|webp|svg)$/i.test(affiliateImagePath)) return affiliateImagePath;

  const dir  = affiliateImagePath.replace(/^\//, '').replace(/\/$/, '');
  const url  = `https://api.github.com/repos/${REPO}/contents/static/${dir}`;
  try {
    const resp = await fetch(url, { headers: { Authorization: `token ${GH_TOKEN}` } });
    if (!resp.ok) return affiliateImagePath + 'logo.png';
    const files  = await resp.json();
    const images = files.filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f.name));
    if (!images.length) return affiliateImagePath + 'logo.png';
    const picked = images[Math.floor(Math.random() * images.length)];
    return affiliateImagePath + picked.name;
  } catch {
    return affiliateImagePath + 'logo.png';
  }
}

// ─── Article Generation ───────────────────────────────────────────────────────

async function generateArticle({ affiliate, contentType, brief, imagePath, type }) {
  const wordCount = type === 'long-form' ? '2000–2500' : '800–1000';
  const today     = new Date().toISOString().split('T')[0];
  const link      = INTERNAL_LINKS[affiliate.slug];

  const prompt = `You are Sascribe's expert affiliate content writer. Write a complete Hugo markdown article. Output ONLY the article — no preamble, no explanation, no \`\`\`markdown fences.

═══ ASSIGNMENT ═══
AFFILIATE:       ${affiliate.name}
CONTENT TYPE:    ${contentType}
WORD COUNT:      ${wordCount} words
DATE:            ${today}
TARGET KEYWORD:  ${brief.TARGET_KEYWORD}

═══ RESEARCH BRIEF ═══
Use this brief to drive the article's editorial angle. The article must emerge from this research — not from a trending event.

TRENDING HOOK (supporting context only — see rules below):
${brief.TRENDING_HOOK}

REAL USER SIGNALS — ground the article in actual reader experience. Use ≥2 of these:
${brief.REAL_USER_SIGNAL}

YOUTUBE COVERAGE — what existing video content covers. Find the angle they missed:
${brief.YOUTUBE_COVERAGE}

COMPETITOR AFFILIATE ANGLES — what top affiliate blogs say. Do NOT repeat these framings:
${brief.COMPETITOR_AFFILIATE_ANGLES}

═══ CRITICAL EDITORIAL RULES ═══
1. LEAD WITH VALUE, NOT A TREND: Your opening paragraph must state the reader's problem or the opportunity directly. Do NOT open with "This week on Reddit..." or "A viral video shows..." or any event-first framing. Start with what the reader needs to know.
2. DIFFERENTIATE: The competitor angles above represent what is already covered. Write what they missed — a sharper angle, a specific use case, a comparison they skipped, or a real user concern they glossed over.
3. USE REAL DATA: Include specific feature names, pricing tiers, and verifiable facts about ${affiliate.name}. Do not write generic filler like "this powerful tool" or "game-changing solution."
4. TRENDING HOOK — if used: One paragraph only. Appears in the second or third section as supporting context, not as the article's premise. Its job is to make the affiliate topic feel timely, not to lead the story.
5. EXPERT VOICE: Write like someone who has used the product for months and has formed concrete opinions, not someone summarizing a marketing page.

═══ AFFILIATE RULES (follow strictly) ═══
${affiliate.dosAndDonts}

═══ REQUIRED FRONTMATTER (copy structure exactly) ═══
---
title: "[Compelling H1 title targeting the primary search query for ${contentType} about ${affiliate.name} — must answer a real search query, must NOT reference a trending event or meme]"
date: ${today}
draft: false
description: "[EXACTLY 150-160 characters — keyword-rich, compelling, includes ${affiliate.name} and year 2026]"
tags: ["AI Tools", "saas", "${affiliate.name}"]
categories: ["AI Tools"]
cover:
  image: "${imagePath}"
  alt: "${affiliate.name} ${contentType} 2026"
  style: "${affiliate.imageStyle}"
affiliateURL: "https://sascribe.com/go/${affiliate.slug}"
affiliateName: "${affiliate.name}"
schema: "BlogPosting"
---

═══ ARTICLE BODY RULES ═══
1. FIRST PARAGRAPH: Problem-first or benefit-first. What specific problem does ${affiliate.name} solve? What outcome does it unlock? No affiliate link. No event references.
2. STRUCTURE: H1 is the title. Use 3–5 H2 headings with secondary keywords. H3 for sub-sections.
3. AFFILIATE LINK: At least once in body (not first paragraph): [Try ${affiliate.name}](https://sascribe.com/go/${affiliate.slug})
4. INTERNAL LINK: Exactly once, placed naturally:
   [${link?.title || affiliate.name + ' overview'}](${link?.url || 'https://sascribe.com/posts/'})
5. NO FTC DISCLOSURE in body — site template renders it automatically.
6. NO screenshot embeds. No placeholder image tags.
7. BE SPECIFIC: Real feature names, real pricing, real use cases with specifics.

═══ FAQ SECTION (required at end) ═══
## Frequently Asked Questions

### [Real question real users search about ${affiliate.name}?]
[Answer — 2–3 sentences, specific]

### [Question 2?]
[Answer]

### [Question 3?]
[Answer]

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1?]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2?]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    },
    {
      "@type": "Question",
      "name": "[Question 3?]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 3]" }
    }
  ]
}
</script>

═══ BEGIN ARTICLE NOW ═══`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         ANTHROPIC,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-opus-4-6',
      max_tokens: 8000,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Anthropic API ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  let content = data.content?.[0]?.text;
  if (!content) throw new Error(`Empty response from Anthropic: ${JSON.stringify(data)}`);

  // Strip code fences if Claude added them
  content = content.replace(/^```[\w]*\n?/, '').replace(/\n?```\s*$/, '');

  return content;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateArticle(content, affiliate) {
  const issues = [];

  if (!content.startsWith('---'))                               issues.push('CRITICAL: Missing YAML frontmatter');
  if (!content.includes('draft: false'))                        issues.push('Missing draft: false');
  if (!content.includes('affiliateURL:'))                       issues.push('CRITICAL: Missing affiliateURL');
  if (!content.includes('affiliateName:'))                      issues.push('Missing affiliateName');
  if (!content.includes('schema: "BlogPosting"'))               issues.push('Missing schema: BlogPosting');
  if (!content.includes('cover:'))                              issues.push('CRITICAL: Missing cover block');
  if (!content.includes(`sascribe.com/go/${affiliate.slug}`))   issues.push('CRITICAL: Missing affiliate link');
  if (!content.includes('FAQPage'))                             issues.push('Missing FAQPage JSON-LD');

  const descMatch = content.match(/description:\s*"([^"]+)"/);
  if (descMatch) {
    const len = descMatch[1].length;
    if (len < 140 || len > 165) issues.push(`Description length ${len} chars (target 150-160)`);
  } else {
    issues.push('Missing description field');
  }

  const link = INTERNAL_LINKS[affiliate.slug];
  if (link && !content.includes(link.url)) issues.push(`Missing internal link to ${link.url}`);

  // Hook quality check: warn if opening paragraph contains event-first framing
  const bodyStart = content.indexOf('---', 3);
  const bodySlice = content.slice(bodyStart + 3, bodyStart + 600).trim();
  const hookPatterns = [/this week/i, /went viral/i, /\bmeme\b/i, /reddit.*now/i, /internet.*lost.*mind/i];
  for (const p of hookPatterns) {
    if (p.test(bodySlice.slice(0, 300))) {
      issues.push(`WARN: Opening paragraph may contain event-first framing — review before publishing`);
      break;
    }
  }

  return issues;
}

// ─── GitHub Commit ────────────────────────────────────────────────────────────

async function commitArticle(content, affiliateName, affiliateSlug, contentType) {
  const today    = new Date().toISOString().split('T')[0];
  const ts       = Date.now();
  const filename = `${today}-${affiliateSlug}-${contentType.replace(/[^a-z0-9-]/g, '-')}-${ts}.md`;
  const path     = `content/posts/${filename}`;
  const encoded  = Buffer.from(content, 'utf8').toString('base64');

  const resp = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GH_TOKEN}`, 'Content-Type': 'application/json' },
    body:   JSON.stringify({
      message: `content: add ${affiliateName} ${contentType} article`,
      content: encoded,
    }),
  });

  const data = await resp.json();
  if (!resp.ok) throw new Error(`GitHub commit failed: ${JSON.stringify(data)}`);
  return { filename, path, commitSha: data.commit.sha };
}

// ─── IndexNow ─────────────────────────────────────────────────────────────────

async function pingIndexNow(articleUrl) {
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body:    JSON.stringify({ host: 'sascribe.com', key: INDEXNOW_KEY, urlList: [articleUrl] }),
      signal:  AbortSignal.timeout(5000),
    });
  } catch { /* non-fatal */ }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  console.log('');
  console.log(`📰 Sascribe Pipeline`);
  console.log(`   type:      ${opts.type}`);
  console.log(`   affiliate: ${opts.affiliate}`);
  console.log(`   dry-run:   ${opts.dryRun}`);
  console.log('');

  // ── Auth ──
  const sa    = loadServiceAccount();
  const token = await getGoogleToken(sa);
  console.log('✅ Google Sheets auth OK');

  // ── Sheet ──
  const rows = await readSheet(token);
  console.log(`✅ Sheet read — ${rows.length - 1} affiliates`);

  // ── Pick affiliate + type ──
  const { affiliate, contentType } = pickAffiliate(rows, opts.affiliate, opts.type);
  console.log(`✅ Selected affiliate: ${affiliate.name} (row ${affiliate.rowNumber})`);
  console.log(`✅ Content type: ${contentType}`);

  // ── Research ──
  console.log('🔍 Building research brief (Reddit + YouTube + CSE + recent hooks)...');
  const recentHooks = await fetchRecentArticleHooks();
  console.log(`   Hook fingerprints: ${recentHooks.size}`);
  const brief = await buildResearchBrief(affiliate, contentType, recentHooks);

  // ── Image ──
  const imagePath = await pickImage(affiliate.imagePath);
  console.log(`✅ Image: ${imagePath}`);

  // ── Generate ──
  console.log(`\n🤖 Generating article with claude-opus-4-6...`);
  const articleContent = await generateArticle({
    affiliate, contentType, brief, imagePath, type: opts.type,
  });
  console.log(`✅ Article generated (${articleContent.length} chars)`);

  // ── Validate ──
  const issues   = validateArticle(articleContent, affiliate);
  const critical = issues.filter(i => i.startsWith('CRITICAL'));
  if (issues.length > 0) issues.forEach(i => console.warn(`   ⚠️  ${i}`));
  if (critical.length > 0) throw new Error(`Critical validation failures: ${critical.join('; ')}`);
  if (issues.length === 0) console.log('✅ Validation passed');

  // ── Dry run ──
  if (opts.dryRun) {
    console.log('\n──────────────────── DRY RUN OUTPUT ─────────────────────────\n');
    console.log(articleContent);
    console.log('\n──────────────────── END DRY RUN ─────────────────────────────\n');
    console.log('✅ Dry run complete — no commits or sheet updates made\n');
    return;
  }

  // ── Commit ──
  console.log('\n📤 Committing to GitHub...');
  const { filename, commitSha } = await commitArticle(
    articleContent, affiliate.name, affiliate.slug, contentType
  );
  console.log(`✅ Committed: ${filename}`);
  console.log(`   Commit SHA: ${commitSha}`);

  // ── Sheet update ──
  const newTotal          = affiliate.totalPublished + 1;
  const newPublishedTypes = [...affiliate.publishedTypes, contentType].join(',');
  await updateSheetRow(token, affiliate.rowNumber, contentType, newTotal, newPublishedTypes);
  console.log(`✅ Sheet updated — total: ${newTotal}, types: ${newPublishedTypes}`);

  // ── IndexNow ──
  const articleUrl = `https://sascribe.com/posts/${filename.replace('.md', '')}/`;
  await pingIndexNow(articleUrl);
  console.log(`✅ IndexNow ping: ${articleUrl}`);

  console.log(`\n🎉 Done!`);
  console.log(`   Article URL: ${articleUrl}`);
  console.log(`   Commit:      ${commitSha}\n`);
}

// ─── Error Handler ────────────────────────────────────────────────────────────

main().catch(async err => {
  console.error('\n❌ Pipeline FAILED:', err.message);
  try {
    const sa    = loadServiceAccount();
    const token = await getGoogleToken(sa);
    await logFailureToSheet(token, 'pipeline', err.message);
    console.log('📋 Failure logged to Sheet');
  } catch { /* don't mask original error */ }
  exit(1);
});
