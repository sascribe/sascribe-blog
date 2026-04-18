# Master Checklist — QR Perks + Sascribe

> Last updated: 2026-04-17 | QR Perks Session 10 complete · Sascribe Session 3 complete

---

## QR PERKS — SESSION 10 VERIFICATION (2026-04-17)

**Result: 14/14 PASS ✅**

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Countdown completion redirects to offer URL (not homepage) | ✅ PASS | `doRedirect()` uses `window.location.href=bridgeUrl` |
| 2 | "No Thank You" goes to offer URL | ✅ PASS | `br-skip` calls `doRedirect()` |
| 3 | Homepage email sets `qrp_lead_captured` flag + cookie; skips interstitial | ✅ PASS | `heroCapture()` → `setLeadCapture()`; `openBridge()` → `hasLeadCapture()` |
| 4 | Timer pauses on input focus, resumes after 3s inactivity | ✅ PASS | `pauseBridgeTimer()` / `scheduleResume()` 3000ms |
| 5 | /t9 renders a real QR code SVG | ✅ PASS | `generateQRSvg()` byte mode, ECC Level L |
| 6 | All four download formats work (SVG, PDF, JPEG, PNG) | ✅ PASS | Blob URL pattern; PDF via minimal generator |
| 7 | Scan-and-test notice appears in EN and ES | ✅ PASS | `testNotice` HTML in every QR card |
| 8 | Unsubscribe link present in every email | ✅ PASS | `emailBase()` accepts `recipientEmail` |
| 9 | /unsubscribe route flags record in Supabase | ✅ PASS | PATCHes `status='unsubscribed'`; bilingual confirmation |
| 10 | Welcome email — no mention of scanning trucks | ✅ PASS | Insider list messaging; deals come to inbox |
| 11 | CF email routing rules active for support@, privacy@, contact@ | ✅ PASS | 3 rules active via API; IDs: 09b341ec, 2eb2eed8, ccbfac5d |
| 12 | Privacy policy no duplicate `privacy@qr-perks.com` | ✅ PASS | Appears exactly once |
| 13 | Logo links to homepage on every page | ✅ PASS | All nav instances wrapped in `<a href="/">` |
| 14 | Contact form sends and returns confirmation | ✅ PASS | `handleContactPost` uses `env.RESEND_API_KEY` |

---

## QR PERKS — PREVIOUSLY COMPLETED (Sessions 1–9)

### Infrastructure
- [x] Cloudflare Worker deployed (`qrperks`)
- [x] Custom domain `qr-perks.com` routing active
- [x] Supabase database connected
- [x] Resend email domain verified (`noreply@qr-perks.com`)
- [x] Worker secrets set: SUPABASE_URL, SUPABASE_SECRET, ADMIN_PASSWORD, RESEND_API_KEY, DRIVER_JWT_SECRET, W9_ENCRYPTION_KEY
- [x] Cloudflare Email Routing: 3 rules active

### Core Platform
- [x] Landing page with EN/ES toggle
- [x] Interstitial bridge overlay
- [x] QR truck routes /t1–/t50
- [x] Affiliate offer cards with FALLBACK_AFFILIATES
- [x] Email/phone capture → Supabase + Resend
- [x] /go/{affiliate_id} redirect with UTM parameters

### Driver Portal
- [x] Driver signup / login / password reset
- [x] W9 form with AES-GCM encryption
- [x] Driver dashboard, earnings, referrals, QR download
- [x] Settings, contractor agreement, payment method

### Admin Portal
- [x] Login, driver approval/denial, truck assignment
- [x] W9 review, commission engine, mark paid
- [x] Affiliate management, email captures table

### Legal + Email + SMS
- [x] All legal pages (Privacy, ToS, Earnings, Disclosure, Contractor, Consumer, Unsubscribe)
- [x] All email flows (welcome, verify, reset, W9, referral, subscriber)
- [x] Unsubscribe link in all email footers
- [x] Unsubscribed check before all sends
- [x] /api/sms-webhook — STOP/CANCEL/UNSUBSCRIBE/END/QUIT handling
- [ ] SMS sending — webhook ready, no Twilio/provider connected yet

---

## QR PERKS — PENDING

