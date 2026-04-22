# Project State — QR Perks + Sascribe

**Last updated:** 2026-04-19 (Session 7 — Full Platform Audit)
**Projects:** qr-perks.com (Cloudflare Worker) · sascribe.com (Hugo + GitHub Actions pipeline)

---

## QR PERKS — qr-perks.com

**Worker version:** v6 (Session 10, fully finalized)**
**All 14 Session 10 verification items passed: 14/14 ✅**

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Cloudflare Worker | ✅ Live | `qrperks`, deployed 2026-04-17 |
| Supabase | ✅ Live | `fsaxluprhgmyaipaujdn.supabase.co` |
| Resend Email | ✅ Live | `noreply@qr-perks.com` |
| Cloudflare Email Routing | ✅ Live | 3 rules active — support@, privacy@, contact@ → qrperks@gmail.com |

### Conversion Tracking (QR Perks)

| Component | Status | Notes |
|-----------|--------|-------|
| /api/conversion endpoint | ✅ LIVE | GET, token-gated, returns 200 |
| POSTBACK_SECRET | ✅ Set | CF Worker secret deployed |
| conversions table schema | ✅ Updated | offer_name, commission_amount_cents, paid_at added |
| Admin conversions tab | ✅ LIVE | With Mark Paid button |
| Driver earnings conversion history | ✅ LIVE | Per-driver breakdown |
| /api/stats conversions fields | ✅ LIVE | total_conversions, total_revenue_cents, conversions_by_offer |

**MaxBounty Global Postback URL:**
```
https://qr-perks.com/api/conversion?subid=#S2#&offer=#CAMPAIGN_ID#&payout=#RATE#&token=oBMUWDyEwW2HBpX1KpXYuWkn3RNHbIsX
```

### Session 7 Audit Fixes Applied

| Fix | Status | Notes |
|-----|--------|-------|
| Fleet management (/driver/fleet) | ✅ LIVE | Driver self-add/deactivate trucks; QR auto-generated |
| Admin leads export (/admin/leads/export) | ✅ LIVE | CSV download with status/lang filters |
| Admin leads tab upgraded | ✅ LIVE | Stats summary + 6 export buttons |
| CAN-SPAM physical address in emails | ✅ FIXED | PHYSICAL_ADDRESS constant in emailBase footer |
| Privacy link in email footer | ✅ FIXED | All emails now link /privacy |
| TCPA consent inline (bridge phone field) | ✅ FIXED | Text adjacent to phone input |
| Timing-safe admin password comparison | ✅ FIXED | timingSafeEqual() replaces === on auth |
| Postback deduplication (60s window) | ✅ FIXED | Prevents MaxBounty retry double-charges |
| PII masked in console.log | ✅ FIXED | Email no longer logged |
| Privacy policy — CCPA + GDPR + cookies + retention | ✅ FIXED | Full rewrite |
| Driver dashboard "no trucks" links to /driver/fleet | ✅ FIXED | Was "contact support" |

### Pending (QR Perks)

| Item | Priority | Notes |
|------|----------|-------|
| Update MaxBounty dashboard with postback URL | HIGH | Paste URL with token into MaxBounty → Account → Postback |
| PHYSICAL_ADDRESS in worker.js | HIGH | Line 3 of worker.js — update to registered business address |
| Twilio/SMS provider integration | MEDIUM | TCPA webhook ready; no provider configured |
| Rate limiting on login/signup | MEDIUM | No rate limiting — needs Durable Objects or KV |
| Admin cookie stores raw password | LOW | Cookie value = ADMIN_PASSWORD; use hashed session token for hardened security |
| Resend domain verification | LOW | DNS added 2026-04-10; confirm in Resend dashboard |

---

## SASCRIBE — sascribe.com

**Stack:** Hugo · GitHub Actions · Cloudflare CDN
**Repo:** sascribe/sascribe-blog

### Infrastructure

| Service | Status | Notes |
|---------|--------|-------|
| Hugo Site | ✅ Live | sascribe.com via Cloudflare Pages |
| GitHub Actions Pipeline | ✅ Live | content-pipeline.yml — all scheduled runs SUCCESS |
| GSC | ✅ 4 pages indexed | homepage, el-pillar, beehiiv-news, synthesia-news |
| IndexNow | ✅ Active | Key: `sascribe2026xK9mP3qR7nL5vT` — last ping 2026-04-19 (25 URLs) |
| CF Analytics | ✅ Live | Beacon: 027c2dc081f04fd3a6b5fee36918122a |

