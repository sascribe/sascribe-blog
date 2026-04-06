# AUDIT TEMPLATE — SASCRIBE.COM
*Run this every session. Captures every available data source.*
*Last updated: 2026-04-06*

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

## CRITICAL LESSON — BOT TRAFFIC (Apr 6 2026)

Cloudflare page view numbers are INFLATED by bot traffic.
Discovered: France 38.7% of all requests = VPN/proxy exit nodes
Real human traffic = ~33% of reported Cloudflare numbers

**Always show country breakdown in every audit.**
If France/Netherlands/Singapore/China collectively exceed 20% of traffic = bot inflation present.

Real traffic signal = GSC impressions and clicks (bots do not show in GSC)

Bot Fight Mode: dash.cloudflare.com -> sascribe.com -> Security -> Bots -> ON
(Requires manual enable — API token lacks Security scope)

---

## BASELINES (update each session)

| Date | GSC Impr | GSC Clicks | CF PV 28d | CF Uniq 28d | Cache% | Articles | Bot% |
|------|----------|------------|-----------|-------------|--------|----------|------|
| Session start | 8 | 0 | 7,568 | 1,722 | 0.09% | 12 | unknown |
| 2026-04-04 | 52 | 0 | 7,960 | 1,626 | 0.09% | 12 | unknown |
| 2026-04-05 | 260 | 0 | 8,207 | 1,707 | 0.2% | 11 | unknown |
| 2026-04-06 AM | 458 | 0 | 8,324 | 1,731 | 0.8% | 11 | ~67% bot |
| 2026-04-06 PM | 458 | 0 | 9,300 | 1,863 | 0.8% | 11 | 67% bot confirmed |
