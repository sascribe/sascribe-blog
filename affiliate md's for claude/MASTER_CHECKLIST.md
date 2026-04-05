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
| ⏳ PENDING | NordVPN first article | S4 | Auto-publishes Mon Apr 7 9am |
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
| ✅ DONE | Discord Command Center | S5 | Every 2min — YDo6NIh2exauqaSi |
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

## FUTURE PROJECTS

| Status | Project | Notes |
|--------|---------|-------|
| ⏳ PENDING | Border Crossing program | After QR-Perks fully live |
| ⏳ PENDING | Stripe Connect QR-Perks payouts | After first conversions |
| ⏳ PENDING | Social media pipeline | After 30+ articles |

---

## DIRECTION CHANGES

| Date | Original | New Direction | Reason |
|------|---------|---------------|--------|
| 2026-04-05 | Article model | Switch to Sonnet | Kept Opus | Blue wants top quality — monitor credits, top up monthly |
| 2026-04-05 | QR-Perks static HTML | Cloudflare Worker + Supabase | Needed DB for driver tracking |
| 2026-04-05 | Stripe Connect | Manual payouts | No conversions yet |
| 2026-04-04 | Netlify | Cloudflare Pages | Performance + cost |
| 2026-04-05 | Telegram bot | Discord | Already wired in YouTube pipeline |
