# MASTER_CHECKLIST.md
*Single source of truth for all tasks across the operation.*
*Updated automatically every Claude Code session.*
*Last updated: 2026-04-05 14:36*

---

## HOW THIS FILE WORKS

Status codes:
- ✅ DONE — completed, deployed, confirmed working
- ⏳ PENDING — identified, not yet started
- 🔄 IN PROGRESS — actively being worked on
- ↩️ CHANGED — different direction (reason noted)
- ❌ DROPPED — decided not to do this
- 🔁 RECURRING — automated, runs on schedule

---

## SASCRIBE.COM — Technical SEO

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ✅ DONE | Schema markup (BlogPosting) all articles | S4 | baseof.html |
| ✅ DONE | FAQ schema (FAQPage JSON-LD) all articles | S5 | 3 questions each |
| ✅ DONE | Internal links all articles | S5 | 2 per article, keyword anchors |
| ✅ DONE | About page /about | S5 | E-E-A-T signal |
| ✅ DONE | ElevenLabs pillar title rewritten | S4 | Targets elevenlabs update 2026 |
| ✅ DONE | AdCreative review title rewritten | S5 | Is It Worth $29/Month? |
| ✅ DONE | Homepage meta description | S5 | hugo.toml |
| ✅ DONE | Cloudflare cache rules | S4 | Static 1mo, HTML 4hr |
| ✅ DONE | Cloudflare Web Analytics beacon | S5 | baseof.html |
| ✅ DONE | Synthesia disclosure moved after hook | S5 | 2 articles fixed |
| ✅ DONE | Hook-first rule in n8n prompt | S5 | All future articles |
| ✅ DONE | rel=sponsored on affiliate links | S3 | single.html |
| ⏳ PENDING | Backlink outreach — first 5 targets | S5 | Blue needs to send emails |
| ⏳ PENDING | Content refresh (30-day cycle) | S5 | Logic in audit, no articles refreshed yet |
| ⏳ PENDING | Word count audit — flag thin articles | S5 | Min threshold TBD |

## SASCRIBE.COM — Content Pipeline

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ✅ DONE | n8n pipeline Mon/Wed/Fri 9am | S1 | Active — epcaH77ZVtixXwa9 |
| ✅ DONE | NordVPN as 5th affiliate | S3 | CSS, redirect, Sheet, n8n wired |
| ✅ DONE | 2-week content queue Apr 7-18 | S4 | NordVPN first |
| ✅ DONE | Keyword clusters all 5 affiliates | S4 | In Sheet col M |
| ✅ DONE | NordVPN Dos/Donts in Sheet col E | S4 | Commission rates + compliant angles |
| ✅ DONE | NordVPN first article | S4 | Auto-publishes Mon Apr 7 9am |
| ⏳ PENDING | Expand to 6th affiliate | — | After NordVPN articles flowing |

## SASCRIBE.COM — Affiliates

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ✅ DONE | AdCreative AI live | S1 | 4 articles |
| ✅ DONE | ElevenLabs live | S1 | 2 articles |
| ✅ DONE | Synthesia live | S2 | 2 articles |
| ✅ DONE | Beehiiv live | S2 | 3 articles |
| ✅ DONE | NordVPN live | S3 | 0 articles yet |
| ⏳ PENDING | CJ_API_KEY in ~/.zshrc | S5 | From cj.com dashboard |
| ⏳ PENDING | ExpressVPN application | S4 | After NordVPN confirmed |
| ⏳ PENDING | Grammarly approval | S4 | Applied, waiting |
| ⏳ PENDING | HubSpot approval | S4 | Applied, waiting |
| ⏳ PENDING | Frase approval | S4 | Applied, waiting |
| ⏳ PENDING | SEMrush approval | S4 | Applied, waiting |

---

