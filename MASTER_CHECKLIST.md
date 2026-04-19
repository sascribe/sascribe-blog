# Master Checklist — QR Perks + Sascribe

> Last updated: 2026-04-19 | Session 4 — Full Site Audit

---

## SASCRIBE — SESSION 4 AUDIT (2026-04-19)

### AUDIT 1 — CONTENT QUALITY

| Article | Title ≤60 | Desc 150–160 | Hook | Specific | IntLinks | AffLink | Image | FAQ | Schema | Words | Score |
|---------|-----------|-------------|------|----------|----------|---------|-------|-----|--------|-------|-------|
| adc-comparison | ❌ 86 | ✅ 151 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2340 | 8 |
| adc-review | ❌ 63 | ✅ 152 | ✅* | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2275 | 8 |
| adc-tutorial | ❌ 94 | ✅ 159 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2121 | 8 |
| adc-use-cases | ❌ 65 | ✅ 157 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2048 | 8 |
| el-pillar | ✅ 55 | ✅ 151 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2216 | 9 |
| beehiiv-comparison | ❌ 78 | ✅ 159 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2213 | 8 |
| beehiiv-pillar | ❌ 89 | ✅ 160 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2146 | 8 |
| beehiiv-review | ❌ 73 | ✅ 159 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2195 | 8 |
| el-comparison | ❌ 85 | ✅ 159 | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 2084 | 8 |
| synthesia-pillar | ❌ 89 | ✅ 151 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 1972 | 8 |
| synthesia-tutorial | ❌ 85 | ✅ 156 | ⚠️ weak | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2116 | 7 |
| nordvpn-review | ❌ 85 | ✅ 160 | ✅ | ✅ | ❌ 0 | ✅ | ✅ | ✅ | ✅ | 2063 | 8 |
| el-review | ❌ 81 | ✅ 160 | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1952 | 8 |
| **adc-news** | ❌ 92 | ✅ 157 | ❌ EVENT | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1309 | **6** |
| **el-tutorial** | ❌ 96 | ✅ 152 | ❌ EVENT | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 2425 | **6** |
| beehiiv-news | ❌ 83 | ✅ 154 | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1342 | 8 |
| synthesia-news | ❌ 78 | ✅ 156* | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1363 | 8 |
| nordvpn-comparison | ❌ 86 | ✅ 156 | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 2280 | 8 |
| nordvpn-news | ❌ 63 | ✅ 152 | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1425 | 9 |
| nordvpn-pillar | ❌ 91 | ✅ 154* | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 2497 | 8 |
| adc-tips | ❌ 75 | ✅ 159* | ✅ | ✅ | ⚠️ 1 | ✅ | ✅ | ✅ | ✅ | 1503 | 8 |

*Fixed this session. EVENT = event-first hook. ⚠️ 1 = has 1 internal link (needs 2).

**NEEDS REWRITE (score <7):**
- `2026-04-13-adcreative-news` — score 6: "A viral Reddit thread this week sent shockwaves through the tech world" — event-first, title references Sam Altman debate
- `2026-04-13-elevenlabs-tutorial` — score 6: "In early 2026, a Reddit thread about Sam Altman went viral" — event-first opening

**UNIVERSAL ISSUE — Internal Links:** 19/21 articles have 0–1 internal links. Target is ≥2. Cannot be auto-fixed without contextual placement. Must be addressed in rewrites or a dedicated internal-linking pass.

**UNIVERSAL ISSUE — Title Length:** 20/21 articles have titles >60 chars. Google truncates display only; no SEO penalty. Long titles are fine for now but note that ElevenLabs pillar (55 chars, ✅) is the model.

### AUDIT 2 — IMAGES

| Article | Image Path | File in Repo | Broken? | Fix Applied |
|---------|-----------|--------------|---------|-------------|
| adcreative-tips | /images/adcreative/ads-38.png | ⚠️ 2 bytes (empty) | YES | ✅ Fixed → logo-adc.jpg |
| all others | various | ✅ All exist | NO | — |

