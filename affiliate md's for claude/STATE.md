# SASCRIBE STATE.md
*Paste this at the start of every new session to bring Claude up to speed.*
*Update this file at the end of every session with any major changes.*

---

## OWNER
Blue — owner-operator, Southern California. Also runs Blue Frog Aggregates, DumpTikGo, Capital Underground.
- Primary Sascribe email: sascribeblog@gmail.com
- PartnerStack email: jessiepinedo88@gmail.com
- QR-Perks email: qrperks@gmail.com
- Professional contact: hello@sascribe.com (forwards to main Gmail)

---

## PROJECT 1: SASCRIBE.COM — Affiliate Blog

### Infrastructure
- **Domain**: sascribe.com (Cloudflare)
- **Hosting**: Cloudflare Pages (moved from Netlify)
- **GitHub repo**: sascribe/sascribe-blog
- **Hugo**: Custom layouts only — NO PaperMod theme
- **Email newsletter**: Beehiiv via Cloudflare Worker
- **Cloudflare Worker**: bold-silence-2486ascribe-subscribe.onestepbeyondproduction.workers.dev

### File Structure
```
sascribe-blog/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── index.html        — cards clickable via onclick
│   │   ├── list.html         — cards clickable via onclick
│   │   ├── single.html       — cover.style: logo adds article-hero__img--logo class; affiliateURL makes hero clickable + shows CTA button
│   │   ├── taxonomy.html
│   │   └── category.html
│   └── taxonomy/
│       ├── category.html
│       └── category.terms.html
├── static/
│   ├── css/
│   │   ├── sascribe.css      — main stylesheet (AFFILIATE IMAGE OVERRIDES block)
│   │   └── sascribe-additions.css
│   └── images/
│       ├── adcreative/       — logo-adc.jpg, ads-38.png, ads-41.png, c-story10.png, c-story6.png
│       ├── elevenlabs/       — logo-elevenlabs.png (white logo)
│       ├── synthesia/        — logo-synthesia.png (white logo)
│       ├── beehiiv/          — logo-beehiiv.png (white text, colorful beehive)
│       └── nordvpn/          — logo-nordvpn.png (blue shield + white text, black bg baked in)
├── content/posts/            — auto-generated articles
├── hugo.toml
└── netlify.toml              — exists but unused
```

### CSS Image System
Images handled per-affiliate using CSS attribute selectors in `AFFILIATE IMAGE OVERRIDES` block.
- **AdCreative** (promo): `object-fit: cover` default, archive/grid uses `contain` with white bg
- **Logo affiliates** (ElevenLabs, Synthesia, Beehiiv): `object-fit: contain`, `background: #0C0C0F`, padding
- **Article hero**: Logo affiliates get `.article-hero__img--logo` class via `cover.style: logo` in frontmatter

**To add new logo affiliate:**
```css
.post-card--featured .post-card__image img[src*="/newaffiliate/"] { object-fit: contain; padding: 40px; background: #0C0C0F; max-height: 200px; }
.post-card__thumb img[src*="/newaffiliate/"], .post-card--archive .post-card__thumb img[src*="/newaffiliate/"] { object-fit: contain; padding: 20px; background: #0C0C0F; }
.article-hero__img[src*="/newaffiliate/"] { object-fit: contain; background: #0C0C0F; padding: 40px; max-height: 320px; border: none; }
```

### n8n Pipeline
**Workflow**: Sascribe Blog Pipeline
**Schedule**: Monday, Wednesday, Friday at 9am

**Node flow:**
1. Schedule Trigger
2. Read Affiliates (Google Sheets — Return ALL Matches)
3. Pick Content Type (Code — picks random affiliate, avoids already-published content types per affiliate, avoids repeating last affiliate)
4. Get Images (GitHub API — reads affiliate image folder)
5. Pick Image (Code — uses `$input.all()` to read all files, selects random image)
6. Generate Article (HTTP Request — Anthropic API, RAW body mode)
7. Format Article (Code — filename with Date.now() timestamp)
8. Push to GitHub (HTTP Request — Authorization FIXED VALUE not expression)
9. Update Sheet (Google Sheets — updates Last Content Type, Last Published Date, Total Articles Published, Published Types)
10. Build URL (Code)
11. IndexNow Ping (HTTP Request — RAW body mode)

**Key settings:**
- Read Affiliates: "Return All Matches"
- Push to GitHub: FIXED VALUE header
- Generate Article: RAW body mode
- Rule 7 REMOVED from prompt (no in-article screenshot embeds — broken images)
- Frontmatter includes `cover.style: "{{ $json['Image Style'] ?? 'logo' }}"`

### Google Sheet
**ID**: 1MUkQZRjOFqfpcPCnNL6sPaUETHa3I8q9okbV-wT7MXI

