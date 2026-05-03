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

## 3. Beehiiv welcome email — SCALE PLAN REQUIRED (no workaround)

**Status (fully investigated 2026-05-03):**
- ✅ Subject: "Your free guide — 5 ways creators are earning with AI voice in 2026" — SET AND SAVED
- ✅ Preview text: "No studio, no experience, no gear. Here's what's working." — SET AND SAVED
- ✅ Body: ElevenLabs 5-income-streams content (372 words) — SET AND SAVED
- ✅ Trigger (IF / Added by API): Activated
- ✅ Send email step: Activated
- ❌ **Publish changes: BLOCKED — Beehiiv requires Scale plan ($49/month)**

**All workarounds exhausted:**
1. Settings → Emails: only configures sender name/reply-to, no welcome email content editor
2. Creating new automation: also requires Scale to publish (same paywall)
3. Publication-level `send_welcome_email: true` in subscribe.js: fires Beehiiv's system default, no content editor on current plan
4. No "Welcome Email" section exists in nav on Launch plan

**Current live state:** Subscribers get old "Hey, welcome aboard" auto-response. New ElevenLabs content is saved as draft.

**Action when PA campaigns start spending:** Upgrade to Scale at app.beehiiv.com → click "Publish changes" on the workflow. 1-click, content already saved.
- Breakeven: ~5 ElevenLabs signups/month ($11 each × 5 = $55 > $49/month Scale cost)
- Workflow URL: https://app.beehiiv.com/automations/6d04a7f1-8d0f-4707-9378-adafd8fe102d/workflow

---

## 4. PropellerAds creatives — Upload via dashboard (API has persistent 500 bug)

**Why pending:** PATCH /v5/adv/creatives/{id} returns 500 for any image payload (PNG, JPEG, any size). Confirmed server-side bug on ssp-api.propellerads.com. Tried: base64 PNG, base64 JPEG, 8KB icon, 77KB icon, both API base URLs.

**Upload manually via dashboard** (fastest path):
1. Go to propellerads.com → Campaigns → Find 10865252 → Creatives
2. For each creative (IDs: 26041829, 26041830, 26041831, 26041832):
   - Click Edit → upload icon from `~/Desktop/AffiliateMarketing/creatives/el_creative_{N}_icon_192x192.png`
   - Upload banner from `~/Desktop/AffiliateMarketing/creatives/el_creative_{N}_banner_492x328.jpg`

**When API bug is fixed, retry:**
```bash
source ~/.zshrc && cd ~/Desktop/AffiliateMarketing && python3 browser/upload_pa_creatives.py
```

---

## COMPLETED — No longer manual

The following items were previously listed here and have been automated:

- ~~Resend domain verification~~ → qr-perks.com re-verified ✅
- ~~BeMob offer destination URL~~ → Updated to landing page via API ✅
- ~~Hugo unsafe HTML rendering~~ → Fixed in hugo.toml ✅
- ~~Frequency cap 1/24h~~ → Applied via PATCH API to all 4 creatives ✅