OG image double slash (`//images/...`) fixed in baseof.html.

### AUDIT 3 — TECHNICAL SEO

| Check | Status |
|-------|--------|
| Canonical | ✅ All pages, self-referential |
| Noindex | ✅ Not present on published articles |
| OG title | ✅ All pages |
| OG description | ✅ All pages (homepage fallback fixed) |
| OG image | ✅ All article pages (double slash fixed) |
| Twitter card | ✅ Added 2026-04-19 (was missing everywhere) |
| robots meta | ✅ index, follow |
| CF Analytics beacon | ✅ Present in baseof.html |
| BlogPosting schema | ✅ Injected by baseof.html template |
| Sitemap | ✅ 26 URLs, no taxonomy spam |
| hugo.toml baseURL | ✅ https://sascribe.com/ |
| Cache rules | ✅ Static 1mo + HTML 4hr with TTL overrides |
| Page load time | ✅ 270–330ms across sampled pages |

### AUDIT 4 — GSC AND INDEXING

| Article | GSC Status | Impressions | Clicks | Position |
|---------|-----------|-------------|--------|----------|
| homepage | ✅ INDEXED | 56 | 0 | 7.6 |
| elevenlabs-pillar | ✅ INDEXED | 1489 | 0 | 8.4 |
| beehiiv-news | ✅ INDEXED | — | — | — |
| synthesia-news | ✅ INDEXED | — | — | — |
| adc-review | DISCOVERED, not indexed | — | — | never |
| nordvpn-review | DISCOVERED, not indexed | — | — | never |
| nordvpn-pillar | DISCOVERED, not indexed | — | — | never |
| nordvpn-comparison | DISCOVERED, not indexed | — | — | never |
| nordvpn-news | DISCOVERED, not indexed | — | — | never |
| adc-comparison | DISCOVERED, not indexed | — | — | never |
| beehiiv-pillar | URL UNKNOWN | — | — | never |
| adc-tips | URL UNKNOWN | — | — | never |

**Action taken:** IndexNow batch ping (22 URLs), sitemap resubmitted — both 2026-04-19.

Top queries: "elevenlabs 2026" variants (~14 impressions), "adcreative.ai review" (3 imp, pos 2!).

### AUDIT 5 — AFFILIATE LINKS

| Affiliate | /go/ URL | Status | Destination |
|-----------|---------|--------|-------------|
| adcreative | 301 | ✅ OK | free-trial.adcreative.ai — 200 |
| elevenlabs | 301 | ✅ OK | try.elevenlabs.io — 200 |
| synthesia | 301 | ✅ OK | synthesia.io — 200 |
| beehiiv | 301 | ✅ OK | beehiiv.com — 200 |
| nordvpn | 302 | ⚠️ ISSUE | tkqlhce.com (Impact Radius) — 403 |

NordVPN: 302 redirect to Impact Radius tracking link returns 403 to server-side checks. Bot detection likely. Test manually in browser. If broken, update CF redirect rule to current NordVPN affiliate URL.

### AUDIT 6 — GOOGLE SHEET

All affiliate rows verified. Mismatches found and noted:

| Field | Issue | Action |
|-------|-------|--------|
| AffURL format | adcreative/elevenlabs/synthesia/beehiiv missing `https://` prefix — only nordvpn has full URL | No pipeline impact (generate-article uses affiliateURL frontmatter param directly, not sheet col C) |
| NordVPN Image Path | `/images/nordvpn/logo-nordvpn.png` (full path) vs other affiliates just have folder `/images/adcreative/` | No impact — pipeline function `pickImage()` handles both |
| Last Content Type / Published Date / Total | All match actual repo state ✅ | |

Sheet is in sync with repo state. No functional mismatches.

### AUDIT 7 — PIPELINE HEALTH