**Columns:**
- A: Affiliate Name
- B: Category
- C: Affiliate URL (sascribe.com/go/slug)
- D: Cloudflare Slug
- E: Dos and Donts
- F: Status (active/paused)
- G: Image Path
- H: Last Content Type (auto-updated)
- I: Last Published Date (auto-updated)
- J: Total Articles Published (auto-updated)
- K: Image Style (logo/promo)
- L: Published Types (comma-separated, prevents SEO duplicate content types)

### Current Affiliates
| Affiliate | Slug | Redirect Target | Style | Published Types |
|---|---|---|---|---|
| AdCreative AI | adcreative | free-trial.adcreative.ai/... | promo | review,comparison,tutorial,use-cases,pillar,alternatives |
| ElevenLabs | elevenlabs | try.elevenlabs.io/25umn8melpnn | logo | pillar,comparison |
| Synthesia | synthesia | synthesia.io/?via=jessie-pinedo | logo | pillar |
| Beehiiv | beehiiv | beehiiv.com?via=Jessie-Pinedo | logo | review,comparison,pillar |
| NordVPN | nordvpn | tkqlhce.com/click-101719520-12814518 (CJ) | logo | — |

### Affiliate Links Saved
- ElevenLabs: https://try.elevenlabs.io/25umn8melpnn
- Beehiiv: https://www.beehiiv.com?via=Jessie-Pinedo
- Synthesia: https://www.synthesia.io/?via=jessie-pinedo

### Cloudflare Redirect Rules (sascribe.com)
- sascribe.com/go/adcreative* → AdCreative affiliate URL (301)
- sascribe.com/go/elevenlabs* → https://try.elevenlabs.io/25umn8melpnn (301)
- sascribe.com/go/synthesia* → https://www.synthesia.io/?via=jessie-pinedo (301)
- sascribe.com/go/beehiiv* → https://www.beehiiv.com?via=Jessie-Pinedo (301)
- sascribe.com/go/nordvpn → https://www.tkqlhce.com/click-101719520-12814518 (302) — CJ highest EPC link

### Affiliate Programs Applied To
**Direct programs** (sascribeblog@gmail.com):
- HubSpot ✅ | Frase ✅ | Synthesia ✅ | Grammarly ✅ | Descript ✅
- Canva Canvassador ✅ (Canva account: sascribeblog@gmail.com)
- SEMrush ✅ | Surfer SEO ✅ | Beehiiv ✅ | ElevenLabs ✅ | AdCreative AI ✅

**CJ Affiliate account** (qrperks@gmail.com) — approved, two publisher properties created:
- **QR-Perks** (primary: Coupon/Deal + Product Comparison)
- **Sascribe** (primary: Content/Blog/Media + Product Comparison)

**CJ Programs to apply to for QR-PERKS (in order):**
1. AT&T Mobility — $75 new line, Mobile Certified
2. Verizon — $75 new service, Mobile Certified
3. Cricket Wireless — $10/activation, budget carrier, bilingual SoCal fit
4. Xfinity Mobile — up to $75/line, huge SoCal presence
5. New York Life Insurance — $75/lead, 7-day EPC $326
6. Western Union — $10-20/lead, perfect for bilingual money transfer audience
7. Axos Bank — starts $100/account, 3-month EPC $415
8. myAutoloan.com — $10/lead, auto loan audience = drivers
9. Experian — $12-50/lead, covers credit, insurance, banking
10. VIVA Finance — $50/loan, targets working class subprime
11. PayPal Debit Card — $33/first time user, 5% gas cashback angle

**CJ Programs to apply to for SASCRIBE (in order):**
1. NordVPN — 40% commission, higher approval odds
2. ExpressVPN — $13-36/sale, EPC $357, 90-day cookie
3. Norton North America — up to $200/sale, EPC $271
4. Intuit QuickBooks — $55/sale, small business audience
5. Jobber — up to $450/sale, home services SaaS
6. AWeber — up to $300/sale, email marketing comparison to Beehiiv
7. Meta for Business — $25/new advertiser
8. Elementor — 50% commission, up to $200/sale
9. Hostinger — starts 40% commission, EPC $89
10. DeleteMe — $30/sale, EPC $214, privacy tool
11. 1Password — 25% + $2/signup, EPC $189

**PartnerStack** (jessiepinedo88@gmail.com): Denied

### SEO & Indexing
- Google Search Console: verified, sitemap submitted
- IndexNow key: sascribe2026xK9mP3qR7nL5vT
- Browser Cache TTL: 30 minutes

### Future Build Items
- Screenshot automation for in-article images (Puppeteer or ScreenshotOne API)
- First Antigravity mission for DumpTikGo rates/miles feature (prompt written, ready to send)
- Affiliate analytics dashboard — CJ API + Cloudflare + GSC in one view (next session)
- Autonomous weekly audit agent — n8n workflow reading all articles, auditing SEO + compliance + quality (next session)
- Schema markup batch fix — add BlogPosting schema to all 12 existing articles
- Blotato affiliate program — apply when social pipeline activates

