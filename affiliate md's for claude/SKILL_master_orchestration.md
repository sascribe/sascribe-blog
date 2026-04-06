# SKILL: Master Orchestration
*Full infrastructure map for Blue's affiliate operation*
*Last updated: 2026-04-06*

---

## OPERATION OVERVIEW

Three active projects:
1. Sascribe.com — Hugo affiliate blog, 5 affiliates, automated content pipeline
2. QR-Perks.com — Cloudflare Worker + Supabase, truck QR affiliate platform
3. Border Crossing Program — not started

---

## SASCRIBE.COM INFRASTRUCTURE

Repo: sascribe/sascribe-blog
Host: Cloudflare Pages (auto-deploy on push)
Domain: sascribe.com (zone: $CF_ZONE_SASCRIBE)
Framework: Hugo, custom layouts only

Key files:
  layouts/_default/single.html — article template
  layouts/_default/baseof.html — BlogPosting JSON-LD + Web Analytics
  static/css/sascribe.css — main stylesheet
  content/posts/ — all articles
  content/about.md — E-E-A-T page

Affiliates (5):
  AdCreative AI | slug: adcreative | style: promo | 4 articles
  ElevenLabs    | slug: elevenlabs | style: logo  | 2 articles
  Synthesia     | slug: synthesia  | style: logo  | 2 articles
  Beehiiv       | slug: beehiiv   | style: logo  | 3 articles
  NordVPN       | slug: nordvpn   | style: logo  | 0 articles (first fires Apr 7)

Affiliate redirects: Cloudflare Redirect Rules /go/<slug> → tracking URL

Google Sheet (affiliate tracking):
  ID: 1MUkQZRjOFqfpcPCnNL6sPaUETHa3I8q9okbV-wT7MXI
  Columns A-L: Name, Category, Affiliate URL, CF Slug, Dos/Donts, Status,
               Image Path, Last Content Type, Last Published, Total Articles,
               Image Style, Published Types

---

## n8n WORKFLOWS

Base URL: https://onestepbeyond.app.n8n.cloud/api/v1

| ID | Name | Schedule | Status |
|----|------|----------|--------|
| epcaH77ZVtixXwa9 | Sascribe Blog Pipeline | Mon/Wed/Fri 9am PST | Active |
| QQwdOvLUvh2War2A | Weekly SEO Audit Agent | Sunday 11pm | Active |
| YDo6NIh2exauqaSi | Discord Command Center | Every 2 min | Active |
| WZcswmhQsoRYriM4 | Daily API Health Check | 8am daily | Active |

Blog Pipeline nodes (in order):
  Schedule → Pull Sheet → Pick Affiliate → Generate Article (Opus) →
  Parse Frontmatter → Push to GitHub → Update Sheet → IndexNow → Discord Alert

n8n API patterns:
  GET /workflows → list all
  GET /workflows/{id} → get detail
  PUT /workflows/{id} → update (safe_put pattern — strip unknown settings keys)
  POST /workflows/{id}/activate → activate after create/update
  NEVER include "active" field in POST /workflows body

safe_put pattern (settings whitelist):
  Only send: executionOrder, callerPolicy, saveManualExecutions, errorWorkflow
  Reject all other settings keys or n8n returns 400

---

## DISCORD

Server: YouTube Factory Control (guild: 1470580128324259985)
Bot: YouTube Factory Bot (token in DISCORD_BOT_TOKEN env var)

Channels:
  #sascribe-alerts:   1490454712200200345 — automated alerts
  #sascribe-commands: 1490454715627081908 — command center (read + reply)

