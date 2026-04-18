# Project State — QR Perks + Sascribe

**Last updated:** 2026-04-17 (Session 3)
**Projects:** qr-perks.com (Cloudflare Worker) · sascribe.com (Hugo + GitHub Actions pipeline)

---

## QR PERKS — qr-perks.com

**Worker version:** v6 (Session 10, fully finalized)
**All 14 Session 10 verification items passed: 14/14 ✅**

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Cloudflare Worker | ✅ Live | `qrperks`, deployed 2026-04-17 |
| Supabase | ✅ Live | `fsaxluprhgmyaipaujdn.supabase.co` |
| Resend Email | ✅ Live | `noreply@qr-perks.com` |
| Cloudflare Email Routing | ✅ Live | 3 rules active — support@, privacy@, contact@ → qrperks@gmail.com |

### Email Routing Rules

| Address | Destination | Rule ID |
|---------|-------------|---------|
| support@qr-perks.com | qrperks@gmail.com | 09b341ec |
| privacy@qr-perks.com | qrperks@gmail.com | 2eb2eed8 |
| contact@qr-perks.com | qrperks@gmail.com | ccbfac5d |

### Pending (QR Perks)

| Item | Priority | Notes |
|------|----------|-------|
| Twilio/SMS provider integration | MEDIUM | TCPA webhook ready; no provider configured |
| Resend domain verification | LOW | DNS added 2026-04-10; confirm in Resend dashboard |
| T9–T50 QR scanability | LOW | Auto-generated on first driver access |

### Architecture

```
qr-perks.com → Cloudflare Worker (qrperks)
  ├── / → Landing page (EN/ES, interstitial bridge)
  ├── /t{1-50} → Truck scan landing
  ├── /go/{affiliate_id} → Redirect with UTM tracking
  ├── /driver/* → Driver portal (auth-protected JWT)
  ├── /admin/* → Admin portal (password-protected)
  ├── /api/* → capture, stats, truck-name, save-qr-code, sms-webhook
  ├── /unsubscribe → Email unsubscribe (EN/ES)
  ├── /contact → Contact form → Resend → support@qr-perks.com
  └── /privacy|/terms|/disclosure|/earnings-disclaimer|/contractor|/leads-terms
```

---

## SASCRIBE — sascribe.com

**Stack:** Hugo · GitHub Actions · Cloudflare CDN
**Repo:** sascribe/sascribe-blog

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Hugo Site | ✅ Live | sascribe.com via Cloudflare Pages |
| GitHub Actions Pipeline | ✅ Live | content-pipeline.yml — scheduled runs active |
| GSC | ✅ 2 pages indexed | Homepage + ElevenLabs pillar confirmed INDEXED |
| IndexNow | ✅ Active | Key: `sascribe2026xK9mP3qR7nL5vT` |

### Workflow Schedule

```
Cron: 0 17 * * 1 → Monday long-form (17:00 UTC = 10am PDT / 9am PST)
      0 17 * * 2 → Tuesday short
      0 17 * * 4 → Thursday short
      0 17 * * 6 → Saturday short
```
Note: cron comment says "9am PT" but during PDT (summer) this fires at 10am PDT. Off by 1hr in summer — non-critical.

### GSC Status (as of 2026-04-17)

| Page | Verdict | Coverage | Last Crawl |
|------|---------|----------|------------|
| Homepage | PASS | Submitted and indexed | 2026-04-10 |
| ElevenLabs Pillar | PASS | Submitted and indexed | 2026-04-12 |
| NordVPN Review | NEUTRAL | URL is unknown to Google | never |
| Beehiiv Pillar | NEUTRAL | Discovered - currently not indexed | never |
| AdCreative Review | NEUTRAL | Discovered - currently not indexed | never |

### Content State (as of 2026-04-17 Session 3)

**20 articles published** across 5 affiliates (5 rewritten in Session 3):

| Affiliate | Articles | Last Published | Types Completed |
|-----------|----------|----------------|-----------------|
| AdCreative AI | 5 | 2026-04-13 | review, comparison, tutorial, use-cases, news |
| ElevenLabs | 4 | 2026-04-13 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | 2026-04-14 | review, comparison, pillar, news |
| Synthesia | 3 | 2026-04-16 | pillar, tutorial, news |
| NordVPN | 4 | 2026-04-17 | review, pillar, comparison, news |

**Content gaps remaining:**
- NordVPN: tutorial, use-cases, alternatives, guide (4 types)
- Synthesia: review, comparison, use-cases (3 types)
- ElevenLabs: use-cases (1 type)

### Session 3 Rewrites (2026-04-17)

All 5 rewritten in-place (same filename/slug/URL — no redirect needed):

