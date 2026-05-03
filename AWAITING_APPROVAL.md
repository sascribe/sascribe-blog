# AWAITING APPROVAL — Manual Steps Required
# Last updated: 2026-05-03
# Items here have been exhausted via API — only genuinely impossible-to-automate steps remain.

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

## 3. Beehiiv welcome automation — email content (API enterprise-only)

**Why manual:** Beehiiv automation creation API returns 404. Post creation API (for email content) returns 403 enterprise-only. The `/subscribe` Pages Function already subscribes users to Beehiiv with `send_welcome_email: true` and `utm_source: elevenlabs-landing`.

**Steps:**
1. Go to https://app.beehiiv.com → Select "Sascribe" publication
2. Navigate to **Automations** → **New Automation**
3. Set trigger: **New Subscriber**
4. Add email step with delay: **0 minutes** (immediate)
5. Use this content:

**Subject:** Your free guide — 5 ways creators are earning with AI voice in 2026  
**Preview text:** No studio, no experience, no gear. Here's what's working.

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

6. **Activate** the automation (set to Live)

---

## COMPLETED — No longer manual

The following items were previously listed here and have been automated:

- ~~Resend domain verification~~ → qr-perks.com re-verified ✅
- ~~BeMob offer destination URL~~ → Updated to landing page via API ✅
- ~~Hugo unsafe HTML rendering~~ → Fixed in hugo.toml ✅
- ~~Frequency cap 1/24h~~ → Applied via PATCH API to all 4 creatives ✅