---

## PROJECT 2: QR-PERKS.COM — Mobile Billboard Affiliate

### Concept
Dynamic QR codes on 8-10 commercial truck wraps in Southern California. Each truck gets unique URL (/t1-/t10) for per-truck conversion tracking and driver profit sharing via SubID parameters. Audience is broad SoCal drivers — NOT just truckers. Bilingual EN/ES.

### Infrastructure
- **Domain**: qr-perks.com (Cloudflare)
- **Hosting**: Cloudflare Worker — qr-perks.com (worker name: `qrperks`, account: d7da7199489efff971e5884c54e59255)
- **Supabase**: `fsaxluprhgmyaipaujdn.supabase.co` (project: qrperks, region: us-west-1)
- **GitHub repo**: sascribe/qrperks-site
- **Admin panel**: qr-perks.com/admin (password: qrperks2026 — change this)
- **Driver portal**: qr-perks.com/driver
- **Email**: qrperks@gmail.com

### Landing Page
- Bilingual EN/ES with auto-detect Spanish browser
- 5 planned offer cards: Auto Insurance, Free Bank Account, Phone Plan, Business Funding, Gas Savings
- Dark theme, mobile-first
- Currently 3 active placeholders: INSURANCE_AFFILIATE_LINK_HERE, BANKING_AFFILIATE_LINK_HERE, PHONE_AFFILIATE_LINK_HERE
- ROK Financial business funding already has live links (see below)

### ROK Financial — LIVE
- Business Financing URL: https://go.mypartner.io/business-financing/?ref=001Qk00000jaDEZIA2
- Business Financing URL Spanish: https://go.mypartner.io/business-financing/?ref=001Qk00000jaDEZIA2&lang=es
- Referral Partner URL: https://go.mypartner.io/referral-partner/?ref=001Qk00000jaDEZIA2
- Commission: 20% of ROK's upfront revenue on funded deals + 2.5% override on referred agents
- Approved websites: qr-perks.com, sascribe.com, dumptikgo.com, geostransportation.com, speedydumpsco.com
- Rules: No paid search, must get marketing materials approved, no self-referrals, no fees to customers

### Affiliate Strategy
- Model: CPL (Cost Per Lead) preferred for mobile out-of-home traffic
- Target: Liberty Mutual/insurance CPL, free banking CPA, phone CPA, business funding CPL
- Per-truck tracking: Cloudflare redirect rules /t1-/t10 + SubID on affiliate links
- Driver profit sharing via SubID conversion tracking

### Direct Programs Applied/Pending
- FlexOffers: application submitted (pending) — for insurance, banking, phone
- Mint Mobile: applied at mintmobile.com/affiliate-program (qrperks@gmail.com)
- EverQuote: email sent to affiliates@everquote.com
- The Zebra: email sent to partners contact
- CJ Affiliate: account created (qrperks@gmail.com), QR-Perks publisher property set up

### Offer Cards Planned (5 total)
1. Auto Insurance — CPL via EverQuote/Liberty Mutual/The Zebra
2. Free Bank Account — CPA via Chime/Varo/Axos
3. Phone Plan — CPA via Mint Mobile/Tello/Cricket/AT&T
4. Business Funding — ROK Financial (LIVE)
5. Gas Savings — Upside or PayPal Debit Card (gas cashback angle)

### Status
- Site fully rebuilt and live at qr-perks.com ✅
- Cloudflare Worker deployed (1228 lines) — all routes handled ✅
- Supabase backend live — 6 tables, RLS policies ✅
- 50 trucks seeded (t1–t10 active, t11–t50 dormant) ✅
- 5 affiliate slots seeded in database ✅
- ROK Financial live on offer card 1 (update URL in Supabase affiliates table) ✅
- 4 coming soon cards live (insurance, banking, phone, gas)
- Driver dashboard live at qr-perks.com/driver ✅
- Admin dashboard live at qr-perks.com/admin ✅
- All legal pages live — FTC compliant ✅
- SubID tracking wired — every truck appends ?subid=qrp_t{n} to affiliate links ✅
- Test driver: testdriver@qrperks.com / token: c3132d77e2447fd7f8fb3fd02407b12f57d2dd978493a5e0 / truck t1
- QR codes not yet printed — pending driver onboarding
- Remaining 4 offer cards pending affiliate approvals (EverQuote, Chime, Mint, Upside)
- ROK Financial URL in Supabase needs updating to actual tracking link (go.mypartner.io/...)

---