### Technical SEO (fully clean as of Session 5)

| Check | Status |
|-------|--------|
| Canonical | ✅ All pages |
| OG tags (title/desc/image) | ✅ All — double slash fixed, homepage fallback added |
| Twitter card | ✅ Added Session 4 |
| CF Analytics | ✅ Present |
| BlogPosting schema | ✅ Template-injected |
| FAQPage JSON-LD | ✅ All 24 articles |
| draft: false | ✅ All 24 articles |
| rel=nofollow sponsored | ✅ Hugo render hook added — all /go/ links |
| Privacy policy footer | ✅ Present in baseof.html |
| Sitemap | ✅ 26+ URLs, no taxonomy spam |
| Internal links | ✅ All 24 articles ≥2 links |

### Affiliate Redirects

| Affiliate | /go/ redirect | Destination | Status |
|-----------|--------------|-------------|--------|
| adcreative | 301 | free-trial.adcreative.ai | ✅ OK |
| elevenlabs | 301 | try.elevenlabs.io | ✅ OK |
| synthesia | 301 | synthesia.io | ✅ OK |
| beehiiv | 301 | beehiiv.com | ✅ OK |
| nordvpn | 302 | go.nordvpn.net | ✅ FIXED (was tkqlhce.com — CJ legacy domain 403) |

**Working Insight #46 (2026-04-19):** Admin auth used plain `===` for password comparison — susceptible to timing attacks. Always use constant-time comparison (XOR over all chars regardless of first mismatch) for any secret comparison. CF Workers don't have Node's `crypto.timingSafeEqual` but a simple XOR loop achieves the same protection.

**Working Insight #45 (2026-04-19):** MaxBounty postback fires GET to /api/conversion — must return 200 immediately or MB retries. Token validation prevents fake conversions. SubID format qrp_t{n} maps directly to truck_id. The `affiliate_id` column on the conversions table has a FK to the affiliates table — never store MaxBounty campaign IDs there; use `offer_name` instead.

**Working Insight #44:** CJ tracking domains change — always verify /go/ redirects resolve end-to-end. `tkqlhce.com` was a legacy CJ domain that returned 403. Use `go.nordvpn.net` direct NordVPN network links instead.

### Content State (2026-04-19 Session 5)

**24 articles published** across 5 affiliates:

| Affiliate | Articles | Last Published | Types Completed |
|-----------|----------|----------------|-----------------|
| AdCreative AI | 6 | 2026-04-18 | review, comparison, tutorial, use-cases, news, tips |
| ElevenLabs | 4 | 2026-04-13 | pillar, comparison, review, tutorial |
| Beehiiv | 4 | 2026-04-14 | review, comparison, pillar, news |
| Synthesia | 5 | 2026-04-19 | pillar, tutorial, news, review, comparison |
| NordVPN | 5 | 2026-04-19 | review, pillar, comparison, news, tutorial |

**Content gaps remaining:**
- AdCreative: alternatives, guide
- ElevenLabs: use-cases, alternatives, guide, tips
- Synthesia: use-cases, alternatives, guide, tips
- Beehiiv: tutorial, use-cases, alternatives, guide, tips
- NordVPN: use-cases, alternatives, guide, tips

### Session 5 Fixes Applied (2026-04-19)

| Fix | Result | Key Commits/Actions |
|-----|--------|---------------------|
| NordVPN CF redirect | ✅ DONE | tkqlhce.com → go.nordvpn.net, 302 confirmed |
| adcreative-news rewrite | ✅ DONE | Value-first opener, research-backed | 14db480b, a9d57eaf |
| elevenlabs-tutorial rewrite | ✅ DONE | Value-first opener, 2685 words | 985d3773, 181f101a |
| Internal linking pass | ✅ DONE | All 21 existing articles — See Also blocks | 3b30b0a4–9d32ff28 |
| render-link.html hook | ✅ DONE | rel=nofollow sponsored on all /go/ links | 264b9bdc |
| Privacy policy footer | ✅ N/A | Already present in baseof.html |
| NordVPN tutorial | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-nordvpn-tutorial-1776635257745/ |
| Synthesia review | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-synthesia-review-1776635412717/ |
| Synthesia comparison | ✅ DONE | 200 ✅ https://sascribe.com/posts/2026-04-19-synthesia-comparison-1776635520505/ |
| generate-article.js trimStart fix | ✅ DONE | Prevents frontmatter validation failure | 81d42835 |
| Final IndexNow ping | ✅ DONE | 25 URLs, HTTP 200 |

