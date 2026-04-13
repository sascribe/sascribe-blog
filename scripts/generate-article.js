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
 *   YOUTUBE_API_KEY             — YouTube Data API v3 key
 *   GSHEETS_SERVICE_ACCOUNT_JSON — Full service account JSON (GitHub Actions)
 *   GOOGLE_APPLICATION_CREDENTIALS — Path to service account file (local)
 */

import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { argv, env, exit } from 'node:process';

// ─── Constants ────────────────────────────────────────────────────────────────

const SHEET_ID     = '1MUkQZRjOFqfpcPCnNL6sPaUETHa3I8q9okbV-wT7MXI';
const REPO         = 'sascribe/sascribe-blog';
const GH_TOKEN     = env.GH_TOKEN;
const ANTHROPIC    = env.ANTHROPIC_API_KEY;
const YOUTUBE_KEY  = env.YOUTUBE_API_KEY;
const INDEXNOW_KEY = 'sascribe2026xK9mP3qR7nL5vT';

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
  // sheetRowNumber is 1-based (row 1 = header, row 2 = first data row)
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
    rowNumber:      rowIndex + 1,        // 1-based sheet row (header = row 1, first data = row 2)
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
  // rows[0] is header — data starts at rows[1], rowNumber = index+1 for the array, but sheet row = index+1 (1-indexed)
  const affiliates = rows.slice(1)
    .map((row, idx) => parseAffiliate(row, idx + 1)) // idx+1 so rowNumber starts at 2 (row 1 = header)
    .filter(a => a.status === 'active');

  if (!affiliates.length) throw new Error('No active affiliates in Sheet');

  if (requestedSlug !== 'auto') {
    const aff = affiliates.find(
      a => a.slug === requestedSlug.toLowerCase() ||
           a.name.toLowerCase() === requestedSlug.toLowerCase()
    );
    if (!aff) throw new Error(`Affiliate not found: ${requestedSlug}`);
    const available = typePool.filter(t => !aff.publishedTypes.includes(t));
    const contentType = available.length ? available[0] : typePool[typePool.length - 1] + '-v2';
    return { affiliate: aff, contentType };
  }

  // Auto: sort by lastPublished ASC (oldest first). Skip the single most-recently-published to avoid repeats.
  const sorted     = [...affiliates].sort((a, b) => new Date(a.lastPublished) - new Date(b.lastPublished));
  const mostRecent = [...affiliates].sort((a, b) => new Date(b.lastPublished) - new Date(a.lastPublished))[0];

  for (const aff of sorted) {
    if (sorted.length > 1 && aff.slug === mostRecent.slug) continue;
    const available = typePool.filter(t => !aff.publishedTypes.includes(t));
    if (available.length) return { affiliate: aff, contentType: available[0] };
  }
  // Fallback: oldest regardless of repeat prevention
  const aff = sorted[0];
  const available = typePool.filter(t => !aff.publishedTypes.includes(t));
  return { affiliate: aff, contentType: available.length ? available[0] : typePool[0] };
}

// ─── Research: Reddit ─────────────────────────────────────────────────────────