### Skills Library
All skills saved to ~/Desktop/AffiliateMarketing/
- SKILL_technical_seo_auditor.md — fetch any URL, full SEO audit, Hugo/affiliate-specific checks, auto-fix via Claude Code
- SKILL_keyword_clustering_topic_map.md — discover + cluster keywords per affiliate, feeds n8n pipeline
- SKILL_backlink_outreach.md — personalized outreach generation, affiliate testimonial priority, Google Sheets tracking
- SKILL_social_media_manager.md — Blotato API + n8n, repurpose articles to social, FUTURE PHASE
- SKILL_master_orchestration.md — weekly command center, pulls all data sources, hands off to other skills

---

## CREDENTIALS LOCATIONS

### Permanently saved in ~/.zshrc (local machine — auto-loaded every session)
- `GH_TOKEN` — GitHub API token (repo read/write for sascribe/sascribe-blog)
- `GOOGLE_APPLICATION_CREDENTIALS` — path to `/Users/jessiepinedo/Desktop/AffiliateMarketing/sascribe-7b5ed8c59364.json` (service account: claude-code@sascribe.iam.gserviceaccount.com)
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token (zone Transform Rules access)
- `CF_ZONE_SASCRIBE` — Cloudflare zone ID for sascribe.com (`a415e6afd4367cdcf15c1335b17cb6e0`)
- `CF_ZONE_QRPERKS` — Cloudflare zone ID for qr-perks.com (`2c424ccc5fe93280f0d28ffdd3327dce`)
- `N8N_API_KEY` — n8n cloud API key (onestepbeyond.app.n8n.cloud)
- `N8N_BASE_URL` — `https://onestepbeyond.app.n8n.cloud/api/v1`
- `CF_ACCOUNT_ID` — `d7da7199489efff971e5884c54e59255`
- `SUPABASE_ACCESS_TOKEN` — Supabase personal access token (Management API / DDL execution)
- `SUPABASE_QRPERKS_URL` — `https://fsaxluprhgmyaipaujdn.supabase.co`
- `SUPABASE_QRPERKS_PUBLISHABLE` — saved in ~/.zshrc (publishable/anon key)
- `SUPABASE_QRPERKS_SECRET` — saved in ~/.zshrc (service role key)

### Other credentials
- Anthropic API key: console.anthropic.com (Sascribe key) — in Blue's private notes
- Beehiiv API key + pub ID: embedded in baseof.html via Cloudflare Worker
- Google Sheet ID: `1MUkQZRjOFqfpcPCnNL6sPaUETHa3I8q9okbV-wT7MXI`
- GCP Project: `sascribe` (number: `531483410861`) — Sheets API enabled, Drive API not yet enabled
- IndexNow key: `sascribe2026xK9mP3qR7nL5vT`
- CJ Affiliate account: qrperks@gmail.com

---

## CHANGELOG

### 2026-04-12 — GSC Audit + Next Session Planning

**GSC FINDINGS (28-day window, pulled 2026-04-12):**
- 0 clicks, 1,230 impressions, avg position 8.3
- ElevenLabs pillar = 97% of all impressions, position 8.4
- 13 articles live across 5 affiliates
- Pipeline down — hit n8n execution limits
- GSC indexing issues: 27 discovered not indexed, 1 crawled not indexed, 1 duplicate canonical

**CLOUDFLARE (last 30 days):**
- 14,290 pageviews / 4,167 uniques
- April 1 spike confirmed as content publish event (not bot anomaly)

**PIPELINE STATUS:**
- n8n execution limit hit — no new articles since last run
- Fix: migrate pipeline from n8n to GitHub Actions

**NEXT SESSION PRIORITIES (Session 8):**
1. Sascribe: migrate pipeline from n8n to GitHub Actions, run next 2 articles, fix GSC indexing issues
2. QR-Perks: full functional audit and fix remaining broken features — complete the platform

---

### 2026-04-06 — Discord Bot Live Data + 4-Source Pipeline Complete

**DISCORD BOT — LIVE DATA (YDo6NIh2exauqaSi):**
- 4 new nodes added: Live: CF Stats, Live: n8n Executions, Live: GitHub Checklist, Inject Live Data
- Every command now fetches 3 live data sources before Claude responds
- !stats: real Cloudflare 7-day PV/uniques/cache (live)
- !pipeline: real last n8n execution status + history (live)
- !checklist + !queue: real MASTER_CHECKLIST.md from GitHub (live)
- !credits, !help, !audit, !fix: contextual static responses (no API needed)
- System prompt updated with LIVE DATA section fed by Inject Live Data node
- Total nodes: 10 (was 6)

