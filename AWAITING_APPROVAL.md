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

## 3. Beehiiv welcome email — UPDATE BODY ONLY (subject + preview already set via Playwright)

**Playwright automation status (2026-05-03):**
- ✅ Subject: "Your free guide — 5 ways creators are earning with AI voice in 2026" — SET AND SAVED
- ✅ Preview text: "No studio, no experience, no gear. Here's what's working." — SET AND SAVED
- ❌ Body: Old content ("Hey, welcome aboard") still present — ProseMirror editor resists programmatic clearing
- ❌ Trigger: Needs re-activation after editing
- ❌ Publish changes: Disabled until trigger is active

**This is a 3-minute manual task. Exact steps:**

1. Go to: https://app.beehiiv.com/automations/6d04a7f1-8d0f-4707-9378-adafd8fe102d/workflow
2. Click the **"IF / Added by API"** card → click **"Activate"** in the right panel
3. Click the **"Send email"** card → click **"Edit email"**
4. Click **"Write"** tab → select all body text (Cmd+A) → delete → paste the body below
5. Click **Save** → click **"Publish changes"**

**Subject (already set, do not change):** Your free guide — 5 ways creators are earning with AI voice in 2026  
**Preview text (already set, do not change):** No studio, no experience, no gear. Here's what's working.

**Body:**
> Here are 5 income streams creators are building right now with AI voice — specifically with ElevenLabs.
>
> **01 — YouTube channel voiceovers**  
> Faceless YouTube is the fastest-growing creator model. No mic, no studio, no face required. ElevenLabs voices are indistinguishable from human narration. Finance, history, and tech explainer channels are doing this at scale. Write the script (or use AI), generate the voice, add stock footage, upload. Channels are hitting 100k+ views within 3 months.
>
> **02 — Podcast narration**  
> Solo podcasts where you narrate pre-written episodes are big on Spotify and Apple Podcasts right now. Write a weekly deep-dive, generate audio in under 10 minutes, distribute. No recording sessions, no noise editing. Some creators run 3–4 shows simultaneously.
>
> **03 — Audiobook creation**  
> Turn any book, ebook, or course into an audiobook and sell it on Gumroad, Lemon Squeezy, or ACX. Creator plan gives you 121,000 characters/month — roughly 2–3 hours of audio. Audiobooks command 2–3x the price of the written version.
>
> **04 — Corporate training videos**  
> Companies pay $500–$5,000 per training video — onboarding, compliance, product demos. The voiceover that used to cost $300 to record now costs ~$0.30 with ElevenLabs.
>
> **05 — Language learning content**  
> 30+ languages with native-sounding voices. Language learners pay well for pronunciation guides and listening drills. Build a Gumroad product or YouTube channel in a language you don't even speak — just translate scripts and generate audio.
>
> ---
> **[Try ElevenLabs Free →]** https://try.elevenlabs.io/25umn8melpnn?utm_source=beehiiv&utm_medium=email&utm_campaign=welcome
>
> Creator plan is $11 your first month (normally $22). Start free, no credit card needed.
>
> ---
> *You're receiving this because you subscribed at sascribe.com. [Unsubscribe]*

**No activation needed** — the welcome email fires automatically once content is saved and `send_welcome_email: true` is passed (already the case in subscribe.js).

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