| File | Old Title (problem) | New Title | Commit |
|------|---------------------|-----------|--------|
| nordvpn-pillar | "...meme circulating on Reddit..." hook | The Complete NordVPN Guide for 2026: Privacy, Streaming, Torrenting & Everything In Between | 4da9b316 |
| nordvpn-news | Claude meme = entire article premise; fabricated EFF stat | NordVPN 2026: What's Actually Changed and Is It Still Worth It? | 1c19a6fd |
| nordvpn-comparison | Claude meme hook (3rd use) | NordVPN vs Surfshark vs ExpressVPN vs Proton VPN: The Only Comparison You Need in 2026 | a82349ac |
| synthesia-news | PlayStation meme title (zero SEO intent) | Synthesia 2026: What the 3.0 Platform Overhaul Means for Corporate Video Teams | 940aeed1 |
| beehiiv-news | PlayStation meme title (zero SEO intent) | Beehiiv 2026: What's New, What's Changed, and Why Newsletter Creators Are Switching | 5832cc78 |

### Session 3 Pipeline Overhaul (2026-04-17)

**generate-article.js refactor — commit f8f48a2f**

Key changes from Session 2 version:
- `fetchRedditTrends()` → `fetchRedditSignals()`: adds Google CSE call for affiliate-specific Reddit threads (`site:reddit.com ${slug} review`)
- `fetchYouTubeTrends()` → `fetchYouTubeSignals()`: replaced generic `mostPopular category=28` with affiliate-targeted YouTube search (`${name} review 2026`, `${name} honest review`)
- `pickBestTopic()` → `buildResearchBrief()`: outputs structured brief with TRENDING_HOOK, REAL_USER_SIGNAL, YOUTUBE_COVERAGE, COMPETITOR_AFFILIATE_ANGLES
- New `fetchCompetitorAngles()`: Google CSE search across bloggingwizard.com, authorityhacker.com, nichepursuits.com, pcmag.com, tomsguide.com
- `generateArticle()` prompt rewritten: TRENDING_HOOK demoted to supporting context only; lead must be value-first; explicit prohibition on event-first openers
- `validateArticle()` adds hook quality check: warns if opening contains "this week", "went viral", "meme", "internet lost its mind"

**Standing rules established:**
1. Trending topics are SUPPORTING CONTEXT only — never the article premise
2. Titles must target real search queries — never reference viral events or memes
3. CSE returned 0 results for Reddit threads and competitor angles in Session 3 (likely CSE configuration issue) — YouTube search working (10 results per article)

### Session 2 Changes (2026-04-17) — previously committed but not in STATE.md

#### Mission 1 — ElevenLabs Pillar CTR Fix
- Title: 97 chars → 55 chars: "ElevenLabs 2026: Best AI Voice Generator? (I Tested It)"
- Description: 121 chars → 151 chars: first-person tested copy
- Commit: `bd96132d39`

#### Mission 2 — Pipeline Deduplication + Cooldown Fix
- `fetchRecentArticleHooks()` at line 307 — extracts named entity fingerprints from last 10 articles
- `topicMatchesRecentHooks()` at line 358 — dedup check
- `pickAffiliate()` — 7-day cooldown; explicit `--affiliate` flag logs warning but proceeds
- Commit: `c6e505e55a`

#### Mission 3 — NordVPN Content Push (3 articles, now rewritten)

| Article | Type | Commit |
|---------|------|--------|
| nordvpn-pillar | pillar | 34a790b0f9 (original) → 4da9b316 (rewrite) |
| nordvpn-comparison | comparison | d37420e906 (original) → a82349ac (rewrite) |
| nordvpn-news | news | 9e1fb5483c (original) → 1c19a6fd (rewrite) |

#### Mission 4 — GSC Indexing Investigation
- 2 pages indexed confirmed (homepage, ElevenLabs pillar)
- Sitemap resubmitted, IndexNow 21 URLs pinged

#### Mission 5 — GitHub Actions Verification
- Workflow active, cron correct, 2 runs both success

#### Mission 6 — Internal Linking Audit
- 2 ElevenLabs articles fixed (elevenlabs-comparison, elevenlabs-review)
- 0 zero-link articles

### Pending (Sascribe)

| Item | Priority | Notes |
|------|----------|-------|
| ElevenLabs pillar CTR | MONITOR | Title/meta fixed 2026-04-17 — monitor GSC 7-14 days |
| NordVPN tutorial | HIGH | Next content type for NordVPN |
| Synthesia review + comparison + use-cases | HIGH | 3 types remaining |
| ElevenLabs use-cases | MEDIUM | 1 type remaining |
| GSC indexing — remaining URLs | MEDIUM | Sitemap resubmitted + IndexNow pinged; allow 7-14 days |
| CSE configuration | MEDIUM | Reddit thread + competitor CSE searches returned 0 results — verify cx scope |
| NordVPN comparison desc fix | LOW | Was 138 chars (rewrite may have corrected) |
| Cron PDT offset | LOW | 0 17 fires at 10am PDT in summer — adjust to 0 16 if 9am PDT desired |