**RESEARCH INTELLIGENCE NODE — COMPLETE (4 SOURCES):**
- Source 1 Google: DuckDuckGo HTML fallback (CSE needs billing in GCP)
- Source 2 YouTube: YouTube Data API v3 (LIVE — YOUTUBE_API_KEY working)
- Source 3 Reddit: Reddit JSON API (LIVE — no auth needed)
- Source 4 Affiliate: Affiliate homepage web scrape (LIVE)
- Total pipeline nodes: 21 (was 12 at session start)

**GCP API KEY STATUS:**
- Key restricted to: youtube.googleapis.com + customsearch.googleapis.com
- YouTube: WORKING
- Custom Search: BLOCKED — requires billing enabled on GCP project sascribe
- Fix: console.cloud.google.com → sascribe → Billing → link billing account (free 100 queries/day after setup)
- GOOGLE_CSE_KEY + GOOGLE_CSE_CX in ~/.zshrc ready for when billing is added

**SESSION 7 TOP PRIORITIES:**
1. Confirm NordVPN article published Wed Apr 9 (check Discord and GitHub)
2. Enable billing on GCP sascribe project → unlocks Google CSE (4th source fully live)
3. Add !qrperks command to Discord (QR-Perks Supabase scan/conversion stats)
4. CJ_API_KEY from cj.com dashboard → add to ~/.zshrc
5. QR-Perks: add more offer cards (Insurance, Banking, Phone, Gas)


### 2026-04-06 — Research Intelligence Node Deployed

**RESEARCH INTELLIGENCE NODE — LIVE:**
- 7 new nodes added to Sascribe Blog Pipeline (epcaH77ZVtixXwa9)
- Total nodes: 19 (was 12)
- Chain: Pick Image → Build Queries → YouTube → Reddit → Affiliate Content → Collect → Haiku Brief → Parse Brief → Generate Article1

**SOURCES ACTIVE:**
- YouTube Data API v3: top 3 videos by view count (YOUTUBE_API_KEY confirmed working)
- Reddit JSON API: top 5 posts by score, no auth required
- Affiliate own website: homepage HTML stripped to text (1500 chars)
- Google CSE: PENDING — API key needs Custom Search added to restrictions (fix: console.cloud.google.com → Credentials → edit key → add Custom Search API)

**HAIKU BRIEF FORMAT:**
- Model: claude-haiku-4-5-20251001
- Extracts: ANGLE, GAPS, PROS, CONS, USER QUESTIONS, PRICING, AFFILIATE PROMOTES, TARGET WORDS, FAQ
- Output: flat safe text string injected into Opus prompt as researchBriefText
- Fallback: if Haiku fails or returns invalid JSON, defaults to basic angle

**OPUS PROMPT MODIFIED:**
- Rule 8 added: incorporate RESEARCH BRIEF naturally
- researchBriefText injected at end of RULES section
- Brief uses pipe-separated format (safe for JSON embedding)

**API KEYS CONFIRMED:**
- YOUTUBE_API_KEY: AIzaSyAfhuVMV2oB0P6UXD6_EGlVtAG3Ziff56I (in ~/.zshrc)
- GOOGLE_CSE_KEY: same key (needs API restriction fix for Custom Search)
- GOOGLE_CSE_CX: b5832306c3be3443d (in ~/.zshrc)

**NEXT RUN:**
- Wednesday Apr 9 9am PST — NordVPN article with full research brief
- Will be first article with competitive intelligence context


### 2026-04-06 (Session 6 — Final)

**PIPELINE FIX:**
- Root cause 1: Double auth header — Generate Article node had both hardcoded x-api-key AND credential injecting another. Anthropic rejected. Fixed: authentication set to none.
- Root cause 2: NordVPN not getting selected — Sheet had Last Content Type "queued" which pipeline code doesn't recognize. Fixed: Last Published Date set to 2000-01-01 so NordVPN always wins next selection.
- Next publish: Wednesday Apr 9 9am — NordVPN comparison article

