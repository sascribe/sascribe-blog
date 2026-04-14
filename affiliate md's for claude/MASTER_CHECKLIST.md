# MASTER_CHECKLIST.md
*Single source of truth for all tasks across the operation.*
*Updated automatically every Claude Code session.*
*Last updated: 2026-04-13*

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
| ✅ DONE | Fix GSC canonical tag | S8 | <link rel="canonical"> added to baseof.html |
| ✅ DONE | Fix GSC noindex (taxonomy/pagination) | S8 | Conditional noindex added to baseof.html |
| ✅ DONE | Fix sitemap (exclude taxonomy pages) | S8 | Custom layouts/sitemap.xml + hugo.toml sitemap config |
| ✅ DONE | Fix all article meta descriptions | S8 | 12 articles updated to 150-160c |
| ✅ DONE | ElevenLabs pillar title optimized | S8 | Targets "elevenlabs update 2026" query |
| ⏳ PENDING | Monitor GSC re-indexing | S9 | Allow 7-14 days after canonical/noindex fixes |
| ⏳ PENDING | Backlink outreach — first 5 targets | S5 | Blue needs to send emails |
| ⏳ PENDING | Content refresh (30-day cycle) | S5 | Logic in audit, no articles refreshed yet |
| ⏳ PENDING | Word count audit — flag thin articles | S5 | Min threshold TBD |

## SASCRIBE.COM — Content Pipeline

| Status | Task | Session | Notes |
|--------|------|---------|-------|
| ❌ DROPPED | n8n pipeline Mon/Wed/Fri 9am | S1 | Execution limits exhausted — replaced by GitHub Actions |
| ✅ DONE | NordVPN as 5th affiliate | S3 | CSS, redirect, Sheet, n8n wired |
| ✅ DONE | 2-week content queue Apr 7-18 | S4 | NordVPN first |
| ✅ DONE | Keyword clusters all 5 affiliates | S4 | In Sheet col M |
| ✅ DONE | NordVPN Dos/Donts in Sheet col E | S4 | Commission rates + compliant angles |
| ✅ DONE | scripts/generate-article.js | S8 | Zero-dep Node 20 — Sheet→research→Claude→commit→IndexNow |
| ✅ DONE | 2 articles published (ElevenLabs tutorial + AdCreative news) | S8 | Both live — 200 confirmed |
| ⚠️ BLOCKED | .github/workflows/content-pipeline.yml | S8 | GH_TOKEN needs `workflow` scope — add at github.com/settings/tokens |
| ✅ DONE | GitHub Actions secrets (4) | S8 | ANTHROPIC_API_KEY, YOUTUBE_API_KEY, GH_TOKEN, GSHEETS_SERVICE_ACCOUNT_JSON |
| ⏳ PENDING | Expand to 6th affiliate | — | After pipeline confirmed stable |

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
| ✅ DONE | Full platform audit + all bugs fixed | S9 | v4 worker deployed 2026-04-13 |
| ✅ DONE | Real QR codes embedded (T1-T8) | S9 | SVGs embedded in worker, placeholder replaced |
| ✅ DONE | Dashboard scan count fix | S9 | Uses driver's actual truck IDs, not hardcoded t1-t8 |
| ✅ DONE | Referral page status fix | S9 | Shows actual driver status, not hardcoded "active" |
| ✅ DONE | ROK Financial section fix | S9 | offer_type changed to "business" — shows in "Need Funding?" |
| ✅ DONE | Admin truck assignment UI | S9 | /admin/dashboard#trucks — assign/unassign trucks to drivers |
| ✅ DONE | /api/stats endpoint | S9 | Returns live platform stats for !qrperks Discord command |
| ✅ DONE | Copyright year 2025→2026 | S9 | All pages updated |
| ✅ DONE | Resend domain verified | S9 | qr-perks.com verified, emails sending from noreply@qr-perks.com |
| ✅ DONE | Email list signup on landing page | S5 | Hero email capture + bridge overlay capture — working |
| ✅ DONE | Admin password changed | S9 | gNNPu9OL8kvN7jArPaqS (from CREDENTIALS.md) |
| ✅ DONE | EN/ES dual toggle — both buttons always visible | S10 | v6 worker — active btn highlights green, localStorage persists |
| ✅ DONE | Password eye toggle on all password inputs | S10 | v6 worker — all auth pages, dashboard, admin login |
| ✅ DONE | Real QR PNG images embedded as base64 data URIs | S10 | T1-T8 JPGs from ~/Downloads/files/ — display + PNG/JPG/SVG download |
| ✅ DONE | Affiliate links all tested live and resolving | S10 | All 5 return valid 302 → destination URLs |
| ✅ DONE | Truck assignments corrected in Supabase | S10 | Geo→t2,t3 | Speedy→t1,t4-t8 | Test→t9,t10 |
| ✅ DONE | Driver accounts + seed data confirmed | S10 | geodriver=$31 direct | speedydriver=$52.75+$14.20 | driver=$47.50+$8.20 | newdriver=$12 |
| ✅ DONE | /leads-terms in footer | S10 | Consumer Data Terms link added to landing page footer |
| ✅ DONE | /admin/forgot-password route | S10 | Returns informational page (admin PW resets via CF Worker secret) |
| ✅ DONE | Earnings breakdown (Direct/Referral/Total) | S10 | Driver earnings page shows 3-line breakdown from live Supabase |
| ✅ DONE | 26/26 routes pass (200) | S10 | Full route test passed — all routes live |
| ⏳ PENDING | Insurance offer card | — | EverQuote/Liberty Mutual — pending affiliate approval |
| ⏳ PENDING | Banking offer card | — | Chime/Axos — pending affiliate approval |
| ⏳ PENDING | Phone plan offer card | — | Mint Mobile — pending affiliate approval |
| ⏳ PENDING | Gas savings offer card | — | Upside/PayPal — pending affiliate approval |
| ⏳ PENDING | QR codes printed | — | JPG PNGs embedded in worker — need print vendor |
| ⏳ PENDING | First real driver onboarded | — | Accounts and truck assignments ready |

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
| ✅ DONE | !qrperks | QR-Perks stats from phone — /api/stats endpoint live at qr-perks.com/api/stats |

