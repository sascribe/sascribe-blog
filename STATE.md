# Project State — QR Perks + Sascribe

**Last updated:** 2026-04-17
**Projects:** qr-perks.com (Cloudflare Worker) · sascribe.com (Hugo + GitHub Actions pipeline)

---

## QR PERKS — qr-perks.com

**Worker version:** v6 (Session 10, finalized)
**Deployed to:** Cloudflare Worker `qrperks` (serving qr-perks.com/*)
**All 14 Session 10 verification items passed: 14/14**

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Cloudflare Worker | ✅ Live | `qrperks`, deployed 2026-04-17 |
| Supabase | ✅ Live | `fsaxluprhgmyaipaujdn.supabase.co` |
| Resend Email | ✅ Live | `noreply@qr-perks.com`, key in worker secrets |
| Cloudflare Email Routing | ✅ Live | 3 rules active — support@, privacy@, contact@ → qrperks@gmail.com |

### Cloudflare Email Routing Rules

| Address | Destination | Rule ID | Status |
|---------|-------------|---------|--------|
| support@qr-perks.com | qrperks@gmail.com | 09b341ec | enabled |
| privacy@qr-perks.com | qrperks@gmail.com | 2eb2eed8 | enabled |
| contact@qr-perks.com | qrperks@gmail.com | ccbfac5d | enabled |

Destination `qrperks@gmail.com` verified 2026-04-17. Rules created via CF API same day.

### Session 10 Changes (2026-04-17) — Complete

#### Countdown Interstitial Flow
- Timer: 5s → **8 seconds**
- Countdown completion and "No Thank You" both redirect to **offer URL** — never homepage
- Homepage email form sets `localStorage qrp_lead_captured=true` + 30-day cookie
- Offer CTAs check `hasLeadCapture()` — if set, skip interstitial entirely
- Timer pauses on input focus, resumes after 3s inactivity (`scheduleResume()`)
- Form submit inside interstitial cancels timer, goes directly to offer

#### QR Code Auto-Generation (T9+)
- Pure-JS QR code generator built into worker (no external deps)
- Encodes `https://qr-perks.com/{truck_id}` as inline SVG
- On first load, saves SVG to `trucks.qr_code_svg` via `/api/save-qr-code`
- Subsequent loads read from Supabase
- Four download formats: **SVG, PDF, JPEG, PNG** (blob URL pattern)
- Filenames: `QR-Perks-T{n}.{ext}`
- EN/ES scan-and-test notice below every QR card

#### Email Unsubscribe
- Every email footer includes `/unsubscribe?email={encoded}` link
- `/unsubscribe?email=...` flags `email_captures.status='unsubscribed'`
- Bilingual (EN/ES) confirmation page
- `sendEmail()` and `handleCapture` both check unsubscribed status before sending

#### SMS Legal Compliance (TCPA)
- `/api/sms-webhook` handles STOP / CANCEL / UNSUBSCRIBE / END / QUIT
- Flags `email_captures.sms_unsubscribed=true` in Supabase
- Returns TwiML confirmation response
- **Pending:** No SMS provider (Twilio) connected yet — webhook ready, sending not active

#### Welcome Email Rewrite
- Subject: "You're In ✅ — QR Perks"
- Body: insider list, deals come to inbox — no mention of scanning trucks
- EN/ES based on `lang` column in `email_captures`

#### Cloudflare Email Routing
- Zone-level Email Routing enabled via API
- `qrperks@gmail.com` verified as destination
- Three rules created and confirmed active (see table above)

#### Privacy Policy Fix
- Duplicate `privacy@qr-perks.com` paragraph removed — appears exactly once in "Your Rights" section

#### Logo Links
- Every QR PERKS logo/name in header/nav wrapped in `<a href="/">`:
  - Landing page header, auth shell, driver dashboard nav, admin nav, legal shell, contact page

#### Contact Form Fix
- `handleContactPost` uses `env.RESEND_API_KEY`, fires Resend API correctly
- Sends to `support@qr-perks.com` with `reply_to` set to submitter's email
- Client-side checks `d.ok` before showing confirmation

### Supabase Schema (Session 10 additions)

```sql
ALTER TABLE trucks ADD COLUMN IF NOT EXISTS qr_code_svg TEXT;
ALTER TABLE email_captures ADD COLUMN IF NOT EXISTS status TEXT DEFAULT NULL;
ALTER TABLE email_captures ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT NULL;
ALTER TABLE email_captures ADD COLUMN IF NOT EXISTS sms_unsubscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE email_captures ADD COLUMN IF NOT EXISTS sms_unsubscribed_at TIMESTAMPTZ DEFAULT NULL;
```

### QR Code State

| Trucks | Type | Notes |
|--------|------|-------|
| T1–T8 | Pre-embedded SVG + PNG | Stored in worker constants |
| T9–T50 | Auto-generated | `generateQRSvg()` on first access, saved to Supabase |

### Worker Secrets

| Key | Purpose |
|-----|---------|
| SUPABASE_URL | Supabase project URL |
| SUPABASE_SECRET | Supabase service key |
| ADMIN_PASSWORD | Admin dashboard password |
| RESEND_API_KEY | Email sends via Resend |
| DRIVER_JWT_SECRET | Driver session JWTs |
| W9_ENCRYPTION_KEY | W9 tax ID encryption |

### Pending (QR Perks)

| Item | Priority | Notes |
|------|----------|-------|
| Twilio/SMS provider integration | MEDIUM | TCPA webhook ready; no provider configured — next session |
| Resend domain verification | LOW | DNS added 2026-04-10; confirm verified in Resend dashboard |
| T9–T50 QR scanability | LOW | Auto-generated on first driver access; verify real-world scan |

### Architecture

```
qr-perks.com → Cloudflare Worker (qrperks)
  ├── / → Landing page (EN/ES, interstitial bridge)
  ├── /t{1-50} → Truck scan landing (records scan, shows deals)
  ├── /go/{affiliate_id} → Redirect with UTM tracking
  ├── /driver/* → Driver portal (auth-protected JWT)
  ├── /admin/* → Admin portal (password-protected)
  ├── /api/* → JSON APIs (capture, stats, truck-name, save-qr-code, sms-webhook)
  ├── /unsubscribe → Email unsubscribe (EN/ES, flags Supabase)
  ├── /contact → Contact form → Resend → support@qr-perks.com
  └── /privacy|/terms|/disclosure|/earnings-disclaimer|/contractor|/leads-terms
```

---

## SASCRIBE — sascribe.com

**Stack:** Hugo static site · GitHub Actions content pipeline · Cloudflare CDN
**Repo:** sascribe/sascribe-blog
**Last pipeline run:** 2026-04-16T20:06:23Z (success)

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Hugo Site | ✅ Live | sascribe.com via Cloudflare |
| GitHub Actions Pipeline | ✅ Live | content-pipeline.yml — 2 total runs, both success |
| GSC (Search Console) | ⚠️ Active, 0 indexed | 31 URLs submitted, 0 indexed as of 2026-04-16 |
| Resend / Email | — | Not configured for Sascribe |

### Traffic Snapshot (as of 2026-04-16)

#### Google Search Console — Last 28 Days
| Metric | Value |
|--------|-------|
| Total Impressions | 1,432 |
| Total Clicks | 0 |
| CTR | 0.00% |
| Avg Position | 8.3 |

- ElevenLabs pillar post alone: **1,381 impressions at position 8.3, zero clicks** — showing in search, not converting
- 5 pages total with any impressions; all others undiscovered
- 31 URLs in sitemap — **0 indexed** (entire site in "discovered, not indexed" state)
- Sitemap last submitted: 2026-04-04 · last downloaded by Google: 2026-04-05

#### Cloudflare Analytics — Last 28 Days
| Metric | Value |
|--------|-------|
| Total Page Views | 16,234 |
| Total Requests | 28,174 |
| Bandwidth | 213.4 MB |

- Traffic spikes align directly with pipeline publish days (Apr 2, 6–8, 15) — confirms bot/pipeline traffic, not organic
- Non-publish days: 172–477 PV/day · Publish days: 1,000–1,810 PV/day

### Content State (as of 2026-04-16)

**17 articles published** across 5 affiliates:

| Affiliate | Articles | Last Published | Types Completed |
|-----------|----------|----------------|-----------------|
| AdCreative AI | 5 | 2026-04-13 | review, comparison, tutorial, use-cases, news |
| ElevenLabs | 4 | 2026-04-13 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | 2026-04-14 | review, comparison, pillar, news |
| Synthesia | 3 | 2026-04-16 | pillar, tutorial, news |
| NordVPN | 1 | 2026-04-06 | review only |

**Content gaps:**
- NordVPN: missing comparison, tutorial, use-cases, pillar, news (5 types)
- Synthesia: missing review, comparison, use-cases (3 types)
- ElevenLabs: missing use-cases (1 type)

**Duplicate news hook problem identified:**
- 2026-04-13: Sam Altman Reddit thread used as hook for both AdCreative AI news AND ElevenLabs tutorial
- 2026-04-14/16: PlayStation viral video used as hook for both Beehiiv news AND Synthesia news
- Root cause: pipeline `generate-article.js` has no deduplication logic — fix queued for next session

### GitHub Actions

| Workflow | File | Total Runs | Last Run | Status |
|----------|------|-----------|----------|--------|
| Content Pipeline | .github/workflows/content-pipeline.yml | 2 | 2026-04-16T20:06:23Z | success |

### Pending (Sascribe)

| Item | Priority | Notes |
|------|----------|-------|
| GSC indexing — 0/31 indexed | CRITICAL | Investigate canonicals, resubmit sitemap, IndexNow ping all 17 articles |
| ElevenLabs pillar CTR fix | HIGH | 1,381 impr, 0 clicks — rewrite title/meta for click-through |
| Pipeline deduplication fix | HIGH | `scripts/generate-article.js` — dedupe news hooks across affiliates |
| NordVPN content expansion | HIGH | Run comparison, tutorial, news immediately (3 articles) |
| Internal linking audit | MEDIUM | Verify all 17 articles have internal links; ElevenLabs pillar must be linked from all ElevenLabs posts |
| GitHub Actions cron UTC offset | MEDIUM | Verify cron schedule matches intended publish times |
| ElevenLabs use-cases article | LOW | Only missing content type for ElevenLabs |
