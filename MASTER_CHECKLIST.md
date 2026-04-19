# Master Checklist — QR Perks + Sascribe

> Last updated: 2026-04-19 | Session 5 — 7 Fixes Complete

---

## SASCRIBE — SESSION 5 FIXES (2026-04-19)

| # | Fix | Status | Notes |
|---|-----|--------|-------|
| 1 | NordVPN CF redirect: tkqlhce.com → go.nordvpn.net | ✅ DONE | 302 → go.nordvpn.net confirmed |
| 2 | adcreative-news rewrite (event-first hook) | ✅ DONE | Value-first opener, research-backed, desc 153 chars |
| 3 | elevenlabs-tutorial rewrite (event-first hook) | ✅ DONE | Value-first opener, 2685 words, desc 151 chars |
| 4 | Internal linking pass — all 21 articles to ≥2 links | ✅ DONE | See Also blocks added; 21/21 committed |
| 5 | Hugo render hook: rel=nofollow sponsored on /go/ links | ✅ DONE | layouts/_default/_markup/render-link.html |
| 6 | Privacy policy footer | ✅ N/A | Already present — /privacy/ in baseof.html footer |
| 7 | NordVPN tutorial published | ✅ DONE | 200 ✅ /posts/2026-04-19-nordvpn-tutorial-1776635257745/ |
| 7b | Synthesia review published | ✅ DONE | 200 ✅ /posts/2026-04-19-synthesia-review-1776635412717/ |
| 7c | Synthesia comparison published | ✅ DONE | 200 ✅ /posts/2026-04-19-synthesia-comparison-1776635520505/ |
| 8 | Final IndexNow batch ping | ✅ DONE | 25 URLs, HTTP 200 |

---

## SASCRIBE — CONTENT STATE (2026-04-19)

**24 articles total** — 5 affiliates

| Affiliate | Count | Types |
|-----------|-------|-------|
| AdCreative AI | 6 | review, comparison, tutorial, use-cases, news, tips |
| ElevenLabs | 4 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | review, comparison, pillar, news |
| Synthesia | 5 | pillar, tutorial, news, review, comparison |
| NordVPN | 5 | review, pillar, comparison, news, tutorial |

---

## SASCRIBE — SITE HEALTH (all clean as of Session 5)

| Check | Status |
|-------|--------|
| draft: false on all articles | ✅ All 24 |
| Meta descriptions 150-160 chars | ✅ All 24 |
| Cover images (no broken files) | ✅ All clean (ads-38.png fixed) |
| JSON-LD valid on all articles | ✅ All clean |
| FAQPage JSON-LD | ✅ All 24 |
| Internal links ≥2 per article | ✅ All 24 |
| rel=sponsored on /go/ links | ✅ Hugo render hook live |
| Twitter card meta tags | ✅ baseof.html |
| OG image (no double slash) | ✅ Fixed |
| Privacy policy footer | ✅ Present |
| NordVPN affiliate link | ✅ go.nordvpn.net |
| Event-first hooks | ✅ adc-news and el-tutorial rewritten |

---

## QR PERKS — SESSION 6 (2026-04-19)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | /api/conversion endpoint | ✅ DONE | GET, token-gated, 200 OK verified |
| 2 | POSTBACK_SECRET CF secret | ✅ DONE | Deployed to qrperks worker |
| 3 | conversions schema (offer_name, commission_amount_cents, paid_at) | ✅ DONE | ALTER TABLE confirmed |
| 4 | Admin conversions tab with Mark Paid | ✅ DONE | Revenue/commission stats + table |
| 5 | Driver earnings conversion history | ✅ DONE | Per-conversion breakdown with totals |
| 6 | /api/stats conversion fields | ✅ DONE | total_conversions, total_revenue_cents, conversions_by_offer |
| 7 | End-to-end test | ✅ DONE | 200 OK, row in Supabase, driver earnings updated, test cleaned up |
| 8 | GitHub worker.js push | ✅ DONE | commit 42014799 |

---

## QR PERKS — SESSION 7 AUDIT (2026-04-19)

### AUDIT RESULTS SUMMARY

| Audit | Finding | Status |
|-------|---------|--------|
| 1 — Routes | All routes return correct status; /go/ works with correct IDs (paypal-sweeps not paypal) | ✅ |
| 2 — Driver Dashboard | Fleet management MISSING → BUILT | ✅ Fixed |
| 3 — Admin Dashboard | Leads export MISSING → BUILT; Leads section upgraded | ✅ Fixed |
| 4 — Commission Logic | 20% direct ✅, 10% referral ✅, mark paid ✅, dedup MISSING → FIXED | ✅ Fixed |
| 5 — Referral System | Full chain working: /join → cookie → signup → commission ✅ | ✅ |
| 6 — Email CAN-SPAM | Physical address MISSING → ADDED; Privacy link MISSING → ADDED | ✅ Fixed |
| 7 — SMS/TCPA | Phone field present ✅; TCPA consent inline MISSING → ADDED | ✅ Fixed |
| 8 — Legal Pages | Privacy policy thin → FULL REWRITE with CCPA + GDPR + retention | ✅ Fixed |
| 9 — Security | Timing attack on admin auth → FIXED; PII in logs → FIXED; Rate limiting — FLAGGED | ⚠️ |

### NEEDS ATTENTION (Blue action required)

| Item | Urgency | Action |
|------|---------|--------|
| PHYSICAL_ADDRESS in worker.js | HIGH | Update line 3 of worker.js to real registered agent address before scaling email |
| MaxBounty postback URL | HIGH | Paste new URL with token into MaxBounty dashboard |
| Rate limiting on login | MEDIUM | CF Worker needs Durable Objects or KV for persistent rate limiting |
| Admin cookie = raw password | LOW | If admin password is compromised via cookie theft, attacker gets password directly |
| Twilio SMS setup | MEDIUM | See Twilio setup steps below |

---

## SASCRIBE — NEXT SESSION PRIORITIES

| # | Item | Priority |
|---|------|----------|
| 1 | Register MaxBounty postback URL in dashboard | HIGH | Paste URL with token into MaxBounty → Account → Postback |
| 2 | Update PHYSICAL_ADDRESS in worker.js line 3 | HIGH | Required before scaling email sends |
| 3 | ElevenLabs use-cases article | HIGH | |
| 4 | NordVPN alternatives article | HIGH | |
| 5 | Beehiiv tutorial article | HIGH | |
| 6 | Monitor GSC indexing (7–14d from 2026-04-19) | MONITOR | |
| 7 | Monitor ElevenLabs pillar CTR (pos 8.4) | MONITOR | |

---

## QR PERKS — SESSION 10 VERIFICATION (2026-04-17) — 14/14 ✅

All items previously verified. See full history in git log.

---

## WORKING INSIGHTS

**#44 (2026-04-19):** CJ tracking domains change — always verify /go/ redirects resolve end-to-end, not just 301. `tkqlhce.com` was a legacy Commission Junction domain that returned 403. Use `go.nordvpn.net` direct network links instead of CJ intermediaries when available.