async function fetchRedditTrends(affiliateSlug) {
  const subs = ['artificial', 'ChatGPT', 'MachineLearning'];
  const posts = [];
  for (const sub of subs) {
    try {
      const resp = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?t=week&limit=10`,
        {
          headers: { 'User-Agent': 'SascribeBot/1.0 (+https://sascribe.com; content research)' },
          signal:  AbortSignal.timeout(8000),
        }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const c of (data?.data?.children || [])) {
        posts.push({ title: c.data.title, score: c.data.score, comments: c.data.num_comments, sub });
      }
    } catch { /* n8n working insight: Reddit may block — continue */ }
  }
  return posts;
}

// ─── Research: YouTube ────────────────────────────────────────────────────────

async function fetchYouTubeTrends() {
  if (!YOUTUBE_KEY) return [];
  try {
    const resp = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&videoCategoryId=28&maxResults=20&key=${YOUTUBE_KEY}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.items || []).map(v => ({
      title:   v.snippet.title,
      snippet: (v.snippet.description || '').slice(0, 300),
      views:   parseInt(v.statistics?.viewCount || '0', 10),
    }));
  } catch { return []; }
}

// ─── Topic Scoring ────────────────────────────────────────────────────────────

function pickBestTopic(redditPosts, ytVideos, affiliateSlug) {
  const kws = AFFILIATE_KEYWORDS[affiliateSlug] || [];
  function relevance(text) {
    const t = (text || '').toLowerCase();
    const hits = kws.filter(k => t.includes(k)).length;
    return hits / Math.max(kws.length, 1);
  }

  const topics = [
    ...redditPosts.map(p => ({
      source:     'reddit',
      title:      p.title,
      engagement: p.score + p.comments * 2,
      relevance:  relevance(p.title),
    })),
    ...ytVideos.map(v => ({
      source:     'youtube',
      title:      v.title,
      engagement: v.views / 1000,
      relevance:  relevance(v.title + ' ' + v.snippet),
    })),
  ];

  if (!topics.length) return null;
  const maxEng = Math.max(...topics.map(t => t.engagement), 1);
  return topics
    .map(t => ({ ...t, score: 0.5 * (t.engagement / maxEng) + 0.5 * t.relevance }))
    .sort((a, b) => b.score - a.score)[0];
}

// ─── Image Picker ─────────────────────────────────────────────────────────────

async function pickImage(affiliateImagePath) {
  // If it's already a full file path (has extension), return as-is
  if (/\.(png|jpg|jpeg|webp|svg)$/i.test(affiliateImagePath)) return affiliateImagePath;

  // Directory — list and pick random image
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

async function generateArticle({ affiliate, contentType, trendingTopic, imagePath, type }) {
  const wordCount   = type === 'long-form' ? '2000–2500' : '800–1000';
  const today       = new Date().toISOString().split('T')[0];
  const link        = INTERNAL_LINKS[affiliate.slug];
  const topicLine   = trendingTopic
    ? `TRENDING ANGLE: "${trendingTopic.title}" (${trendingTopic.source}, score: ${trendingTopic.score.toFixed(2)})`
    : 'TRENDING ANGLE: Use a current 2026 angle relevant to the affiliate.';

  const prompt = `You are Sascribe's expert affiliate content writer. Write a complete Hugo markdown article. Output ONLY the article — no preamble, no explanation, no \`\`\`markdown fences.

═══ ASSIGNMENT ═══
AFFILIATE:       ${affiliate.name}
CONTENT TYPE:    ${contentType}
WORD COUNT:      ${wordCount} words
DATE:            ${today}
${topicLine}

═══ AFFILIATE RULES (follow strictly) ═══
${affiliate.dosAndDonts}

═══ REQUIRED FRONTMATTER (copy structure exactly) ═══
---
title: "[Compelling click-worthy H1 title targeting primary keyword for ${contentType} about ${affiliate.name}]"
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
1. FIRST PARAGRAPH: Strong, specific hook that establishes the problem/opportunity. NO affiliate link in first paragraph.
2. STRUCTURE: H1 is the title above. Use 3–5 H2 headings with secondary keywords. H3 allowed for sub-sections.
3. AFFILIATE LINK: Include at least once in body (not first paragraph): [Try ${affiliate.name}](https://sascribe.com/go/${affiliate.slug})
4. INTERNAL LINK: Include exactly once, placed naturally in a relevant section:
   [${link?.title || affiliate.name + ' overview'}](${link?.url || 'https://sascribe.com/posts/'})
5. NO FTC DISCLOSURE in body — the site template renders it automatically. Do not add it.
6. NO screenshot embeds. No placeholder image tags.
7. BE SPECIFIC: Real feature names, real pricing tiers, real use cases. No generic filler.

═══ FAQ SECTION (required at end of article) ═══
Add a visible H2 FAQ section followed immediately by FAQPage JSON-LD.

Format:
## Frequently Asked Questions

### [Question 1?]
[Answer 1 — 2–3 sentences, specific and helpful]

### [Question 2?]
[Answer 2]

### [Question 3?]
[Answer 3]

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
      'x-api-key':          ANTHROPIC,
      'anthropic-version':  '2023-06-01',
      'content-type':       'application/json',
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

  // Strip code fences (Working Insight #43)
  content = content.replace(/^```[\w]*\n?/, '').replace(/\n?```\s*$/, '');

  return content;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateArticle(content, affiliate) {
  const issues = [];

  if (!content.startsWith('---'))                          issues.push('CRITICAL: Missing YAML frontmatter');
  if (!content.includes('draft: false'))                   issues.push('Missing draft: false');
  if (!content.includes('affiliateURL:'))                  issues.push('CRITICAL: Missing affiliateURL');
  if (!content.includes('affiliateName:'))                 issues.push('Missing affiliateName');
  if (!content.includes('schema: "BlogPosting"'))          issues.push('Missing schema: BlogPosting');
  if (!content.includes('cover:'))                         issues.push('CRITICAL: Missing cover block');
  if (!content.includes(`sascribe.com/go/${affiliate.slug}`)) issues.push('CRITICAL: Missing affiliate link');
  if (!content.includes('FAQPage'))                        issues.push('Missing FAQPage JSON-LD');

  const descMatch = content.match(/description:\s*"([^"]+)"/);
  if (descMatch) {
    const len = descMatch[1].length;
    if (len < 140 || len > 165) issues.push(`Description length ${len} chars (target 150-160)`);
  } else {
    issues.push('Missing description field');
  }

  const link = INTERNAL_LINKS[affiliate.slug];
  if (link && !content.includes(link.url)) issues.push(`Missing internal link to ${link.url}`);

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
  console.log('🔍 Fetching trends (Reddit + YouTube)...');
  const [redditPosts, ytVideos] = await Promise.all([
    fetchRedditTrends(affiliate.slug),
    fetchYouTubeTrends(),
  ]);
  console.log(`   Reddit posts: ${redditPosts.length} | YouTube videos: ${ytVideos.length}`);
  const trendingTopic = pickBestTopic(redditPosts, ytVideos, affiliate.slug);
  if (trendingTopic) {
    console.log(`✅ Best topic: "${trendingTopic.title.slice(0, 70)}" (score: ${trendingTopic.score.toFixed(2)})`);
  } else {
    console.log('⚠️  No trending topics found — using evergreen angle');
  }

  // ── Image ──
  const imagePath = await pickImage(affiliate.imagePath);
  console.log(`✅ Image: ${imagePath}`);

  // ── Generate ──
  console.log(`\n🤖 Generating article with claude-opus-4-6...`);
  const articleContent = await generateArticle({
    affiliate, contentType, trendingTopic, imagePath, type: opts.type,
  });
  console.log(`✅ Article generated (${articleContent.length} chars)`);

  // ── Validate ──
  const issues = validateArticle(articleContent, affiliate);
  const critical = issues.filter(i => i.startsWith('CRITICAL'));
  if (issues.length > 0) {
    issues.forEach(i => console.warn(`   ⚠️  ${i}`));
  }
  if (critical.length > 0) {
    throw new Error(`Critical validation failures: ${critical.join('; ')}`);
  }
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
  const newTotal         = affiliate.totalPublished + 1;
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