## QR-PERKS.COM

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ✅ DONE | Full site rebuild | S5 | Cloudflare Worker 1228 lines |
| ✅ DONE | Supabase backend | S5 | 6 tables, 50 trucks |
| ✅ DONE | Driver + admin dashboards | S5 | /driver /admin |
| ✅ DONE | Legal pages | S5 | /privacy /terms /disclosure /contractor |
| ✅ DONE | SubID tracking | S5 | Per truck attribution |
| ✅ DONE | ROK Financial offer card 1 | S3 | Live |
| ⏳ PENDING | Email list signup on landing page | S5 | High priority |
| ⏳ PENDING | Change admin password | S5 | Currently qrperks2026 |
| ⏳ PENDING | ROK Financial URL update in Supabase | S5 | Use actual tracking link |
| ⏳ PENDING | Insurance offer card | — | EverQuote/Liberty Mutual |
| ⏳ PENDING | Banking offer card | — | Chime/Axos |
| ⏳ PENDING | Phone plan offer card | — | Mint Mobile |
| ⏳ PENDING | Gas savings offer card | — | Upside/PayPal |
| ⏳ PENDING | QR codes printed | — | Blocked on offer cards |
| ⏳ PENDING | First real driver onboarded | — | Blocked on QR codes |

---

## AUTOMATION

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ✅ DONE | Sascribe Blog Pipeline | S1 | Mon/Wed/Fri 9am — epcaH77ZVtixXwa9 |
| ✅ DONE | Weekly SEO Audit Agent | S5 | Sunday 11pm — QQwdOvLUvh2War2A |
| ✅ DONE | Discord Command Center — LIVE DATA | S6 | Every 2min — YDo6NIh2exauqaSi — CF + n8n + GitHub live |
| ✅ DONE | Daily API Health Check | S5 | 8am daily — WZcswmhQsoRYriM4 |
| ⏳ PENDING | Unified affiliate dashboard | S5 | Mission 2 — CJ + ROK + PartnerStack |
| ⏳ PENDING | Content refresh automation | — | Auto-update old articles |

## Discord Commands

| Status | Command | Function |
|--------|---------|----------|
| ✅ DONE | !stats | GSC + traffic summary |
| ✅ DONE | !audit | Trigger SEO audit |
| ✅ DONE | !queue | Content queue |
| ✅ DONE | !pipeline | Pipeline status |
| ✅ DONE | !fix | Run auto-fixes |
| ✅ DONE | !help | Command menu |
| ✅ DONE | !credits | API key status + billing link |
| ✅ DONE | !checklist | Pending items summary |
| ⏳ PENDING | !qrperks | QR-Perks stats from phone |

## Credentials

| Status | Var | Notes |
|--------|-----|-------|
| ✅ | GH_TOKEN | GitHub |
| ✅ | GOOGLE_APPLICATION_CREDENTIALS | GSC + Sheets |
| ✅ | CLOUDFLARE_API_TOKEN | CF zones + workers |
| ✅ | CF_ZONE_SASCRIBE | $CF_ZONE_SASCRIBE |
| ✅ | CF_ZONE_QRPERKS | $CF_ZONE_QRPERKS |
| ✅ | CF_ACCOUNT_ID | $CF_ACCOUNT_ID |
| ✅ | N8N_API_KEY | n8n cloud |
| ✅ | N8N_BASE_URL | onestepbeyond.app.n8n.cloud/api/v1 |
| ✅ | SUPABASE_ACCESS_TOKEN | Management API |
| ✅ | SUPABASE_QRPERKS_URL | $SUPABASE_PROJECT_REF.supabase.co |
| ✅ | SUPABASE_QRPERKS_SECRET | Service role key |
| ✅ | DISCORD_BOT_TOKEN | YouTube Factory Bot |
| ✅ | ANTHROPIC_API_KEY | Claude API |
| ⏳ | CJ_API_KEY | Add from cj.com dashboard |

---


### NEXT BUILD PRIORITIES (Session 6)

