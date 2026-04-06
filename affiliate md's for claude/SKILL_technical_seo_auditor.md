# SKILL: Technical SEO Auditor
*Custom-built for Blue's affiliate portfolio — Sascribe.com, QR-Perks.com*
*Stack: Hugo / Cloudflare Pages / Cloudflare Workers / GitHub / n8n*
*Last updated: 2026-04-06*

---

## ROLE & CONCEPT

Technical SEO Auditor for Sascribe.com affiliate blog.
Run a full technical SEO audit using our existing stack — no third-party subscriptions.

Data sources:
- GSC API — live ranking + impression data
- GitHub API — frontmatter and content analysis
- Cloudflare API — traffic and cache metrics
- web_fetch — live page analysis

---

## PROPERTY PROFILE — SASCRIBE.COM

- Stack: Hugo custom layouts, Cloudflare Pages, GitHub repo sascribe/sascribe-blog
- Affiliates: AdCreative AI, ElevenLabs, Synthesia, Beehiiv, NordVPN
- Content types: review, comparison, tutorial, use-cases, pillar, alternatives
- SEO goal: Commercial-intent keywords — best [tool], [tool] review, [tool] vs [tool]
- Content minimum: 800 words (pillar posts 2000+)

---

## REQUIRED FRONTMATTER (every article)

title: (hook-first, contains target keyword, 50-60 chars)
description: (150-160 chars, includes keyword + CTA)
date:
affiliateURL:
affiliateName:
schema: "BlogPosting"
faqSchema: true
cover:
  image: /images/[slug]/logo-[slug].png
  style: logo OR promo

---

## SEO HEALTH CHECKLIST

Per article:
  [ ] schema: "BlogPosting" in frontmatter
  [ ] faqSchema: true in frontmatter
  [ ] FAQ section + FAQPage JSON-LD at bottom
  [ ] At least 2 internal links to other /posts/ articles
  [ ] description: field present in frontmatter
  [ ] affiliateURL + affiliateName in frontmatter
  [ ] rel=sponsored on affiliate links
  [ ] Hook-first opening (no disclosure or definition before hook)

Site-wide:
  [ ] /about page live (E-E-A-T signal)
  [ ] Cloudflare cache rules active
  [ ] Cloudflare Web Analytics beacon in baseof.html
  [ ] IndexNow pings on every publish
  [ ] sitemap.xml accessible

---

## ZERO-CLICK TITLE FORMULA

Trigger: >10 impressions + 0 clicks + position >5
Action: Rewrite title using one of:
  - [Tool] Review [Year]: Is It Worth $[Price]/Month?
  - [Tool] vs [Competitor]: Which One Actually Wins in [Year]?
  - [Tool] Pricing Explained: What You Actually Pay in [Year]
  - Best [Tool] Alternatives in [Year] (Ranked by Real Users)
  - [Tool] [Year] Update: Everything That Changed

Rule: Target keyword must appear in first 6 words. Under 60 chars preferred.

---

## CONTENT GAP DETECTION

For each affiliate, check:
  [ ] review — published?
  [ ] pillar — published?
  [ ] comparison — published?
  [ ] alternatives — published?
  [ ] tutorial/use-cases — published?

Priority order for new content:
  1. Pillar (highest word count, highest authority signal)
  2. Alternatives (high commercial intent, captures people leaving competitor)
  3. Comparison vs #1 competitor (targets "tool vs tool" searches)
  4. Review (core — should exist for every affiliate)
  5. Tutorial / use-cases (long-tail, lower competition)

---

## AUDIT SIGNALS — WHAT TO WATCH

Healthy signals:
  - Impression staircase: new floor forms, doesn't spike-and-crash
  - Position improving week-over-week (even 10.5 → 9.8 matters)
  - Cache rate rising (repeat visitors returning)
  - New countries appearing in GSC (international indexing)

Warning signals:
  - Impressions plateau for 14+ days with no new content
  - Position drops >2 spots on a keyword you own
  - CTR drops on a page that previously had clicks
  - Cache rate drops (could indicate content changes invalidating cache)

Action thresholds:
  >10 impr + 0 clicks + pos >5 → rewrite title
  pos 5-10 + low CTR → add FAQ, improve meta description
  pos 10-20 → add internal links pointing to this URL, add more content
  pos >20 → content quality issue — rewrite or consolidate

---

## LIVE LEARNINGS — APR 6 2026

1. Title rewrite — ElevenLabs pillar: 245→439 impressions in 24hrs after title rewrite. Direct causation. Do immediately on any article >20 impr with 0 clicks.
2. FAQ + FAQPage JSON-LD — all articles need this for People Also Ask eligibility. Now enforced in pipeline, backfilled on all existing articles.
3. Internal links — 2 per article minimum. Authority flows toward highest-impression targets.
4. About page — E-E-A-T signal. Created at /about.
5. Cache warmup — 24-72hr warmup time. 0.09%→0.8% in 48hrs. Expect 5-15% by day 5.

Impression staircase (new domains):
  Days 1-7: Google crawls content
  Days 7-14: Impressions start (2→44→208)
  Days 14-30: Impressions stabilize at new floor
  Days 30-90: Rankings solidify, clicks begin
  This is normal. Do not panic at zero clicks if impressions are growing.

GSC data lag:
  Impressions: 1-2 day lag
  Clicks: 2-3 day lag
  Position changes: 1-2 day lag
  Never conclude no clicks from today's GSC. Check 3-day trend.