Commands (polled every 2 min from #sascribe-commands):
  !stats     — GSC + traffic summary
  !audit     — trigger SEO audit
  !queue     — content queue
  !pipeline  — pipeline status
  !fix       — run auto-fixes
  !credits   — API key status + balance
  !checklist — pending items
  !help      — command menu

Discord API auth: Bot {token} in Authorization header
Note: credential expressions ($credentials.discordBotApi.botToken) do NOT work
in httpRequest nodes — must hardcode "Bot {token}" directly in header value.

---

## QR-PERKS.COM INFRASTRUCTURE

Repo: sascribe/qrperks-site (worker.js + schema.sql)
Worker: qrperks (route: qr-perks.com/*)
Supabase: $SUPABASE_PROJECT_REF (us-west-1, 6 tables)

Tables: affiliates, drivers, trucks, scans, conversions, admins, email_signups

All routes:
  GET /              — landing page (5 offer cards)
  GET /t{1-50}       — log scan + redirect to /?t={truck_id}
  GET /go/{id}       — track click + redirect to affiliate URL + SubID
  GET /driver        — driver registration/login
  GET /driver/dashboard?token= — driver earnings
  GET /admin         — admin login (ADMIN_PASSWORD secret)
  GET /admin/dashboard — full admin panel
  POST /api/email/subscribe — email list capture
  POST /api/driver/register|login — driver auth
  POST /api/admin/login — admin auth
  GET /api/admin/data — admin data
  GET /api/driver/data?token= — driver data
  GET /privacy|/terms|/disclosure|/contractor — static legal pages

SubID format: ?subid=qrp_{truck_id}&utm_source=qrperks&utm_medium=qr&utm_campaign={truck_id}

Deploy: multipart PUT to CF Workers API
  URL: https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT_ID}/workers/scripts/qrperks
  Boundary: ----FormBoundary7MA4YWxkTrZu0gW
  Parts: metadata (main_module, compatibility_date) + worker.js content

---

## RESEARCH INTELLIGENCE NODE (APPROVED — BUILD SESSION 6)

4-source competitive research before every article:

Source 1: Google Custom Search API
  Key: GOOGLE_CSE_KEY (GCP project: sascribe — enable Custom Search API)
  CX:  GOOGLE_CSE_CX (create at programmablesearchengine.google.com)
  Query: target keyword → top 10 results → web_fetch 5-8 articles
  Haiku extracts: headings, gaps, word count, CTA structure

Source 2: YouTube Data API v3
  Key: YOUTUBE_API_KEY (GCP project: sascribe — enable YouTube Data API v3)
  Query: "[affiliate] review 2026" → top 3-5 by views → transcripts
  Haiku extracts: real user pros/cons, pricing gotchas, complaints

Source 3: Reddit + Quora
  No API needed — web_fetch reddit.com/search.json + quora.com/search
  Haiku extracts: real buyer questions → FAQ targets, deal-breakers

Source 4: Affiliate own content
  web_fetch affiliate homepage + pricing + blog + docs
  Haiku extracts: features they push, pricing tiers, testimonials

Output: structured JSON brief → injected into Opus as expert_context
Cost: ~$0.45/article | Monthly at 12 articles: ~$5.40

---

## ENV VARS (all in ~/.zshrc)

GH_TOKEN | GOOGLE_APPLICATION_CREDENTIALS | CLOUDFLARE_API_TOKEN
CF_ZONE_SASCRIBE | CF_ZONE_QRPERKS | CF_ACCOUNT_ID
N8N_API_KEY | N8N_BASE_URL | ANTHROPIC_API_KEY
SUPABASE_ACCESS_TOKEN | SUPABASE_QRPERKS_URL | SUPABASE_QRPERKS_SECRET
DISCORD_BOT_TOKEN

Needed next session:
  YOUTUBE_API_KEY — GCP console → YouTube Data API v3
  GOOGLE_CSE_KEY  — GCP console → Custom Search API
  GOOGLE_CSE_CX   — programmablesearchengine.google.com

---

## BASELINE METRICS (APR 6 2026)

GSC 28d: 458 impr | 0 clicks | pos 8.1 | CTR 0%
CF 7d: ~7.8k PV | ~1.5k uniq | cache 0.8%
Articles: 11 (NordVPN #1 fires 9am Apr 7)
All articles: schema + FAQ + internal links + descriptions ✅
