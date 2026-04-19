# Project State — QR Perks + Sascribe

**Last updated:** 2026-04-19 (Session 4 — Full Site Audit)
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
| GitHub Actions Pipeline | ✅ Live | content-pipeline.yml — 3 runs, all SUCCESS |
| GSC | ✅ 4 pages indexed | homepage, elevenlabs-pillar, beehiiv-news, synthesia-news |
| IndexNow | ✅ Active | Key: `sascribe2026xK9mP3qR7nL5vT` |
| CF Analytics | ✅ Live | Beacon token: 027c2dc081f04fd3a6b5fee36918122a |

### Workflow Schedule

```
Cron: 0 17 * * 1 → Monday long-form
      0 17 * * 2 → Tuesday short
      0 17 * * 4 → Thursday short
      0 17 * * 6 → Saturday short
```

### GSC Status (as of 2026-04-19 — Session 4 Audit)

| Page | Verdict | Impressions (28d) | Clicks | Position |
|------|---------|-------------------|--------|----------|
| Homepage | INDEXED | 56 | 0 | 7.6 |
| ElevenLabs Pillar | INDEXED | 1489 | 0 | 8.4 |
| Beehiiv News | INDEXED | — | — | — |
| Synthesia News | INDEXED | — | — | — |
| AdCreative Review | Discovered, not indexed | — | — | — |
| NordVPN Review | Discovered, not indexed | — | — | — |
| NordVPN Pillar | Discovered, not indexed | — | — | — |
| NordVPN Comparison | Discovered, not indexed | — | — | — |
| NordVPN News | Discovered, not indexed | — | — | — |
| AdCreative Comparison | Discovered, not indexed | — | — | — |
| Beehiiv Pillar | URL unknown to Google | — | — | — |
| AdCreative Tips | URL unknown to Google | — | — | — |

**Top GSC queries (28d):** elevenlabs 2026 (pos 6–11), elevenlabs voice cloning 2026, adcreative.ai review (pos 2)
**Sitemap resubmitted:** 2026-04-19
**IndexNow ping:** 22 URLs — 2026-04-19

### Technical SEO State (Session 4 Audit)

| Check | Status | Notes |
|-------|--------|-------|
| Canonical tags | ✅ All present, self-referential | |
| Noindex on published pages | ✅ None present | |
| OG tags (title, desc, image) | ✅ All present | Double slash fixed 2026-04-19 |
| Twitter card | ✅ Added 2026-04-19 | Was missing on all pages |
| Homepage OG description | ✅ Fixed 2026-04-19 | Was missing |
| robots meta | ✅ index, follow | |
| CF Web Analytics | ✅ Present | Beacon in baseof.html |
| BlogPosting schema | ✅ Present | Injected via baseof.html template |
| Sitemap | ✅ 26 URLs, no taxonomy pages | Custom layout works |
| Cache rules | ✅ Configured with TTL overrides | Static: 1mo edge, HTML: 4hr edge |
| Cache hit rate | ⚠️ 8% (7-day) | Low — new site with cold cache; rules properly configured |

### Affiliate Redirects (Session 4 Audit)

| Affiliate | /go/ redirect | Destination HTTP | Status |
|-----------|--------------|-----------------|--------|
| adcreative | 301 → free-trial.adcreative.ai | 200 | ✅ OK |
| elevenlabs | 301 → try.elevenlabs.io | 200 | ✅ OK |
| synthesia | 301 → synthesia.io | 200 | ✅ OK |
| beehiiv | 301 → beehiiv.com | 200 | ✅ OK |
| nordvpn | 302 → tkqlhce.com | 403 | ⚠️ NEEDS CHECK |

NordVPN Impact Radius link returns 403. May be bot detection or expired link. Check NordVPN affiliate dashboard.

### Content State (as of 2026-04-19 Session 4)

**21 articles published** across 5 affiliates:

| Affiliate | Articles | Last Published | Types Completed |
|-----------|----------|----------------|-----------------|
| AdCreative AI | 6 | 2026-04-18 | review, comparison, tutorial, use-cases, news, tips |
| ElevenLabs | 4 | 2026-04-13 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | 2026-04-14 | review, comparison, pillar, news |
| Synthesia | 3 | 2026-04-16 | pillar, tutorial, news |
| NordVPN | 4 | 2026-04-17 | review, pillar, comparison, news |

**Content gaps remaining:**
- AdCreative: alternatives, guide
- ElevenLabs: use-cases, alternatives, guide, tips
- Synthesia: review, comparison, use-cases, alternatives, guide, tips
- Beehiiv: tutorial, use-cases, alternatives, guide, tips
- NordVPN: tutorial, use-cases, alternatives, guide, tips

### Session 4 Auto-Fixes Applied (2026-04-19)

| Fix | Files Affected | Commits |
|-----|---------------|---------|
| `draft: false` added | 11 articles | multiple |
| Meta description fixed (150–160 chars) | synthesia-news, nordvpn-pillar, adcreative-tips | b21dc9ce, 973faf6d, da93da36 |
| Cover image fixed (ads-38.png → logo-adc.jpg) | adcreative-tips | 64367877 |
| JSON-LD garbage script tag removed | adcreative-comparison | 613f74d8 |
| FAQPage JSON-LD added | elevenlabs-review | 0f0953ba |
| Twitter card meta tags added | layouts/baseof.html | 98b481f8 |
| OG image double slash fixed | layouts/baseof.html | 98b481f8 |
| Homepage OG description fallback added | layouts/baseof.html | 98b481f8 |
| IndexNow batch ping | 22 URLs | HTTP 200 |
| GSC sitemap resubmitted | sitemap.xml | HTTP 204 |
| web_search replaces dead CSE | scripts/generate-article.js | 7f81f7b2 |

### Pending (Sascribe)

| Item | Priority | Notes |
|------|----------|-------|
| NordVPN affiliate link 403 | HIGH | tkqlhce.com returns 403 — verify in NordVPN affiliate dashboard (Impact Radius) |
| Internal links (0–1 on most articles) | HIGH | All pre-NordVPN articles need ≥2 internal links added contextually |
| adcreative-news rewrite | HIGH | Event-first hook (Sam Altman Reddit thread) — score 6/10 |
| elevenlabs-tutorial rewrite | HIGH | Event-first hook (Reddit thread) — score 6/10 |
| Title lengths > 60 chars | MEDIUM | 20/21 articles exceed 60 chars — Google truncates display only, not a ranking penalty |
| NordVPN tutorial article | HIGH | Priority content gap — run with `--type long-form --affiliate nordvpn` |
| Synthesia review + comparison | HIGH | 2 of 3 most-needed types |
| ElevenLabs use-cases | MEDIUM | 1 article fills complete coverage |
| GSC indexing — remaining URLs | MEDIUM | 12 articles still not indexed; IndexNow + sitemap pinged 2026-04-19 |
| Cache hit rate | MONITOR | 8% (7-day); rules properly configured; will warm up organically |
| CLAUDE_ROLE.md | LOW | Does not exist in repo |
| Privacy policy footer link | LOW | Exists at /privacy but not linked from footer layout |
| rel=sponsored on inline body links | LOW | Template adds rel=sponsored on cover+CTA; body markdown links do not have it |
| ElevenLabs pillar CTR | MONITOR | 1489 impressions, 0 clicks at pos 8.4 — needs to crack top 5 |