### Pending (Sascribe)

| Item | Priority | Notes |
|------|----------|-------|
| ElevenLabs use-cases | HIGH | 1 article; high GSC traction on pillar (1489 imp) |
| NordVPN use-cases / alternatives | HIGH | Next content types |
| Beehiiv tutorial | HIGH | 5+ days since last publish |
| Synthesia use-cases | MEDIUM | Complete coverage |
| GSC indexing | MONITOR | 12 articles still not indexed; allow 7–14 days from 2026-04-19 ping |
| ElevenLabs pillar CTR | MONITOR | pos 8.4, 1489 imp, 0 clicks — needs to crack top 5 |
| QR Perks postback endpoint | NEXT SESSION | Primary mission next session |
| CLAUDE_ROLE.md | LOW | Does not exist in repo |

---

## QR Perks Platform — Sessions 6–8 (2026-04-19)

### Working Insights

**Working Insight #45:** The `affiliate_id` column on the `conversions` table has a FK to the `affiliates` table — never store MaxBounty campaign IDs there; use `offer_name` instead.

**Working Insight #46:** TCPA consent placement is outcome-determinative — consent language must appear ABOVE or ADJACENT to the submit button, never below it. Courts have invalidated consent where disclosure appeared below the button. Button label in consent text must match exactly (e.g., "By tapping 'Get My Deal'" requires the button to say exactly "Get My Deal").

### Session 6 — MaxBounty Postback (2026-04-19)

| Fix | Result | Notes |
|-----|--------|-------|
| `/api/conversion` endpoint | ✅ DONE | Token validation, subid parse, truck→driver lookup, conversions insert, commissions row, driver earnings update, referral 10% |
| Postback deduplication | ✅ DONE | 60-second window check prevents MaxBounty retry double-writes |
| `offer_name` not `affiliate_id` | ✅ DONE | FK violation fix — store campaign ID in `offer_name` |
| Admin `/admin/conversions/mark-paid` | ✅ DONE | Mark conversions paid, clear commission_calculated |

**MaxBounty postback URL:** `https://qr-perks.com/api/conversion?subid=#S2#&offer=#CAMPAIGN_ID#&payout=#RATE#&token=oBMUWDyEwW2HBpX1KpXYuWkn3RNHbIsX`

### Session 7 — Platform Audit (2026-04-19)

| Area | Result | Notes |
|------|--------|-------|
| Security: timingSafeEqual | ✅ DONE | XOR-based constant-time admin password comparison |
| CAN-SPAM: physical address | ✅ DONE | Added to all email footers |
| Fleet management | ✅ DONE | Drivers self-add trucks (max 10), auto QR generation |
| Leads CSV export | ✅ DONE | `/admin/leads/export` with status/lang filters |
| Admin nav | ✅ DONE | All sections linked and working |

### Session 8 — TCPA/CIPA Compliance (2026-04-19)

| Fix | Result | Commit |
|-----|--------|--------|
| Physical address → `1945 S. Laurel Pl., Ontario, CA 91762` | ✅ DONE | cab1856 |
| Hero form: phone field + TCPA consent ABOVE button | ✅ DONE | cab1856 |
| Bridge overlay: TCPA with exact button name | ✅ DONE | cab1856 |
| Driver signup: TCPA consent ABOVE 'Apply Now' | ✅ DONE | cab1856 |
| SMS STOP acknowledgment: CIPA-compliant text | ✅ DONE | cab1856 |
| leads-terms page: full TCPA disclosures rewrite | ✅ DONE | cab1856 |
| Privacy policy: SMS section + CIPA section | ✅ DONE | cab1856 |
| CF Worker deployed | ✅ DONE | 2026-04-19 |
| GitHub commit | ✅ DONE | cab185695e3525512a380b3a318428d22235a456 |

### Session 12 — Bug Fixes + Dashboard Improvements (2026-04-22)