| Status | Task | Notes |
|--------|------|-------|
| ✅ DONE | YouTube Data API integration | S6 | YOUTUBE_API_KEY live, 3 videos/article pulled by view count |
| ✅ DONE | Research Intelligence Node — 3 sources | S6 | YouTube + Reddit + Affiliate site → Haiku brief → Opus. Google CSE pending key fix. |
| ✅ DONE | Daily audit Apr 6 | S6 | 458 impr (+198), cache 0.8%, FAQ complete |
| ✅ DONE | Bot traffic identified — 67% of CF traffic is bots (FR/NL/SG/CN) | S6 | Real human traffic ~33% of CF numbers. GSC is accurate. |
| ❌ DROPPED | Enable Bot Fight Mode | S6 | Free plan — dashboard-only, no API support. Deferred until revenue. Bot detection built into audit instead. |
| ⏳ PENDING | Upgrade Cloudflare to paid plan | FUTURE | Unlocks Bot Fight Mode API + advanced security. Do after first affiliate revenue. |
| ⏳ PENDING | Fix Discord bot channels | #sascribe-audit and some commands not responding — debug token in hardcoded nodes |
| ⏳ PENDING | Backfill FAQ on 3 articles missing it | Automated — 2 min task for Code |
| ⏳ PENDING | CJ_API_KEY in ~/.zshrc | Get from cj.com dashboard — enables automated approval checks |
| ⏳ PENDING | QR-Perks email list verify live | Confirm signup form works on qr-perks.com |
| ⏳ PENDING | Mission 2 — unified affiliate dashboard | CJ + ROK + PartnerStack + Rewardful in one view |

### PIPELINE ENHANCEMENT — VIDEO RESEARCH (Implementation Plan)

Architecture approved: Option 3 (Haiku research + Opus writing)

Step 1 — YouTube Data API setup:
- Get YouTube Data API v3 key from Google Cloud Console (GCP project: sascribe)
- Add as YOUTUBE_API_KEY to ~/.zshrc
- Cost: free tier (10,000 requests/day — more than enough)

Step 2 — n8n research node (before Generate Article):
- Search YouTube for "[affiliate name] review 2026" + "[affiliate name] honest review"
- Pull top 3 video IDs by view count from relevant channels
- Fetch video transcripts via YouTube transcript API or captions endpoint

Step 3 — Claude Haiku extraction node:
- Feed transcripts to Haiku with prompt:
  "Extract from these video reviews: top pros, top cons, specific features mentioned,
   pricing details, real workflow tips, common complaints, things competitors do better.
   Output structured JSON. Do not copy exact phrases — extract factual insights only."

Step 4 — Inject into Opus article prompt:
- Pass Haiku JSON brief as "expert_context" into existing Generate Article node
- Opus writes article using both affiliate rules AND real-world video insights
- Result: articles with specific credible details no pure AI content can match

Cost impact: ~$0.06/article added (Haiku research) = ~$0.35/article total
Monthly at 12 articles: ~$4.20 vs current $3.48 — negligible difference
Budget: $20/month confirmed — full headroom

Direction: APPROVED — build in Session 6

---

## FUTURE PROJECTS

| Status | Project | Notes |
|--------|---------|-------|
| ⏳ PENDING | Border Crossing program | After QR-Perks fully live |
| ⏳ PENDING | Stripe Connect QR-Perks payouts | After first conversions |
| ⏳ PENDING | Social media pipeline | After 30+ articles |

---

## HOW TO READ BOT-INFLATED NUMBERS
*(Until Bot Fight Mode is enabled on paid plan)*

Cloudflare shows ~3x inflated numbers due to FR/NL/SG/CN bot traffic.

| Metric | What CF Shows | Real Estimate | Source of Truth |
|--------|--------------|---------------|-----------------|
| Page views | ~8,400 | ~2,800 | GSC clicks (accurate) |
| Unique visitors | ~1,750 | ~580 | GSC impressions (accurate) |
| Traffic by country | 67% bots | see GSC countries | GSC country data |

**Rule:** Always lead with GSC numbers in analysis. CF numbers = directional only until paid plan.
**Bot flag:** If FR+NL+SG+CN > 20% of CF requests = bot inflation present.
**Unknown browser PV > 30% of total** = bot inflation confirmed.

---

