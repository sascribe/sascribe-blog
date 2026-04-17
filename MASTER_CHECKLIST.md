# Master Checklist — QR Perks + Sascribe

> Last updated: 2026-04-17 | QR Perks Session 10 complete · Sascribe Session 1 snapshot

---

## QR PERKS — SESSION 10 VERIFICATION (2026-04-17)

**Result: 14/14 PASS**

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Countdown completion redirects to offer URL (not homepage) | ✅ PASS | `doRedirect()` uses `window.location.href=bridgeUrl` |
| 2 | "No Thank You" goes to offer URL | ✅ PASS | `br-skip` calls `doRedirect()` → offer |
| 3 | Homepage email sets `qrp_lead_captured` flag + cookie; skips interstitial on next CTA | ✅ PASS | `heroCapture()` calls `setLeadCapture()`; `openBridge()` checks `hasLeadCapture()` |
| 4 | Timer pauses on input focus, resumes after 3s inactivity | ✅ PASS | `pauseBridgeTimer()` / `scheduleResume()` with 3000ms delay |
| 5 | /t9 renders a real QR code SVG | ✅ PASS | `generateQRSvg()` produces valid QR for byte mode, ECC Level L |
| 6 | All four download formats work (SVG, PDF, JPEG, PNG) | ✅ PASS | Blob URL pattern; PDF uses minimal PDF generator |
| 7 | Scan-and-test notice appears in EN and ES below QR code | ✅ PASS | `testNotice` HTML added to every QR card |
| 8 | Unsubscribe link present in every email | ✅ PASS | `emailBase()` accepts `recipientEmail`; all callers updated |
| 9 | /unsubscribe route works and flags record in Supabase | ✅ PASS | `handleUnsubscribe()` PATCHes `email_captures.status='unsubscribed'`; bilingual confirmation shown |
| 10 | Welcome email updated — no mention of scanning trucks | ✅ PASS | New body: insider list, deals come to you, watch inbox |
| 11 | Cloudflare email routing rules active for support@, privacy@, contact@ | ✅ PASS | `qrperks@gmail.com` verified; 3 rules created via API (IDs: 09b341ec, 2eb2eed8, ccbfac5d); all `enabled:true` |
| 12 | Privacy policy has no duplicate `privacy@qr-perks.com` | ✅ PASS | Duplicate standalone paragraph removed; appears exactly once |
| 13 | Logo links to homepage on every page | ✅ PASS | All nav/header logo instances wrapped in `<a href="/">` |
| 14 | Contact form sends and returns confirmation | ✅ PASS | `handleContactPost` fires Resend API with `env.RESEND_API_KEY`; client checks `d.ok` |

---

## QR PERKS — PREVIOUSLY COMPLETED (Sessions 1–9)

### Infrastructure
- [x] Cloudflare Worker deployed (`qrperks`)
- [x] Custom domain `qr-perks.com` routing active
- [x] Supabase database connected
- [x] Resend email domain verified (`noreply@qr-perks.com`)
- [x] Worker secrets set: SUPABASE_URL, SUPABASE_SECRET, ADMIN_PASSWORD, RESEND_API_KEY, DRIVER_JWT_SECRET, W9_ENCRYPTION_KEY
- [x] Cloudflare Email Routing enabled + 3 rules active (Session 10)

### Core Platform
- [x] Landing page with EN/ES toggle
- [x] Interstitial bridge overlay (offer capture)
- [x] QR truck routes /t1–/t50
- [x] Affiliate offer cards with FALLBACK_AFFILIATES
- [x] Email/phone capture → Supabase + Resend
- [x] /go/{affiliate_id} redirect with UTM parameters

### Driver Portal
- [x] Driver signup with email verification
- [x] Driver login with JWT session
- [x] Password reset flow
- [x] W9 form with signature canvas + AES-GCM encryption
- [x] Driver dashboard (scans, commissions, referrals)
- [x] QR code download page
- [x] Earnings breakdown
- [x] Referral link + sharing
- [x] Settings (profile, password change)
- [x] Contractor agreement acceptance
- [x] Payment method setup

### Admin Portal
- [x] Admin login (password-protected)
- [x] Driver approval/denial
- [x] Truck assignment
- [x] W9 review workflow
- [x] Commission calculation engine (20% truck, 10% referral)
- [x] Mark commissions as paid
- [x] Affiliate offer management (activate/deactivate/feature)
- [x] Email captures (leads) table