| Item | Priority | Notes |
|------|----------|-------|
| Twilio/SMS provider | MEDIUM | TCPA ready; connect next session |
| Resend domain verification | LOW | DNS added 2026-04-10 |
| T9–T50 QR real-world scan | LOW | Verify scanability in field |

---

## SASCRIBE — SESSION 3 MISSIONS (2026-04-17)

| # | Mission | Status | Notes |
|---|---------|--------|-------|
| M1 | Article quality evaluation — top 5 | ✅ DONE | CTR/quality scores 2–6/10; root cause: trendingTopic injected as article premise |
| M2 | generate-article.js research overhaul | ✅ DONE | buildResearchBrief(), fetchRedditSignals(), fetchYouTubeSignals(), fetchCompetitorAngles(), prompt rewrite — commit f8f48a2f |
| M3 | Rewrite top 5 articles in-place | ✅ DONE | All 5 committed; new titles event-free, value-first — commits 4da9b316, 1c19a6fd, a82349ac, 940aeed1, 5832cc78 |
| M4 | IndexNow ping — 5 rewritten URLs | ✅ DONE | Batch ping sent post-rewrite |

### Standing Rules Established (Session 3)
- Trending topics are SUPPORTING CONTEXT only — never the article premise or hook
- Article titles must target real search queries — no references to viral events or memes
- Opening paragraph must be value-first or problem-first — never event-first
- validateArticle() now warns if opening contains event-first patterns

---

## SASCRIBE — SESSION 2 MISSIONS (2026-04-17)

| # | Mission | Status | Notes |
|---|---------|--------|-------|
| M1 | ElevenLabs pillar CTR fix | ✅ DONE | Title 55 chars, desc 151 chars, commit bd96132d39 |
| M2 | Pipeline dedup + cooldown | ✅ DONE | fetchRecentArticleHooks L307, topicMatchesRecentHooks L358, cooldown L168, commit c6e505e55a |
| M3 | NordVPN 3 articles | ✅ DONE | pillar/comparison/news — all 200, sheet updated to total=4 — all 3 later rewritten in Session 3 |
| M4 | GSC indexing investigation | ✅ DONE | 2 pages indexed, sitemap resubmitted, IndexNow 21 URLs |
| M5 | GitHub Actions verification | ✅ DONE | Workflow active, cron correct, 2 runs both success |
| M6 | Internal linking audit | ✅ DONE | 2 EL articles fixed, 0 zero-link articles |

---

## SASCRIBE — SESSION 1 COMPLETED (2026-04-16)

### Infrastructure Verified
- [x] Hugo site live at sascribe.com
- [x] GitHub Actions pipeline — `content-pipeline.yml` active
- [x] Cloudflare CDN active
- [x] GSC sitemap submitted
- [x] Google Sheet affiliate tracker live

### Content Published (pre-Session 2)
- [x] AdCreative AI — 5 articles — **COMPLETE TYPE COVERAGE**
- [x] ElevenLabs — 4 articles (pillar, comparison, review, tutorial)
- [x] Beehiiv — 4 articles (review, comparison, pillar, news)
- [x] Synthesia — 3 articles (pillar, tutorial, news)
- [x] NordVPN — 1 article (review only)

---

## SASCRIBE — NEXT SESSION PRIORITIES

| # | Item | Priority | Notes |
|---|------|----------|-------|
| 1 | Monitor ElevenLabs pillar CTR | MONITOR | Title/meta fixed 2026-04-17 — check GSC in 7-14 days |
| 2 | NordVPN tutorial article | HIGH | Next content type; run with `--type long-form --affiliate nordvpn` |
| 3 | Synthesia review + comparison + use-cases | HIGH | 3 articles needed |
| 4 | GSC indexing — remaining URLs | MEDIUM | Allow 7-14 days; recheck with URL Inspection API |
| 5 | CSE configuration check | MEDIUM | Reddit thread + competitor searches returned 0 results — verify cx=b5832306c3be3443d scope allows unrestricted search |
| 6 | ElevenLabs use-cases article | MEDIUM | 1 article fills complete coverage |
| 7 | Cron PDT offset | LOW | `0 17` fires at 10am PDT; change to `0 16` for 9am PDT if desired |
| 8 | CLAUDE_ROLE.md + AUDIT.md | LOW | Neither file exists in repo — create if needed |