## DIRECTION CHANGES

| Date | Original | New Direction | Reason |
|------|---------|---------------|--------|
| 2026-04-05 | Article model | Switch to Sonnet | Kept Opus | Blue wants top quality — monitor credits, top up monthly |
| 2026-04-05 | QR-Perks static HTML | Cloudflare Worker + Supabase | Needed DB for driver tracking |
| 2026-04-05 | Stripe Connect | Manual payouts | No conversions yet |
| 2026-04-04 | Netlify | Cloudflare Pages | Performance + cost |
| 2026-04-05 | Telegram bot | Discord | Already wired in YouTube pipeline |

---

## RESEARCH INTELLIGENCE NODE — FULL SPECIFICATION
*Approved Session 5 — Build Session 6*
*Replaces simple YouTube research with full competitive intelligence stack*

### WHAT IT DOES
Before every article the pipeline writes, this node runs a full competitive research sweep
across 4 sources and produces a structured brief that Opus uses to write an article
specifically engineered to beat every current competitor on page 1.

### 4-SOURCE RESEARCH STACK

**SOURCE 1 — Google Top 10 Articles**
- API: Google Custom Search API (GCP project: sascribe — enable it, free 100 queries/day)
- Query: target keyword from content queue
- Action: web_fetch top 5-8 organic results (skip Reddit, YouTube, Amazon)
- Haiku extracts:
  - H2/H3 headings used (shows what Google rewards structurally)
  - Questions answered
  - Approximate word count
  - CTA placement and style
  - What they covered poorly or missed entirely (THE GAP = your angle)

**SOURCE 2 — YouTube Videos**
- API: YouTube Data API v3 (free tier — GCP project: sascribe, needs YOUTUBE_API_KEY)
- Query: "[affiliate] review 2026" + "[affiliate] honest review"
- Action: pull top 3-5 videos by view count, fetch transcripts/captions
- Haiku extracts:
  - Real user pros/cons (things article writers sanitize)
  - Specific feature details and workflow tips
  - Pricing gotchas and real cost at scale
  - Complaints competitors glossed over
  - Things the affiliate does better/worse than alternatives

**SOURCE 3 — Reddit + Quora**
- API: web_fetch (no API needed)
- Query: site:reddit.com "[affiliate]" + site:quora.com "[affiliate]"
- Action: fetch top 3-5 threads each
- Haiku extracts:
  - Real buyer questions (become FAQ targets)
  - Specific use case pain points
  - Comparisons real users make organically
  - Deal-breakers and hidden limitations
  - Praise that feels authentic (use as social proof angles)

**SOURCE 4 — Affiliate Own Content**
- API: web_fetch
- Sources: affiliate homepage, pricing page, blog, changelog
- Haiku extracts:
  - Features they emphasize most (what they want affiliates to sell)
  - Current pricing tiers and limits
  - Recent updates or new features
  - Their own customer testimonials
  - What differentiators they claim

### OUTPUT FORMAT (Haiku structured JSON brief)
{
  "target_keyword": "elevenlabs alternatives 2026",
  "competitor_gaps": ["none cover API pricing honestly", "no one mentions latency issues"],
  "top_headings_used": ["What is ElevenLabs", "ElevenLabs Pricing", "Best Alternatives"],
  "missing_headings": ["ElevenLabs for Audiobooks", "ElevenLabs API Limits"],
  "real_user_pros": ["voice cloning speed", "multilingual support"],
  "real_user_cons": ["credit system confusing", "free tier too limited"],
  "reddit_questions": ["does it work for long form audio", "is it worth it for podcasts"],
  "pricing_reality": "free tier 10k chars/month, starter $5 but limits hit fast",
  "affiliate_emphasis": ["voice cloning", "API access", "commercial license"],
  "recommended_angle": "Focus on audiobook creators — no one covers this segment well",
  "recommended_word_count": 2400,
  "faq_targets": ["Is ElevenLabs free?", "ElevenLabs vs Murf for audiobooks?"]
}

