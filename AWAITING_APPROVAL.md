# AWAITING APPROVAL — Manual Steps Required

## 1. Beehiiv Welcome Email (REQUIRED before running push traffic)

**Why this needs to be done manually:**  
The Beehiiv API does not support creating automation email content (enterprise plan only).  
The `/subscribe` Pages Function already adds subscribers to Beehiiv with `utm_source: elevenlabs-landing`.  
The welcome email must be set up in the Beehiiv dashboard.

**Steps:**
1. Go to https://app.beehiiv.com
2. Select publication: **Sascribe**
3. Navigate to: **Automations** → **New Automation** → trigger: **New Subscriber**
4. Add an email step immediately (delay: 0 minutes)
5. Use the subject and body below

---

### Welcome Email

**Subject:** Your free guide: 5 ways creators are earning with AI voice in 2026

**Preview text:** No studio, no experience, no gear. Here's what's working.

**Body (paste as HTML or use Beehiiv's editor):**

---

Here are 5 income streams creators are building right now with AI voice — specifically with ElevenLabs.

**01 — YouTube channel voiceovers**

Faceless YouTube is the fastest-growing creator model. No mic, no studio, no face required. ElevenLabs voices are indistinguishable from human narration. Finance, history, and tech explainer channels are doing this at scale. Write the script (or use AI), generate the voice, add stock footage, upload. Channels are hitting 100k+ views within 3 months.

**02 — Podcast narration**

Solo podcasts where you narrate pre-written episodes are big on Spotify and Apple Podcasts right now. You write a weekly deep-dive on any topic, generate the audio in under 10 minutes, and distribute. No recording sessions, no noise editing. Some creators run 3–4 shows this way simultaneously.

**03 — Audiobook creation**

If you've written a book, ebook, or course — turn it into an audiobook and sell it on Gumroad, Lemon Squeezy, or ACX. ElevenLabs Creator plan gives you 121,000 characters/month — roughly 2–3 hours of audio. A 20,000-word ebook takes about 45 minutes of audio. Audiobooks command 2–3x the price of the written version.

**04 — Corporate training videos**

B2B is where the real money is. Companies pay $500–$5,000 per training video and they need a lot of them — onboarding, compliance, product demos. If you can build slides or short videos, offer this as a service. The voiceover that used to cost $300 to record now costs about $0.30 with ElevenLabs.

**05 — Language learning content**

ElevenLabs supports 30+ languages with native-sounding voices. Language learners pay well for pronunciation guides, listening drills, and shadowing content. You can build a Gumroad product or YouTube channel in a language you don't even speak — just translate scripts and generate audio.

---

**[Try ElevenLabs Free →]** https://try.elevenlabs.io/25umn8melpnn

Creator plan is $11 your first month (normally $22). Start free, no credit card needed.

---

*You're receiving this because you subscribed at sascribe.com. [Unsubscribe]*

---

**After saving the automation, activate it (set to Live).**  
All new subscribers from the ElevenLabs landing page will get this email immediately on subscribe.

---

## 2. Beehiiv Post-Subscribe Redirect (OPTIONAL)

If Beehiiv supports a post-subscribe redirect URL in your publication settings:
- Go to: Settings → General → After subscribing
- Set redirect URL to: `https://try.elevenlabs.io/25umn8melpnn`

Note: The `/subscribe` Pages Function already handles the redirect on the landing page via JavaScript (2.5s after success → redirect to ElevenLabs). This is a belt-and-suspenders setting for direct Beehiiv embed flows.