## Credentials

| Status | Var | Notes |
|--------|-----|-------|
| ✅ | GH_TOKEN | GitHub |
| ✅ | GOOGLE_APPLICATION_CREDENTIALS | GSC + Sheets |
| ✅ | CLOUDFLARE_API_TOKEN | CF zones + workers |
| ✅ | CF_ZONE_SASCRIBE | a415e6afd4367cdcf15c1335b17cb6e0 |
| ✅ | CF_ZONE_QRPERKS | 2c424ccc5fe93280f0d28ffdd3327dce |
| ✅ | CF_ACCOUNT_ID | d7da7199489efff971e5884c54e59255 |
| ✅ | N8N_API_KEY | n8n cloud |
| ✅ | N8N_BASE_URL | onestepbeyond.app.n8n.cloud/api/v1 |
| ✅ | SUPABASE_ACCESS_TOKEN | Management API |
| ✅ | SUPABASE_QRPERKS_URL | fsaxluprhgmyaipaujdn.supabase.co |
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

### SESSION 8 COMPLETED — 2026-04-13

**DONE THIS SESSION:**
- ✅ scripts/generate-article.js — zero-dep Node 20 pipeline live
- ✅ package.json — zero deps
- ✅ 4 GitHub Actions secrets set
- ✅ ElevenLabs tutorial (long-form) published + live: https://sascribe.com/posts/2026-04-13-elevenlabs-tutorial-1776098862246/
- ✅ AdCreative news (short) published + live: https://sascribe.com/posts/2026-04-13-adcreative-news-1776098917281/
- ✅ baseof.html: canonical tag + conditional noindex
- ✅ hugo.toml: sitemap config added
- ✅ layouts/sitemap.xml: custom template excludes taxonomy/term pages
- ✅ ElevenLabs pillar: title updated to target "elevenlabs update 2026"
- ✅ 12 articles: meta descriptions fixed to 150-160 chars

**BLOCKED (one manual step):**
- ⚠️ .github/workflows/content-pipeline.yml — needs `workflow` scope on GH_TOKEN
  **Fix**: github.com/settings/tokens → edit token → check `workflow` → save
  Then run in terminal: `git -C /tmp/sascribe-repo push origin main`

### SESSION 9 COMPLETED — 2026-04-13

**QR-PERKS FULL AUDIT + FIX — ALL DONE:**
- ✅ Worker v4 deployed — 2000 lines, all bugs fixed
- ✅ Real QR codes (T1-T8 SVGs) embedded — drivers download real QR codes not placeholder
- ✅ Dashboard scan count fixed — uses driver's own truck IDs (was hardcoded t1-t8)
- ✅ Referral page — shows real driver status from DB (was hardcoded "active")
- ✅ ROK Financial offer_type 'business' — shows in "Need Funding?" section correctly
- ✅ Admin truck assignment UI — /admin/dashboard#trucks with assign/unassign dropdown
- ✅ /api/stats live — drivers, scans, leads, commissions in JSON (for !qrperks Discord)
- ✅ Copyright year 2025 → 2026 on all pages
- ✅ Resend domain verified — emails from noreply@qr-perks.com working
- ✅ worker.js updated in GitHub sascribe/qrperks-site repo

**BLOCKED (one manual step):**
- ⚠️ .github/workflows/content-pipeline.yml — needs `workflow` scope on GH_TOKEN
  **Fix**: github.com/settings/tokens → edit token → check `workflow` → save
  Then run in terminal: `git -C /tmp/sascribe-repo push origin main`

### SESSION 10 TASK QUEUE

| Priority | Task | Status | Notes |
|----------|------|--------|-------|
| 0 | Unblock workflow push | ⚠️ BLOCKED | Add `workflow` scope to GH_TOKEN — 2 min manual step |
| 1 | Wire !qrperks Discord command | ⏳ PENDING | Hits /api/stats and formats response in Discord bot |
| 2 | Onboard first real driver | ⏳ PENDING | Admin truck assignment UI is live — pick a truck, add driver |
| 3 | Monitor GSC re-indexing | ⏳ PENDING | Allow 7-14 days after canonical/noindex fixes |
| 4 | Fix Discord bot live data | ⏳ PENDING | !stats !credits !queue return static text |
| 5 | Mission 2 — unified affiliate dashboard | ⏳ PENDING | CJ + ROK + PartnerStack |
| 6 | Fix Google CSE API key restriction | ⏳ PENDING | console.cloud.google.com → add Custom Search API |
| 7 | CJ_API_KEY in ~/.zshrc | ⏳ PENDING | Get from cj.com dashboard |