| Fix | Result | Notes |
|-----|--------|-------|
| Admin 500 — payouts scoping + GEO_DRIVER_ID undefined | ✅ DONE | `let payouts` inside try block → hoisted out; added alias consts |
| Bridge email placeholder | ✅ DONE | "Enter your email (optional)" |
| Hero Get My Deal → openBridge (interstitial) | ✅ DONE | heroGetMyDeal() function |
| Hero TCPA no clipping | ✅ DONE | overflow:visible + max-height:none on capture-wrap |
| Driver checklist always visible + complete state | ✅ DONE | Shows all green + payout-ready msg for Speedy |
| Driver dashboard JS hoisted to 4th dashShell arg | ✅ DONE | Was passed as 5th (ignored) — stats toggle now works |
| Per-truck stats section + by_truck in period-stats API | ✅ DONE | Updates with Day/Week/Month/Year |
| My Fleet: inline truck name editing | ✅ DONE | saveFleetTruckName(), tnf- inputs |
| QR code white background container | ✅ DONE | padding 16px, border-radius 8px, max-width 220px |
| t51, t52 deleted from Supabase | ✅ DONE | Confirmed absent |
| CF Worker deployed | ✅ DONE | 2026-04-22 |
| GitHub commit | ✅ DONE | a33ac6f9 (sascribe/qrperks-site) |

**Working Insight #49 (2026-04-22):** dashShell(title, active, content, script='') — the 4th param is script. Passing 5 args (with '' as 4th) silently drops the script block. Always verify argument count when using functions with optional parameters.

**Working Insight #50 (2026-04-22):** Template variables must exist in JS scope at render time. Admin dashboard used GEO_DRIVER_ID/SPEEDY_DRIVER_ID in the payout ledger template but only declared GEO_ID/SPEEDY_ID. ReferenceError → 500. Fix: add const aliases immediately after the original declarations.

### Session 11 — Payout System (2026-04-22)

| Fix | Result | Notes |
|-----|--------|-------|
| `tax_id_last4` + `payment_method_set_at` + `payment_details_*` columns on `drivers` | ✅ DONE | 6 new columns via Supabase Management API |
| `payouts` table | ✅ DONE | 13 columns: id, driver_id, organization, amount_cents, period_start, period_end, payment_method, payment_reference, status, notes, paid_by, created_at, paid_at |
| Speedy Dumps seed: tax_id_last4='0000', paypal='speedydumpsco@gmail.com' | ✅ DONE | Confirmed via PostgREST |
| Admin dashboard: Pay Now modal | ✅ DONE | Opens with org name, amount owed, payment method, reference input, period selector, notes |
| Admin payout ledger (collapsible) | ✅ DONE | All payouts with Geo/Speedy filter buttons |
| `/admin/pay-driver` POST endpoint | ✅ DONE | Writes payout row, marks commissions paid |
| Driver dashboard: Payment History section | ✅ DONE | Shows all payouts with date, period, amount, method, reference, status |
| CF Worker deployed | ✅ DONE | 2026-04-22 |
| GitHub commit | ✅ DONE | da27c96ae00a96ed160ff01801c5ee8fb313805c |

**Working Insight #47 (2026-04-22):** Stripe-ready payout design — `payouts` table uses generic `payment_reference` (holds PayPal TX ID, bank ref, or Stripe transfer ID) and `payment_method` enum. When adding Stripe Connect: set `payment_method='stripe'` on driver record and replace the reference input in the modal with a Stripe transfer API call. No schema changes needed.

**Working Insight #48 (2026-04-22):** Python `\`` in a regular string literal produces two chars (`\` + `` ` ``). When injecting into a JS template literal, use plain `` ` `` for nested template literals OR use string concatenation (`.map(p=>'<tr>...</tr>')`) to avoid nested backtick issues entirely. Use string concatenation to be safe.

### Pending (QR Perks)

| Item | Priority | Notes |
|------|----------|-------|
| Register MaxBounty postback URL | ACTION | Add to MaxBounty dashboard: see URL above |
| Rate limiting on login/signup | MEDIUM | Needs Durable Objects or KV — no persistent state in CF Workers otherwise |
| Admin session tokens | MEDIUM | Currently stores raw ADMIN_PASSWORD in cookie — should use short-lived signed JWT |
| Twilio SMS setup | LOW | 5 manual steps documented in worker comments |
