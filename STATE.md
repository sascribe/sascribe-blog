# Project State — QR Perks + Sascribe

**Last updated:** 2026-04-19 (Session 5 — 7 Fixes)
**Projects:** qr-perks.com (Cloudflare Worker) · sascribe.com (Hugo + GitHub Actions pipeline)

---

## QR PERKS — qr-perks.com

**Worker version:** v6 (Session 10, fully finalized)**
**All 14 Session 10 verification items passed: 14/14 ✅**

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Cloudflare Worker | ✅ Live | `qrperks`, deployed 2026-04-17 |
| Supabase | ✅ Live | `fsaxluprhgmyaipaujdn.supabase.co` |
| Resend Email | ✅ Live | `noreply@qr-perks.com` |
| Cloudflare Email Routing | ✅ Live | 3 rules active — support@, privacy@, contact@ → qrperks@gmail.com |

### Pending (QR Perks)

| Item | Priority | Notes |
|------|----------|-------|
| Twilio/SMS provider integration | MEDIUM | TCPA webhook ready; no provider configured |
| Resend domain verification | LOW | DNS added 2026-04-10; confirm in Resend dashboard |

---

## SASCRIBE — sascribe.com

**Stack:** Hugo · GitHub Actions · Cloudflare CDN
**Repo:** sascribe/sascribe-blog

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Hugo Site | ✅ Live | sascribe.com via Cloudflare Pages |
| GitHub Actions Pipeline | ✅ Live | content-pipeline.yml — all scheduled runs SUCCESS |
| GSC | ✅ 4 pages indexed | homepage, el-pillar, beehiiv-news, synthesia-news |
| IndexNow | ✅ Active | Key: `sascribe2026xK9mP3qR7nL5vT` — last ping 2026-04-19 (25 URLs) |
| CF Analytics | ✅ Live | Beacon: 027c2dc081f04fd3a6b5fee36918122a |

### Technical SEO (fully clean as of Session 5)

| Check | Status |
|-------|--------|
| Canonical | ✅ All pages |
| OG tags (title/desc/image) | ✅ All — double slash fixed, homepage fallback added |
| Twitter card | ✅ Added Session 4 |
| CF Analytics | ✅ Present |
| BlogPosting schema | ✅ Template-injected |
| FAQPage JSON-LD | ✅ All 24 articles |
| draft: false | ✅ All 24 articles |
| rel=nofollow sponsored | ✅ Hugo render hook added — all /go/ links |
| Privacy policy footer | ✅ Present in baseof.html |
| Sitemap | ✅ 26+ URLs, no taxonomy spam |
| Internal links | ✅ All 24 articles ≥2 links |

### Affiliate Redirects

| Affiliate | /go/ redirect | Destination | Status |
|-----------|--------------|-------------|--------|
| adcreative | 301 | free-trial.adcreative.ai | ✅ OK |
| elevenlabs | 301 | try.elevenlabs.io | ✅ OK |
| synthesia | 301 | synthesia.io | ✅ OK |
| beehiiv | 301 | beehiiv.com | ✅ OK |
| nordvpn | 302 | go.nordvpn.net | ✅ FIXED (was tkqlhce.com — CJ legacy domain 403) |

**Working Insight #44:** CJ tracking domains change — always verify /go/ redirects resolve end-to-end. `tkqlhce.com` was a legacy CJ domain that returned 403. Use `go.nordvpn.net` direct NordVPN network links instead.

### Content State (2026-04-19 Session 5)

**24 articles published** across 5 affiliates:

| Affiliate | Articles | Last Published | Types Completed |
|-----------|----------|----------------|-----------------|
| AdCreative AI | 6 | 2026-04-18 | review, comparison, tutorial, use-cases, news, tips |
| ElevenLabs | 4 | 2026-04-13 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | 2026-04-14 | review, comparison, pillar, news |
| Synthesia | 5 | 2026-04-19 | pillar, tutorial, news, review, comparison |
| NordVPN | 5 | 2026-04-19 | review, pillar, comparison, news, tutorial |

**Content gaps remaining:**
- AdCreative: alternatives, guide
- ElevenLabs: use-cases, alternatives, guide, tips
- Synthesia: use-cases, alternatives, guide, tips
- Beehiiv: tutorial, use-cases, alternatives, guide, tips
- NordVPN: use-cases, alternatives, guide, tips

### Session 5 Fixes Applied (2026-04-19)

| Fix | Result | Key Commits/Actions |
|-----|--------|---------------------|
| NordVPN CF redirect | ✅ DONE | tkqlhce.com → go.nordvpn.net, 302 confirmed |
| adcreative-news rewrite | ✅ DONE | Value-first opener, research-backed | 14db480b, a9d57eaf |
| elevenlabs-tutorial rewrite | ✅ DONE | Value-first opener, 2685 words | 985d3773, 181f101a |
| Internal linking pass | ✅ DONE | All 21 existing articles — See Also blocks | 3b30b0a4–9d32ff28 |
| render-link.html hook | ✅ DONE | rel=nofollow sponsored on all /go/ links | 264b9bdc |
| Privacy policy footer | ✅ N/A | Already present in baseof.html |
| NordVPN tutorial | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-nordvpn-tutorial-1776635257745/ |
| Synthesia review | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-synthesia-review-1776635412717/ |
| Synthesia comparison | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-synthesia-comparison-1776635520505/ |
| generate-article.js trimStart fix | ✅ DONE | Prevents frontmatter validation failure | 81d42835 |
| Final IndexNow ping | ✅ DONE | 25 URLs, HTTP 200 |

### Pending (Sascribe)

| Item | Priority | Notes |
|------|----------|-------|
| ElevenLabs use-cases | HIGH | 1 article; high GSC traction on pillar (1489 imp) |
| NordVPN use-cases / alternatives | HIGH | Next content types |
| Beehiiv tutorial | HIGH | 5+ days since last publish |
| Synthesia use-cases | MEDIUM | Complete coverage |
| GSC indexing | MONITOR | 12 articles still not indexed; allow 7–14 days from 2026-04-19 ping |
| ElevenLabs pillar CTR | MONITOR | pos 8.4, 1489 imp, 0 clicks — needs to crack top 5 |
| QR Perks postback endpoint | NEXT SESSION | Primary mission next session |
| CLAUDE_ROLE.md | LOW | Does not exist in repo |
