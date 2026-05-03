# AWAITING APPROVAL — Manual Steps Required
# Last updated: 2026-05-03
# Items here have been exhausted via API/Playwright — only genuinely impossible-to-automate steps remain.

---

## 1. PropellerAds campaign 10865252 — Targeting settings (API cannot PATCH targeting)

**Why manual:** The PA API PATCH `/v5/adv/campaigns/{id}` rejects the `targeting` object as an "extra field". Targeting is write-once at campaign creation. No targeting sub-endpoint exists. Three settings must be applied in the dashboard.

**Campaign:** ElevenLabs — Make Money AI Voice — Push (ID: **10865252**)  
**Dashboard path:** propellerads.com → Campaigns → Find 10865252 → Edit

Apply these three settings:

| Setting | Current | Target | Dashboard path |
|---------|---------|--------|----------------|
| User activity | High + Medium (1,2) | High only (1) | Targeting → User Activity → uncheck Medium |
| Browser | All | Chrome + Safari only | Targeting → Browser → select Chrome, Safari; exclude Opera Mini, UC Browser |
| OS / Platform | All mobile | iOS + Android 10+ | Targeting → OS → iOS (all), Android (min 10.0) |

**Already applied via API (no manual action needed):**
- ✅ Frequency cap: 1 impression per user per 24 hours (`click_frequency=1`, `click_capping=86400` on all 4 creatives)
- ✅ US targeting: set at creation
- ✅ WiFi + carrier: both allowed (default)
- ✅ Target URL macros: `visitor_id=${SUBID}&zoneid={zoneid}&campaignid={campaignid}&bannerid={bannerid}` ✅

---

## 2. PropellerAds — Activate campaigns (images already uploaded)

**Creative images uploaded via API 2026-05-03:**
- Icon (192x192): `~/Desktop/AffiliateMarketing/creatives/elevenlabs_icon_192x192.png` ✅ uploaded to all 4 creatives
- Banner (492x328): `~/Desktop/AffiliateMarketing/creatives/elevenlabs_banner_492x328.jpg` ✅ uploaded to all 4 creatives
- Source photo: ZDNyhmgkZlQ (Will Francis / Unsplash) — professional studio headphones on microphone
- Frequency cap: 1/24h applied to all creatives via API ✅

**All 4 campaigns still in Draft (status 1). Activate when ready to spend:**

| Campaign ID | Name | Daily Budget | Total Budget | Action |
|-------------|------|-------------|-------------|--------|
| 10865252 | ElevenLabs — Make Money AI Voice — Push | $10/day | $28 total | Activate when Beehiiv welcome email is live |
| 10865253 | SaaS Ebook — AI Creator Toolkit — Push | $14/day | $40 total | Activate after ebook landing page is built |
| 10865254 | Side Hustle Playbook — Push | $10/day | $30 total | Activate after ebook landing page is built |
| 10865255 | NordVPN — Security Fear — Push | $10/day | $30 total | Activate when ready |

**To activate:** propellerads.com → Campaigns → find campaign → change status to Active. Images are already there, no upload needed.

---

## 3. Beehiiv welcome email — BLOCKED BY PAYWALL (decision required)

**Status (2026-05-03 session 2):**
- ✅ Subject: "Your free guide — 5 ways creators are earning with AI voice in 2026" — SET AND SAVED
- ✅ Preview text: "No studio, no experience, no gear. Here's what's working." — SET AND SAVED
- ✅ Body: ElevenLabs 5-income-streams content — SET AND SAVED (372 words)
- ✅ Trigger (IF / Added by API): Activated
- ✅ Send email step: Activated
- ❌ **Publish changes: BLOCKED — Beehiiv requires Scale plan ($49/month)**

**Beehiiv paywall confirmed:** Clicking "Publish changes" opens an upsell modal:
> "Upgrade to Scale to publish and activate your automations. $49/month for up to 1,000 subscribers."

**Current state:** The automation is technically live (old "Hey, welcome aboard" body is what subscribers receive). New content is saved as a draft but cannot be published without Scale plan.

**Decision required — two options:**

| Option | Cost | Impact |
|--------|------|--------|
| Upgrade to Beehiiv Scale | $49/month | Publish ElevenLabs welcome email immediately. Required for automation publishing. |
| Keep Grow plan (current) | $0 | Old welcome email stays live. New subscribers get generic "Hey, welcome aboard" instead of ElevenLabs affiliate pitch. |

**Recommendation:** If PA campaign 10865252 (ElevenLabs push) is live and driving subscribers, the welcome email is the primary conversion point. $49/month breakeven = ~5 ElevenLabs signups/month at $11 first-month commission. Worth it if subscriber volume justifies.

**If you upgrade:** The content is already saved. Just go to the workflow URL and click "Publish changes" — it will work immediately after upgrade.

Workflow URL: https://app.beehiiv.com/automations/6d04a7f1-8d0f-4707-9378-adafd8fe102d/workflow

---

## 4. PropellerAds creatives — Retry image upload (PA API server bug)

**Why pending:** PATCH /v5/adv/creatives/{id} returns 500 for valid 192x192 PNG icons. Server-side PA bug confirmed (validation works, processing crashes). 4 distinct creatives are generated and ready.

**To retry when PA fixes their image server:**
```bash
source ~/.zshrc && cd ~/Desktop/AffiliateMarketing && python3 browser/upload_pa_creatives.py
```

**Files ready:**
| PA ID | Icon | Banner | Title |
|-------|------|--------|-------|
| 26041829 | el_creative_1_icon_192x192.png | el_creative_1_banner_492x328.jpg | Make $500/Month: AI Voice |
| 26041830 | el_creative_2_icon_192x192.png | el_creative_2_banner_492x328.jpg | AI Side Hustle While You Sleep |
| 26041831 | el_creative_3_icon_192x192.png | el_creative_3_banner_492x328.jpg | Start a Podcast in 10 Minutes |
| 26041832 | el_creative_4_icon_192x192.png | el_creative_4_banner_492x328.jpg | 1M+ Creators Use This AI Tool |

All in: `~/Desktop/AffiliateMarketing/creatives/`

---

## COMPLETED — No longer manual

The following items were previously listed here and have been automated:

- ~~Resend domain verification~~ → qr-perks.com re-verified ✅
- ~~BeMob offer destination URL~~ → Updated to landing page via API ✅
- ~~Hugo unsafe HTML rendering~~ → Fixed in hugo.toml ✅
- ~~Frequency cap 1/24h~~ → Applied via PATCH API to all 4 creatives ✅