### Legal Pages
- [x] Privacy Policy (EN/ES)
- [x] Terms of Service (EN/ES)
- [x] Earnings Disclaimer (EN/ES)
- [x] Affiliate Disclosure
- [x] Contractor Agreement
- [x] Consumer Data Terms (EN/ES)
- [x] Unsubscribe page (EN/ES, functional)

### Email System
- [x] Driver welcome email (on approval)
- [x] Email verification flow
- [x] Password reset email
- [x] W9 confirmation email
- [x] Referral signup notification
- [x] Subscriber welcome email (rewritten Session 10 — no truck mention)
- [x] Unsubscribe link in all email footers (Session 10)
- [x] Unsubscribed check before all sends (Session 10)

### SMS Compliance
- [x] /api/sms-webhook — STOP/CANCEL/UNSUBSCRIBE/END/QUIT handling
- [x] `sms_unsubscribed` + `sms_unsubscribed_at` columns in Supabase
- [ ] SMS sending infrastructure — webhook ready, no Twilio/provider connected yet

---

## QR PERKS — PENDING / NEXT SESSION

| Item | Priority | Notes |
|------|----------|-------|
| Twilio/SMS provider integration | MEDIUM | TCPA compliance code ready; connect provider next session |
| Resend domain verification | LOW | DNS added 2026-04-10; confirm status in Resend dashboard |
| T9–T50 QR scanability check | LOW | Auto-generated on first driver access; verify real-world scan |

---

## SASCRIBE — SESSION 1 STATE SNAPSHOT (2026-04-16)

### Infrastructure Verified
- [x] Hugo site live at sascribe.com
- [x] GitHub Actions content pipeline (`content-pipeline.yml`) — 2 runs, both success
- [x] Cloudflare CDN active — 16,234 PV / 28,174 requests over 28 days
- [x] GSC sitemap submitted (31 URLs, lastDownloaded 2026-04-05)
- [x] Google Sheet affiliate tracker live — 5 affiliates, 17 articles logged

### Content Published
- [x] AdCreative AI — 5 articles (review, comparison, tutorial, use-cases, news) — COMPLETE TYPE COVERAGE
- [x] ElevenLabs — 4 articles (pillar, comparison, review, tutorial)
- [x] Beehiiv — 4 articles (review, comparison, pillar, news)
- [x] Synthesia — 3 articles (pillar, tutorial, news)
- [x] NordVPN — 1 article (review only)

### Problems Identified
- [ ] **0/31 URLs indexed in GSC** — entire site in "discovered, not indexed" state
- [ ] **ElevenLabs pillar: 1,381 impressions at pos 8.3, zero clicks** — title/meta not driving CTR
- [ ] **Pipeline duplicate hook bug** — same news hook used for multiple affiliates on same day (Apr 13 Sam Altman, Apr 14/16 PlayStation video)
- [ ] **NordVPN severely under-content** — 1 article out of 6 planned types
- [ ] **Internal linking not verified** — no audit done yet

---

## SASCRIBE — NEXT SESSION PRIORITIES

| # | Item | Priority | Notes |
|---|------|----------|-------|
| 1 | GSC indexing investigation | CRITICAL | Verify canonical tags are correct; resubmit sitemap; batch IndexNow ping all 17 articles; check for noindex tags |
| 2 | ElevenLabs pillar title + meta CTR fix | HIGH | 1,381 impressions, 0 clicks — highest-leverage SEO fix; rewrite `<title>` and meta description |
| 3 | Pipeline deduplication fix | HIGH | `scripts/generate-article.js` — add logic to reject news hook already used for another affiliate in same pipeline run |
| 4 | NordVPN content: comparison + tutorial + news | HIGH | 3 articles; run immediately to complete coverage |
| 5 | Internal linking audit | MEDIUM | Check all 17 articles for internal links; ensure ElevenLabs pillar linked from every ElevenLabs post; fix any with zero internal links |
| 6 | GitHub Actions cron UTC offset check | MEDIUM | Verify cron schedule in `content-pipeline.yml` fires at intended local publish times |
| 7 | ElevenLabs use-cases article | LOW | Only remaining content gap for ElevenLabs |
| 8 | Synthesia review + comparison | LOW | Two remaining types for Synthesia |
