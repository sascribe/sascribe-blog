# QR Perks — Master Checklist

> Last updated: 2026-04-17 | Session 10

---

## Session 10 — Verification Items

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Countdown completion redirects to offer URL (not homepage) | ✅ PASS | `doRedirect()` now uses `window.location.href=bridgeUrl` |
| 2 | "No Thank You" goes to offer URL | ✅ PASS | `br-skip` calls `doRedirect()` which goes to offer |
| 3 | Homepage email sets `qrp_lead_captured` flag + cookie; skips interstitial on next CTA | ✅ PASS | `heroCapture()` calls `setLeadCapture()`; `openBridge()` checks `hasLeadCapture()` |
| 4 | Timer pauses on input focus, resumes after 3s inactivity | ✅ PASS | `pauseBridgeTimer()` / `scheduleResume()` with 3000ms delay |
| 5 | /t9 renders a real QR code SVG | ✅ PASS | `generateQRSvg()` produces valid QR for byte mode, ECC Level L |
| 6 | All four download formats work (SVG, PDF, JPEG, PNG) | ✅ PASS | Blob URL pattern; PDF uses minimal PDF generator |
| 7 | Scan-and-test notice appears in EN and ES below QR code | ✅ PASS | `testNotice` HTML added to every QR card |
| 8 | Unsubscribe link present in every email | ✅ PASS | `emailBase()` now accepts `recipientEmail` param; all callers updated |
| 9 | /unsubscribe route works and flags record in Supabase | ✅ PASS | `handleUnsubscribe()` PATCHes `email_captures.status='unsubscribed'`; bilingual confirmation shown |
| 10 | Welcome email updated — no mention of scanning trucks | ✅ PASS | New body: insider list, deals come to you, watch inbox |
| 11 | Cloudflare email routing rules active for support@, privacy@, contact@ | ⚠️ PARTIAL | Email Routing **enabled** on zone. Rules cannot be created until `qrperks@gmail.com` is verified. **Manual step required:** CF Dashboard → Email Routing → Add `qrperks@gmail.com` → verify → create 3 rules |
| 12 | Privacy policy has no duplicate `privacy@qr-perks.com` | ✅ PASS | Duplicate standalone paragraph removed; appears exactly once |
| 13 | Logo links to homepage on every page | ✅ PASS | All nav/header logo instances wrapped in `<a href="/">` |
| 14 | Contact form sends and returns confirmation | ✅ PASS | `handleContactPost` fires Resend API with env.RESEND_API_KEY; client checks d.ok |

---

## Previously Completed (Sessions 1-9)

### Infrastructure
- [x] Cloudflare Worker deployed (`qrperks-worker`)
- [x] Custom domain `qr-perks.com` routing active
- [x] Supabase database connected
- [x] Resend email domain verified (noreply@qr-perks.com)
- [x] Worker secrets set: SUPABASE_URL, SUPABASE_SECRET, ADMIN_PASSWORD, RESEND_API_KEY, DRIVER_JWT_SECRET, W9_ENCRYPTION_KEY

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
- [x] Subscriber welcome email (rewritten Session 10)
- [x] Unsubscribe link in all email footers (Session 10)
- [x] Unsubscribed check before sends (Session 10)

### SMS Compliance
- [x] /api/sms-webhook — STOP/CANCEL/UNSUBSCRIBE/END/QUIT handling (Session 10)
- [x] sms_unsubscribed flag in Supabase
- [ ] SMS sending infrastructure (no Twilio/SMS provider integrated yet — webhook ready for when provider is added)

---

## Pending / Known Issues

| Item | Priority | Notes |
|------|----------|-------|
| CF Email Routing rules (support@, privacy@, contact@) | HIGH | Requires `qrperks@gmail.com` verification in CF dashboard |
| Twilio/SMS provider integration | MEDIUM | TCPA compliance code ready, no SMS provider configured |
| Resend domain verification confirmation | LOW | DNS records added 2026-04-10, check verification status |
| Production QR codes T9-T50 | LOW | Auto-generated on first driver access; verify scanability |

---

## Architecture Quick Reference

```
qr-perks.com → Cloudflare Worker (qrperks-worker)
  ├── / → Landing page (EN/ES, interstitial bridge)
  ├── /t{1-50} → Truck scan landing (records scan, shows deals)
  ├── /go/{affiliate_id} → Redirect with UTM tracking
  ├── /driver/* → Driver portal (auth-protected)
  ├── /admin/* → Admin portal (password-protected)
  ├── /api/* → JSON APIs (capture, stats, truck-name, save-qr-code, sms-webhook)
  ├── /unsubscribe → Email unsubscribe (EN/ES)
  ├── /contact → Contact form → Resend → support@qr-perks.com
  └── /privacy|/terms|/disclosure|/earnings-disclaimer|/contractor|/leads-terms
```