**BOT TRAFFIC DISCOVERY:**
- 67% of Cloudflare traffic is bots (France 38.7%, Netherlands 11.8%, Singapore 7.1%, China 3.3%)
- Real human traffic = ~33% of CF numbers
- GSC impressions/clicks = accurate (bots don't appear in GSC)
- Bot Fight Mode deferred — free plan, dashboard-only. Deferred until revenue.
- Rule going forward: GSC = truth, CF = directional trend only

**AUDIT INFRASTRUCTURE:**
- AUDIT.md created — master audit template pulls ALL data sources every time
- Includes: country breakdown, browser breakdown, bot detection flag, QR-Perks Supabase, n8n status
- Every future audit uses this template

**GSC NUMBERS (real — no bots):**
- Impressions: 458 (was 8 at session start — 57x growth)
- Clicks: 0 (2-3 day lag — check Wed Apr 9)
- ElevenLabs pillar: 439 impressions, pos 8.1
- adcreative.ai review: pos 2.0 — first click likely showing Wed
- adcreative.ai scam: pos 5.0 — unexpected high-intent query

**SKILL FILES CREATED:**
- affiliate md's for claude/SKILL_technical_seo_auditor.md
- affiliate md's for claude/SKILL_master_orchestration.md
- affiliate md's for claude/AUDIT.md

**SESSION 7 PRIORITIES (in order):**
1. Fix Discord bot — responds with menu but never executes actual commands (!stats returns static text not live data)
2. Confirm NordVPN article — pipeline fixed, verify Wed 9am fires and article is quality
3. Build Research Intelligence Node — 4-source competitive research before every article
   - Needs: YOUTUBE_API_KEY + GOOGLE_CSE_KEY + GOOGLE_CSE_CX from GCP project sascribe
4. Get GCP API keys (manual — 5 min): console.cloud.google.com -> project sascribe


### 2026-04-06 (Session 6 — Pre-session audit)

**SASCRIBE AUDIT RESULTS:**
- GSC impressions: 260 → 458 (+198 overnight — accelerating)
- ElevenLabs pillar: 245 → 439 impressions, pos 8.1 — title rewrite working
- GSC clicks: still 0 — lag is 2-3 days, clicks likely already happening
- Cache rate: 0.2% → 0.8% — Cloudflare rules warming up
- Unique visitors: rising — new baseline ~400-450 PV/day
- FAQ backfill: all 11 articles now have FAQ + FAQPage JSON-LD ✅
- NordVPN first article: fires 9am Mon Apr 7 automatically

**IMPRESSION TREND (staircase pattern — healthy):**
Apr 1: 2 | Apr 2: 44 | Apr 3: 208 | Apr 4: 198 | Apr 5: 458

**ALL ARTICLES NOW HAVE:**
- Schema markup ✅ | FAQ + FAQPage JSON-LD ✅ | Internal links ✅
- affiliateURL + affiliateName ✅ | Descriptions ✅ | Hook-first structure ✅

**SESSION 6 PRIORITIES:**
1. Get YouTube API key + Google CSE key + CSE ID from GCP (manual — 5 min)
2. Build Research Intelligence Node (4-source competitive research)
3. Mission 2 — unified affiliate dashboard
4. CJ_API_KEY setup


### 2026-04-05 — Research Intelligence Node Approved

**APPROVED: Full 4-source competitive research before every article**
Sources: Google top 10 + YouTube videos + Reddit/Quora + Affiliate own content
Model split: Haiku for all research extraction, Opus for article writing
Cost: ~$0.45/article, ~$5.40/month at 12 articles
Budget: $20/month confirmed — room to scale to daily publishing ($13.50/month)

**APIs NEEDED NEXT SESSION:**
- YOUTUBE_API_KEY (GCP: sascribe → YouTube Data API v3)
- GOOGLE_CSE_KEY + GOOGLE_CSE_CX (GCP: sascribe → Custom Search API + programmablesearchengine.google.com)

**STRATEGY:**
Read top 10 results → find the gap → own the gap
Pull Reddit threads → find real buyer questions → answer them
Watch YouTube reviews → extract real user experience → add credibility
Result: articles engineered to beat page 1, not just match it


### 2026-04-05 (Session 5 — Final Notes)

**DECISIONS MADE:**
- Monthly API budget set at $20 — full headroom for Opus + research pipeline
- Opus kept for article generation — quality over cost savings
- YouTube video research pipeline approved for Session 6 build
- Implementation: Haiku extracts insights (cheap), Opus writes article (quality)
- Cost impact: ~$0.35/article with research vs $0.29 currently — negligible at $20/month

**YOUTUBE RESEARCH PIPELINE — APPROVED ARCHITECTURE:**
- YouTube Data API v3 (free tier, GCP project: sascribe)
- Search: "[affiliate] review 2026" — pull top 3 videos by view count
- Haiku extracts: pros, cons, pricing, workflow tips, complaints, competitor comparisons
- Opus writes article with expert context injected
- Zero manual steps — fully autonomous
- YOUTUBE_API_KEY needed: get from console.cloud.google.com

**NEXT SESSION OPENS WITH:**
1. Fix Discord bot (debug 403 on channel posts)
2. Backfill FAQ on 3 articles
3. Build YouTube research pipeline
4. Verify QR-Perks email signup works
5. CJ_API_KEY setup

**AFFILIATE REVENUE PROJECTIONS (documented):**
- Worst case Dec 2026: $50-150/month
- Base case Dec 2026: $300-800/month  
- Best case Dec 2026: $1,500-3,000/month
- Key variable: email list growth + ElevenLabs pillar cracking top 5
- Site valuation at $2k/month revenue: ~$40,000-60,000 (20-30x monthly)


### 2026-04-05 (Session 5 — Part 2)

**SEO COMPOUND IMPROVEMENTS:**
- Internal links added to all articles (2 per article, targeting related content)
- ElevenLabs pillar receives internal links from all other articles
- FAQ sections + FAQPage JSON-LD schema added to all articles
- About page created at /about — E-E-A-T signal
- SEO Audit upgraded: internal link check + FAQ check + content refresh check
- CLAUDE_ROLE.md updated with permanent operating rules

**GAPS RESOLVED:**
- Internal linking: FIXED
- FAQ schema: FIXED
- About page / E-E-A-T: FIXED
- Content refresh check: ADDED TO AUDIT

**NEXT PRIORITIES:**
- QR-Perks email list signup
- Mission 2: Unified affiliate dashboard (CJ + ROK APIs)
- Backlink outreach — first 5 targets
- Monitor NordVPN first article (Monday Apr 7)
- QA Sunday SEO audit first run (Apr 13)

### 2026-04-05 (Session 5)

**AUTONOMOUS SYSTEMS BUILT:**
- Weekly SEO Audit Agent (QQwdOvLUvh2War2A) — Sunday 11pm
- Daily API Health Check (WZcswmhQsoRYriM4) — 8am daily
- Discord Command Center (YDo6NIh2exauqaSi) — polls every 2min

**DISCORD CHANNELS:**
- #sascribe-alerts:   1490454712200200345
- #sascribe-audit:    1490454714050019453
- #sascribe-commands: 1490454715627081908
- DISCORD_BOT_TOKEN saved to ~/.zshrc

**SASCRIBE FIXES:**
- Synthesia disclosure moved after opening hook (2 articles fixed)
- Hook-first rule injected into n8n Generate Article prompt
- API health check added to SEO Audit (blocks if API fails)

**NEXT PRIORITIES:**
- QR-Perks: email list capture + change admin password
- Unified affiliate dashboard (CJ + ROK APIs)
- Add CJ_API_KEY to ~/.zshrc


### 2026-04-04 (Session 4)

**SASCRIBE:**
- Schema markup (BlogPosting JSON-LD) added to all 12 articles via baseof.html upgrade
- ElevenLabs pillar title + meta rewritten to target "elevenlabs update 2026" queries (pos 6.8, 43 impressions)
- AdCreative article count corrected in Sheet (reset to 4 after duplicate deletion)
- AdCreative ghost types (pillar, alternatives) removed from Sheet col L — pipeline unblocked
- NordVPN Dos/Donts populated in Sheet col E
- Full keyword cluster map built for all 5 affiliates
- 2-week content queue written (Apr 7–Apr 18, all commercial intent)
- NordVPN queued as Mon Apr 7 first article — "best vpn comparison 2026"
- Cloudflare cache rules created — static assets 1mo/1wk + article pages 4hr/1hr
- AdCreative duplicate use-cases article deleted from GitHub
- GSC baseline: 52 impressions (was 8), 0 clicks — ElevenLabs driving 43 of 52

**QR-PERKS FULL BUILD:**
- Complete site rebuilt as Cloudflare Worker (1228 lines, single worker.js file)
- Supabase project: fsaxluprhgmyaipaujdn (us-west-1) — schema deployed via Management API
- 6 tables: affiliates, drivers, trucks, scans, conversions, admins — all with RLS
- 50 trucks seeded (t1–t10 active), 5 affiliates seeded (ROK live, 4 coming_soon)
- All routes live: /, /t1-t50, /driver, /driver/dashboard, /admin, /admin/dashboard, /go/{affiliate}, /privacy, /terms, /disclosure, /contractor
- Cloudflare Worker route qr-perks.com/* → qrperks worker set
- Supabase secrets set on worker: SUPABASE_URL, SUPABASE_PUBLISHABLE, SUPABASE_SECRET, ADMIN_PASSWORD
- Truck sort fixed — numerical (t1,t2,t3) not alphabetical (t1,t10,t11)
- Test driver created — token: c3132d77e2447fd7f8fb3fd02407b12f57d2dd978493a5e0, truck t1 assigned, 5 test scans
- New ~/.zshrc vars: CF_ACCOUNT_ID, SUPABASE_ACCESS_TOKEN, SUPABASE_QRPERKS_URL, SUPABASE_QRPERKS_PUBLISHABLE, SUPABASE_QRPERKS_SECRET

**NEXT SESSION PRIORITIES:**
- Update ROK Financial URL in Supabase (affiliates table, rok-financial row, url field)
- Change admin password in Cloudflare Worker secrets (ADMIN_PASSWORD)
- Add email capture to QR-Perks landing page
- Unified affiliate dashboard — CJ + ROK + PartnerStack APIs
- Add CJ_API_KEY to ~/.zshrc

### 2026-04-04 (Session 3)
- NordVPN added as 5th Sascribe affiliate — logo, CSS, redirect, Google Sheet, n8n frontmatter, Cloudflare rule all wired
- single.html updated — hero image now clickable affiliate link, CTA button added below hero
- All 12 existing articles backfilled with affiliateURL and affiliateName frontmatter
- AdCreative bug fixed — duplicate affiliateName on 7 articles corrected
- CTA buttons and clickable heroes confirmed live on all articles
- Claude Code permanently connected to all systems — GH_TOKEN, GOOGLE_APPLICATION_CREDENTIALS, CLOUDFLARE_API_TOKEN, CF_ZONE_SASCRIBE, CF_ZONE_QRPERKS, N8N_API_KEY, N8N_BASE_URL all saved in ~/.zshrc
- Cloudflare token updated with full zone permissions including Pages access
- GSC connected via service account claude-code@sascribe.iam.gserviceaccount.com
- Sitemap resubmitted to GSC — 30 URLs queued for indexing
- Analytics baseline: 7,568 page views, 1,722 unique visitors, ~4,500 US requests, 8 GSC impressions
- Schema markup identified as missing across all articles — known gap, queue for fix
- 5 custom skills built and saved to AffiliateMarketing folder:
  1. SKILL_technical_seo_auditor.md
  2. SKILL_keyword_clustering_topic_map.md
  3. SKILL_backlink_outreach.md
  4. SKILL_social_media_manager.md (future phase)
  5. SKILL_master_orchestration.md

### 2026-04-04
- Added NordVPN as 5th affiliate (CJ Affiliate, Sascribe publisher property)
- Uploaded NordVPN logo to `static/images/nordvpn/logo-nordvpn.png` via GitHub API
- Added NordVPN CSS overrides to `sascribe.css` (contain, dark bg, padding — matches ElevenLabs/Beehiiv pattern)
- Updated `single.html`: hero image now a clickable affiliate link when `affiliateURL` frontmatter present; CTA button ("Try X Free →") added below hero
- Added NordVPN row to Google Sheet (Sheet1!A6:L6)
- Updated n8n Generate Article node to include `affiliateURL` and `affiliateName` in article frontmatter
- Created Cloudflare redirect rule: `/go/nordvpn` → tkqlhce.com CJ tracking link (302)
- Backfilled `affiliateURL` and `affiliateName` frontmatter on all 12 existing articles via GitHub API (fixed duplicate bug on 7 articles that lacked `style:` field)
- Submitted sitemap (sascribe.com/sitemap.xml, 30 URLs) to Google Search Console via API
- All environment variables saved permanently to `~/.zshrc`: GH_TOKEN, GOOGLE_APPLICATION_CREDENTIALS, CLOUDFLARE_API_TOKEN, CF_ZONE_SASCRIBE, CF_ZONE_QRPERKS, N8N_API_KEY, N8N_BASE_URL
- Cloudflare API now fully automatable for redirect rules; GSC and Sheets automatable via service account
- GSC data: 8 impressions / 0 clicks in 30 days — site too new, articles not yet indexed

### 2026-04-02 (Session 2)
- Created CJ Affiliate publisher account (qrperks@gmail.com)
- Set up two publisher properties: QR-Perks and Sascribe
- Identified and prioritized CJ programs for both properties (full lists above)
- Applied to Mint Mobile, EverQuote, The Zebra directly
- ROK Financial agreement signed — live links for business funding
- Researched CPL vs CPA models — CPL is primary model for QR-Perks truck wrap traffic
- Planned 5-card offer structure for QR-Perks landing page
- Identified Upside and PayPal Debit Card as gas savings offer options

### 2026-04-02 (Session 1)
- Removed broken in-article screenshot embeds from all 11 existing articles
- Removed rule 7 from n8n prompt
- Added Published Types column (L) to Google Sheet
- Updated Pick Content Type n8n code to never repeat content type per affiliate
- Updated Update Sheet node to append to Published Types
- Added Synthesia and Beehiiv as active affiliates
- Fixed AdCreative thumbnail in archive/grid cards
- Implemented per-affiliate CSS image handling
- Added Image Style column (K) and frontmatter cover.style
- Applied to HubSpot, Frase, Grammarly, Descript, Canva, SEMrush, Surfer SEO
- Built qr-perks.com landing page, deployed to Cloudflare

### 2026-04-01
- Moved hosting Netlify → Cloudflare Pages
- Fixed n8n Read Affiliates to return all rows
- Added ElevenLabs as second affiliate
- Made all post card thumbnails clickable
- Removed duplicate test articles

### 2026-03-27 — 2026-03-31
- sascribe.com domain purchased and built
- Hugo custom layouts, dark editorial design
- AdCreative AI first affiliate
- n8n pipeline first working version
- Google Search Console verified, IndexNow live
- Beehiiv email capture via Cloudflare Worker

---

*Update this file at the end of every session.*