| Check | Status | Notes |
|-------|--------|-------|
| content-pipeline.yml | ✅ Active | 3 scheduled runs, all SUCCESS |
| Last runs | ✅ #1 2026-04-14, #2 2026-04-16, #3 2026-04-18 | All schedule-triggered |
| generate-article.js | ✅ web_search_20250305 present | GOOGLE_CSE removed |
| anthropic-beta header | ✅ web-search-2025-03-05 | |
| Dry run (nordvpn long-form) | ✅ PASS | Value-first hook, real pricing, real features |
| Dry run (auto short) | ❌ 429 rate limit | Back-to-back session usage; not a pipeline bug |

**Pipeline verdict: YES — generating quality content.** The dry run nordvpn tutorial produced: real pricing, real feature names (Threat Protection Pro, Meshnet, NordLynx), value-first opener, no event hooks, valid frontmatter.

### AUDIT 8 — CONTENT GAPS

| Affiliate | Missing Types | Days Since Publish | Priority |
|-----------|--------------|-------------------|----------|
| Synthesia | review, comparison, use-cases, alternatives, guide, tips | 3 | HIGH |
| NordVPN | tutorial, use-cases, alternatives, guide, tips | 2 | HIGH |
| ElevenLabs | use-cases, alternatives, guide, tips | 6 | HIGH |
| Beehiiv | tutorial, use-cases, alternatives, guide, tips | 5 | MEDIUM |
| AdCreative | alternatives, guide | 1 | MEDIUM |

**Content Opportunities from GSC:**
- "adcreative.ai review" at pos 2.0 with 0 clicks — existing review not indexed yet (DISCOVERED). Once indexed, should capture clicks.
- ElevenLabs pillar at pos 8.4 with 1489 impressions — needs internal links to related articles + a companion use-cases/comparison article to capture more query variants.
- ElevenLabs use-cases: multiple queries around "voice cloning 2026", "multilingual dubbing" — no article targeting these yet.

### AUDIT 9 — LEGAL AND COMPLIANCE

| Check | Status | Notes |
|-------|--------|-------|
| Affiliate disclosure on articles | ✅ Present | `affiliate-notice-inline` block in single.html, injected on all articles |
| rel=sponsored on affiliate links | ⚠️ Partial | Cover image + CTA bar have rel=sponsored; inline body markdown links do not |
| Privacy policy | ✅ Exists | content/privacy.md → /privacy/ |
| About page | ✅ Exists | E-E-A-T signals present — methodology, independence disclosure |
| Privacy policy in footer | ⚠️ No footer layout | No layouts/partials/footer.html — privacy link not surfaced in nav/footer |
| FTC disclosure on homepage | ✅ N/A | Homepage has no affiliate links |

**Compliance gaps requiring action:**
1. Add privacy policy link to navigation or create footer layout — LOW priority but should be done before significant traffic
2. For complete FTC compliance, inline body affiliate links should have rel="nofollow sponsored" — medium priority

### AUDIT 10 — CLOUDFLARE PERFORMANCE

| Metric | Value | Notes |
|--------|-------|-------|
| Zone plan | Free | Bot Fight Mode not available on Free |
| 7-day requests | 4,389 | |
| 7-day pageviews | 3,463 | |
| 7-day bandwidth | 36.8 MB | |
| Cache hit rate | 8% | Rules properly configured; cold cache on new site |
| Cache rules | ✅ Active | Static: 1mo edge/1wk browser; HTML: 4hr edge/1hr browser |
| Top traffic days | Apr 15 (1189 req), Apr 17 (999 req) | |
| Security threats | 0 | |
| Bot inflation | Not detectable | Free plan analytics don't break down by country |

---

## SASCRIBE — PRIORITY FIX LIST (Session 4)

### Auto-Fixed This Session