### INJECTION INTO OPUS PROMPT
Brief passed as expert_context variable in Generate Article node.
Opus instruction added: "Use the expert_context to write content that is more specific,
more credible, and covers gaps that current page 1 competitors miss.
Reference insights from expert_context naturally — never copy phrases."

### APIs NEEDED (add to ~/.zshrc)
- YOUTUBE_API_KEY — Google Cloud Console → APIs → YouTube Data API v3
- GOOGLE_CSE_KEY + GOOGLE_CSE_CX — Custom Search API + Search Engine ID
  Enable at: console.cloud.google.com (project: sascribe)
  Create CX at: programmablesearchengine.google.com (set to search entire web)
  Free: 100 queries/day — enough for 3 articles/day at current schedule

### COST BREAKDOWN
Source 1 Google articles (5 pages, Haiku): ~$0.07/article
Source 2 YouTube transcripts (3 videos, Haiku): ~$0.05/article
Source 3 Reddit/Quora (5 threads, Haiku): ~$0.02/article
Source 4 Affiliate content (3 pages, Haiku): ~$0.01/article
Brief output (Haiku): ~$0.01/article
Article generation (Opus): ~$0.29/article
TOTAL: ~$0.45/article | ~$5.40/month at 12 articles
Room to publish daily (30/month) for ~$13.50/month — within $20 budget

### BUILD ORDER (Session 6)
1. Enable Google Custom Search API in GCP project sascribe
2. Create Custom Search Engine at programmablesearchengine.google.com
3. Get YouTube Data API v3 key from GCP
4. Add YOUTUBE_API_KEY, GOOGLE_CSE_KEY, GOOGLE_CSE_CX to ~/.zshrc
5. Build Research Intelligence Node in n8n (parallel 4-branch before Generate Article)
6. Test on one manual execution before activating on schedule
7. Monitor first 3 articles for quality — adjust Haiku prompts as needed

### SESSION 7 TASK QUEUE

| Priority | Task | Status | Notes |
|----------|------|--------|-------|
| 1 | Fix Discord bot live data | ✅ DONE | !stats !credits !queue etc return static Claude text not live API data. Needs real data injection per command. |
| 2 | NordVPN first article published | ✅ DONE | Pipeline fixed — verify article quality and Discord ping fires |
| 3 | Get GCP API keys (YOUTUBE_API_KEY, GOOGLE_CSE_KEY, GOOGLE_CSE_CX) | ✅ DONE | YOUTUBE_API_KEY + GOOGLE_CSE_KEY + GOOGLE_CSE_CX — 5 min manual at console.cloud.google.com |
| 4 | Build Research Intelligence Node | ✅ DONE | 3 sources live (YouTube, Reddit, Affiliate). Google CSE pending API key restriction fix. |
| 5 | Mission 2 — unified affiliate dashboard | ⏳ PENDING | CJ + ROK + PartnerStack data in one view |
| 5 | Fix Google CSE API key restriction | ⏳ PENDING | console.cloud.google.com → Credentials → edit API key → add Custom Search API to allowed APIs |
| 6 | CJ_API_KEY in ~/.zshrc | ⏳ PENDING | Get from cj.com dashboard |

### NEXT BUILD PRIORITIES (Session 7)

| Priority | Task | Status | Notes |
|---|---|---|---|
| 1 | Enable GCP billing for sascribe project | ⏳ PENDING | Unlocks Google CSE as Source 1 — console.cloud.google.com → sascribe → Billing |
| 2 | Regenerate YouTube/CSE API key in GCP | ⏳ PENDING | Old key was briefly in STATE.md — rotate at console.cloud.google.com → Credentials |
| 3 | Add !qrperks Discord command | ⏳ PENDING | Supabase query for truck scan/conversion stats |
| 4 | QR-Perks offer cards | ⏳ PENDING | Insurance (EverQuote), Banking (Chime), Phone (Mint Mobile), Gas (Upside) |
| 5 | CJ_API_KEY in ~/.zshrc | ⏳ PENDING | From cj.com dashboard |
