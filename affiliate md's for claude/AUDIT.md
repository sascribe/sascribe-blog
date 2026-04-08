# AUDIT TEMPLATE — SASCRIBE.COM
*Run this every session. Captures every available data source.*
*Last updated: 2026-04-08*

---

## WHAT THIS AUDIT PULLS

Every time an audit runs it must pull ALL of these — no partial audits:

1. **GitHub** — article count, affiliate distribution, SEO health per article
2. **GSC** — impressions, clicks, position, CTR, queries, pages, countries, devices, date trend
3. **Cloudflare** — page views, uniques, cache rate, daily breakdown, COUNTRY BREAKDOWN, browser breakdown
4. **n8n** — workflow status, last 10 executions per pipeline, error diagnosis
5. **Supabase (QR-Perks)** — trucks, drivers, scans, conversions, email signups
6. **Google Sheets** — affiliate status, published types, content queue

---

## CRITICAL LESSON — BOT TRAFFIC

Cloudflare page view numbers are INFLATED by bot traffic.
Real traffic signal = GSC impressions and clicks (bots do not show in GSC)

**Always show country breakdown in every audit.**
If France/Netherlands/Singapore/China collectively exceed 20% of traffic = bot inflation present.

Bot Fight Mode: dash.cloudflare.com → sascribe.com → Security → Bots → ON
(Requires manual enable — API token lacks Security scope. Defer to paid plan.)

---

## BASELINES (update each session)

| Date | GSC Impr | GSC Clicks | Avg Pos | CF PV 7d | CF Uniq 7d | Cache% | Articles | Bot% |
|------|----------|------------|---------|-----------|------------|--------|----------|------|
| Session start | 8 | 0 | — | 7,568 | 1,722 | 0.09% | 12 | unknown |
| 2026-04-04 | 52 | 0 | — | 7,960 | 1,626 | 0.09% | 12 | unknown |
| 2026-04-05 | 260 | 0 | 7.69 | 8,207 | 1,707 | 0.2% | 11 | ~67% bot |
| 2026-04-06 AM | 458 | 0 | 7.69 | 8,324 | 1,731 | 0.8% | 11 | 67% |
| 2026-04-07 AM | 630 | 0 | 7.9 | — | — | — | 12 | — |
| 2026-04-08 AM | **630** | **0** | **7.9** | **9,735** | **1,835** | **5.9%** | **12** | **25-70%** |

**Latest snapshot (2026-04-08):**
- GSC newest data day: Apr 5 (172 imp) — 2-day lag
- ElevenLabs pillar: pos 8.0, 610 impressions (97% of all site impressions)
- NordVPN article (Apr 6): not yet indexed in GSC
- CF 7d: NL/FR bot waves on Apr 1,5,6; Apr 7 cleanest day (25.1% bot, US led)
- Cache warming: 0% Apr 1-4 → 9% Apr 6 → 5.9% Apr 7 (cleared by article pushes)
- Beehiiv: 6 active subscribers (all test accounts, 0 organic)
- Pipeline: Active, 22 nodes, cron 0 9 * * 1,3,5 — syntax fix confirmed Apr 7
- Next pipeline run: Wed Apr 8 9am UTC (ElevenLabs review)

---

## SEO AUDIT RESULTS — 2026-04-08 (Session 7)

| Article | WC | FAQ | FAQPage | BlogPosting | cover.style | Disclosure | Internal | Affiliate |
|---------|-----|-----|---------|-------------|-------------|------------|----------|-----------|
| AdCreative comparison (Mar 31) | 1954 | ✅5 | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| AdCreative review (Apr 1) | 1918 | ✅5 | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| AdCreative tutorial (Apr 1) | 1776 | ✅5 | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| AdCreative use-cases (Apr 1) | 1712 | ✅5 | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| ElevenLabs pillar (Apr 1) | 1853 | ✅5 | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| Beehiiv comparison (Apr 2) | 2147 | ✅5 | ✅was OK | ✅fixed | ✅ | ✅ | 0 | ✅3 |
| Beehiiv pillar (Apr 2) | 1813 | ✅5 added | ✅fixed | ✅fixed | ✅fixed | ✅ | 0 | ✅3 |
| Beehiiv review (Apr 2) | 2133 | ✅5 | ✅was OK | ✅fixed | ✅ | ✅ | 0 | ✅3 |
| ElevenLabs comparison (Apr 2) | 2001 | ✅5 | ✅was OK | ✅fixed | ✅ | ✅ | 0 | ✅3 |
| Synthesia pillar (Apr 2) | 1699 | ✅5 | ✅fixed | ✅fixed | ✅ | ✅removed | 0 | ✅3 |
| Synthesia tutorial (Apr 3) | 1827 | ✅5 | ✅fixed | ✅fixed | ✅ | ✅removed | 0 | ✅3 |
| NordVPN review (Apr 6) | 1801 | ✅6 | ✅fixed | ✅fixed | ✅ | ✅ | 0* | ✅3 |

*NordVPN internal links = 0 by design — no VPN/security content exists yet to link to.

**All 12 articles now fully compliant. All SHAs confirmed pushed.**

**Recurring WARNING (not blocking):** Internal links = 0 across all articles — no cross-linking possible until content library grows. NordVPN exempt permanently until VPN/security category expands.

---

## ARTICLE PERFORMANCE — GSC (28d, as of Apr 8)

| Article | GSC Imp | GSC Clk | Avg Pos | Top Query |
|---------|---------|---------|---------|-----------|
| ElevenLabs pillar | 610 | 0 | 8.0 | elevenlabs update april 2026 |
| Homepage | 20 | 0 | 3.5 | (brand) |
| /tags/corporate-training/ | 1 | 0 | 2.0 | sascribe |
| All other 10 articles | 0 | 0 | — | — |

→ One article = 97% of all impressions. 10 articles not yet visible in search.
→ Floor established: 170-210 impressions/day on the ElevenLabs pillar.
→ First organic click expected when ElevenLabs pillar reaches pos 5-7.

---

## HOW TO READ BOT-INFLATED NUMBERS

| Metric | CF Shows | Real Estimate | Truth Source |
|--------|----------|---------------|--------------|
| Page views | ~9,735 (7d) | ~3,200 | GSC clicks |
| Unique visitors | ~1,835 (7d) | ~600 | GSC impressions |
| Bot flag | FR+NL+SG+CN > 20% | every day is flagged | Always check |

**Rule:** Lead with GSC numbers. CF = directional only.