| Fix | Commit |
|-----|--------|
| `draft: false` added to 11 articles | multiple |
| synthesia-news description: 147→156 chars | b21dc9ce |
| nordvpn-pillar description: 161→154 chars | 973faf6d |
| adcreative-tips description: 147→159 chars | da93da36 |
| adcreative-tips cover: ads-38.png (2 bytes) → logo-adc.jpg | 64367877 |
| adcreative-comparison: garbage `<script>` tag removed, JSON-LD now valid | 613f74d8 |
| elevenlabs-review: FAQPage JSON-LD added | 0f0953ba |
| baseof.html: Twitter card tags added | 98b481f8 |
| baseof.html: OG image double slash fixed | 98b481f8 |
| baseof.html: homepage OG description fallback added | 98b481f8 |
| generate-article.js: dead CSE replaced with web_search | 7f81f7b2 |
| IndexNow: 22 URLs pinged | HTTP 200 |
| GSC sitemap resubmitted | HTTP 204 |

### Needs Attention (Ranked by Impact)

1. **NordVPN affiliate link 403** — HIGH — Verify in Impact Radius dashboard. If link is broken, update CF redirect rule target URL. Revenue risk.
2. **adcreative-news rewrite** — HIGH — Event-first hook; 6/10 score. Rewrite with search-query-first title.
3. **elevenlabs-tutorial rewrite** — HIGH — Event-first hook; 6/10 score. Rewrite with how-to-first title.
4. **Internal links** — HIGH — 19/21 articles have 0–1 internal links. Each article needs ≥2. Do a dedicated internal-linking pass or fix during rewrites.
5. **NordVPN tutorial** — HIGH — Priority content gap. Run: `node scripts/generate-article.js --type long-form --affiliate nordvpn`
6. **Synthesia review** — HIGH — Biggest content gap affiliate (3 of 6 essential types missing).
7. **ElevenLabs pillar CTR** — MEDIUM — 1489 impressions, 0 clicks at pos 8.4. Title is good (55 chars). Needs companion articles + internal links to push authority.
8. **Privacy policy footer link** — LOW — Add /privacy link to baseof.html nav or create footer partial.
9. **rel=sponsored on inline links** — LOW — Single.html could wrap `<a>` tags in a Hugo render hook to add rel="nofollow sponsored".
10. **CLAUDE_ROLE.md** — LOW — Does not exist. Create if needed to guide future session behaviour.

---

## QR PERKS — SESSION 10 VERIFICATION (2026-04-17)

**Result: 14/14 PASS ✅**

| # | Item | Status |
|---|------|--------|
| 1–14 | All items verified | ✅ PASS |

*(See full checklist in previous session entries)*

---

## SASCRIBE — PREVIOUSLY COMPLETED (Sessions 1–3)

- Session 1: Hugo site, pipeline, 17 articles, GSC/IndexNow setup
- Session 2: ElevenLabs pillar CTR fix, dedup/cooldown, NordVPN 3 articles, internal links
- Session 3: Research pipeline overhaul, 5 articles rewritten (event-first hooks removed), STATE.md/CHECKLIST updated
- Session 4: Full site audit — 10 audits, 13 auto-fixes applied, 10 items flagged for attention

---

## NEXT SESSION PRIORITIES

| # | Item | Priority |
|---|------|----------|
| 1 | NordVPN affiliate link — verify in Impact Radius dashboard | CRITICAL |
| 2 | adcreative-news rewrite | HIGH |
| 3 | elevenlabs-tutorial rewrite | HIGH |
| 4 | Internal linking pass — add ≥2 per article | HIGH |
| 5 | NordVPN tutorial article | HIGH |
| 6 | Synthesia review article | HIGH |
| 7 | ElevenLabs use-cases article | MEDIUM |
| 8 | Monitor GSC indexing — allow 7–14 days from IndexNow ping | MONITOR |
| 9 | Monitor ElevenLabs pillar CTR in GSC | MONITOR |
| 10 | Privacy policy footer link | LOW |
