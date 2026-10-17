# Market pricing: shift-scheduling SaaS and Vietnamese custom builds

**Checked:** 2026-10-11 (every price below was read on this date unless marked otherwise) · **Scope:** a single F&B shop in Vietnam, ~40 staff, one location · **Status:** research note, not a recommendation. Watchtower's own price is being revised; this note does not propose one.

## Question

What does the market charge (a) for off-the-shelf HR / timekeeping / shift-scheduling SaaS, Vietnamese and international, and (b) for a custom web app built by a Vietnamese team, and how do Watchtower's current figures compare?

## Bottom line

- **Vietnamese SaaS costs about VND 4–24M a year** at list price for 40 staff at one location: iPOS HRM 4.2M, FastWork Chấm công 4.8M (plus a one-off 4M setup fee), ACheckin 12–23.5M, MISA AMIS HRM bundle 16.8–24M. Tanca, and Base Checkin / Base Schedule, show no usable price on their own pages. [S1, S3, S5, S6, S8, S10, S11]
- **International SaaS costs about VND 7.5–113M a year** at VCB 26,070 VND/USD: Homebase Essentials 7.5M (annual billing), 7shifts Pro 25M, Sling Premium 21M, When I Work 31–100M, Deputy 63–113M, Odoo Standard 91–140M. But 7shifts serves only US/Canada customers, and Homebase reportedly restricts its full app suite to the US, UK and Canada. Of the tools checked, only Deputy has Vietnamese, and only in its mobile apps, not in the manager web app. [S14, S15, S18–S22, S24, S26, S27]
- **Watchtower Phase 1 at the current VND 370M, plus 3 years of maintenance and infrastructure, comes to about VND 604–658M.** That is about 2× the 3-year cost of Odoo Standard, about 3× Deputy Lite, about 8× 7shifts Pro, about 12× MISA AMIS HRM Standard and about 50× iPOS HRM. [repo, computed below]
- **At 370M, the implied rate is about VND 1.91M per team man-day** (194 md). That is below the proposal's own change-request rate of 2.5M per person-day (194 md × 2.5M = 485M) and below Phase 2's implied 2.5M/md. It is roughly the median gross *salary* of a full-stack developer with 5–8 years of experience, divided by 22 days (ITviec: 41.8M/month → 1.90M/day), before employer costs, overhead or margin. [repo, S28]
- **Vietnamese vendors' published bands are marketing estimates, not rate cards.** Vina Software puts "simple management software" at 50–100M and an "enterprise management system" at 200–400M (4–8 months). Saigon Technology puts an MVP at 260M–1.3B (2–4 months), with T&M at 650k–1.3M VND/hour. Annual maintenance is 15–25% (Saigon Technology) or 15–30% (Vina Software) of the build. Watchtower's 60M/year is 16% of 370M. [S30, S31]
- **The comparison is not like-for-like.** None of the SaaS pages checked show the Thursday 00:00 – Saturday 15:00 window with draft-until-save, custom times inside fixed periods, nickname markers, or the 10/11/16-minute lateness rule with a 2× deduction and an anomaly hold. The nearest matches are self-service shift registration (iPOS, ACheckin, Base Schedule, 7shifts availability), late-arrival statistics (ACheckin), start-time rounding (Deputy) and an activity log (7shifts). See §4.

---

## 1. Vietnamese HR / timekeeping / scheduling SaaS

All prices in VND. "List" = a fixed published price; "from" = the vendor publishes a starting point only.

| Vendor | Plan | Price | Unit / billing | List or from | 40 staff, 1 location, per year | Source |
|---|---|---|---|---|---|---|
| iPOS HRM | HR Free | 0 | Unlimited staff, "Giới hạn tính năng" (limited features) | List | 0 (features limited) | [S1] |
| iPOS HRM | HR 30 | 250,000 | Per month, up to 30 staff | List | Not eligible (cap 30) | [S1] |
| iPOS HRM | **HR 50** | **350,000** | Per month, up to 50 staff, all features | List | **4,200,000** | [S1] |
| iPOS HRM | HR MAX | 550,000 | Per month, unlimited staff | List | 6,600,000 | [S1] |
| FastWork | **Gói Chấm công** | **10,000** | Per user/month, minimum 10 users, ex-VAT | List | **4,800,000** + one-off setup 4,000,000 (bracket "< 60 users") | [S3] |
| FastWork | HRM+ (includes OFFICE+) | 45,000 | Per user/month, min 10 users | List | 21,600,000 + setup 4,000,000 | [S3] |
| ACheckin | **Starter** (attendance, shift scheduling, reports) | **25,000** | Per employee/month; no setup fee; "not charged VAT" | List | **12,000,000** | [S5] |
| ACheckin | Plus (+ payroll) | 40,000 | Per employee/month | List | 19,200,000 | [S5] |
| ACheckin | Advance | 49,000 | Per employee/month | List | 23,520,000 | [S5] |
| Tanca | FREE | 0 | Unlimited staff; **excludes shift scheduling** | List | 0 (no scheduling) | [S6] |
| Tanca | LIFETIME (includes "Lịch ca thông minh (AI)") | "Khởi điểm từ Liên hệ" (contact sales) | One-off licence + 10%/year maintenance | Contact sales | Not published | [S6] |
| Tanca | AI add-on | from 647,000 | Per month, requires Lifetime | From | n/a | [S6] |
| MISA AMIS | **HRM STANDARD** (Chấm công + Tiền lương + HR records + PIT + social insurance) | **1,400,000/month or 16,800,000/year** for the 40-staff tier | Per company, by headcount tier; paid yearly ("thanh toán cả năm") | List | **16,800,000** | [S7, S8] |
| MISA AMIS | HRM PROFESSIONAL | 2,000,000/month or 24,000,000/year (40-staff tier) | As above | List | 24,000,000 | [S7, S8] |
| MISA AMIS | Chấm công alone | Price in an image, "applies to 30 users, 30 employees"; MISA's text says "10,000 – 15,000 VND per employee per month" | Per employee/month (MISA's own estimate) | Estimate | ≈ 4,800,000 – 7,200,000 (estimate) | [S9] |
| Base.vn | Base Checkin / Base Schedule | No price shown ("No items found" in the price block; the Checkin pricing URL returns an empty page) | n/a | Contact sales | Not published | [S10, S11] |
| Base.vn | *Sibling apps* Base Payroll / Base Timeoff, Growth plan | 900,000 | Per app per month, up to 60 accounts, **minimum 12 months' payment** | List | 10,800,000 per app *(only an indication for Checkin/Schedule, not their price)* | [S12, S13] |

Notes:
- The iPOS English page lists "HR 4" as free, but the Vietnamese page lists HR 4 at 80,000/month and a separate "HR Free" plan. The table uses the Vietnamese page. [S1, S2]
- The MISA AMIS headcount tiers (30/40/50/100/150/200 staff) come from the price script the page itself loads. The page defaults to the 100-staff tier, which is where the commonly quoted "3,150,000 VNĐ/tháng" comes from. [S7, S8]

## 2. International scheduling SaaS

Prices in USD, excluding tax. VND per year uses **26,070 VND/USD** (Vietcombank USD selling rate, table dated 2026-10-11, updated 2026-10-10 23:00 +07) [S27].

| Vendor | Plan | Price (USD) | Unit / billing | Caps / minimums | 40 staff, 1 location, per year (VND) | Source |
|---|---|---|---|---|---|---|
| 7shifts | Comp | 0 | Per location | Single location, **up to 15 employees** | Not eligible | [S14] |
| 7shifts | Essentials | 39.99 annual / 44.99 monthly | Per location/month | **Up to 30 employees** | Not eligible | [S14] |
| 7shifts | **Pro** | **79.99 annual / 89.99 monthly** | Per location/month | Up to 60 employees | **25.0M** (annual) / 28.2M (monthly) | [S14] |
| 7shifts | Premium | 134.99 annual / 149.99 monthly | Per location/month | Unlimited | 42.2M / 46.9M | [S14] |
| Homebase | Basic | 0 | Per location | 1 location, **up to 10 employees** | Not eligible | [S18] |
| Homebase | **Essentials** | **24 annual / 30 monthly** | Per location/month | Unlimited employees | **7.5M** / 9.4M | [S18] |
| Homebase | Plus | 56 annual / 70 monthly | Per location/month | Unlimited | 17.5M / 21.9M | [S18] |
| Homebase | All-in-One | 96 annual / 120 monthly | Per location/month | Unlimited | 30.0M / 37.5M | [S18] |
| Sling | Free | 0 | n/a | **Up to 30 users** | Not eligible | [S20] |
| Sling | **Premium** | **1.70 annual / 2.00 monthly** | Per user/month | n/a | **21.3M** / 25.0M | [S20] |
| Sling | Business | 3.40 annual / 4.00 monthly | Per user/month | n/a | 42.6M / 50.1M | [S20] |
| When I Work | Essentials / Pro / Premium | 2.50 / 5 / 8 | Per user/month (annual terms not stated) | No minimum fee stated; 14-day trial | 31.3M / 62.6M / 100.1M | [S21] |
| Deputy | Lite / Core / Pro | 5 / 6.50 / 9 | Per user/month, "billed upfront or monthly installments"; 10% off annual | **Minimum USD 30/month per invoice on monthly plans** | 62.6M / 81.3M / 112.6M | [S22] |
| Odoo (served to a VN IP) | One App Free | 0 | One app, unlimited users | One app only (for example Planning) | 0 *(not tested whether one app is enough)* | [S26] |
| Odoo | **Standard** (all apps) | **8.95 yearly / 11.20 monthly**; first-12-month discount 7.25 / 9.10 | Per user/month | Discount "valid for 12 months, for initial users ordered" | **90.7M** (year 1, discounted) / 112.0M (regular yearly) / 140.2M (monthly) | [S26] |
| Odoo | Custom | 16.40 yearly / 20.40 monthly; discounted 13.40 / 16.40 | Per user/month | Multi-company, Studio | 205.2M (regular yearly) | [S26] |

Per-user prices assume all 40 staff hold a paid seat. Whether a vendor counts the owner as an extra seat, or lets some staff use free seats, was not checked.

**Availability in Vietnam and Vietnamese language**

| Vendor | Serves Vietnam? | Vietnamese UI? | Source |
|---|---|---|---|
| 7shifts | ToS §17: "intended for Customers located within the United States and Canada … makes no representation that [it] is appropriate or available for use outside" | No: English, French, Spanish only | [S15, S16] |
| Homebase | Full suite (mobile apps, time clocks) only in the US, UK and Canada; the web version works anywhere, *per a search-engine summary of Homebase's support article (the page itself needs a login)* | Not stated | [S19] |
| Deputy | Bills in USD for "other countries" | Mobile apps: yes. **Manager web app: English only** | [S22, S24] |
| When I Work | "50+ countries"; no list given | Not stated | [S21] |
| Sling | Not stated | Not stated | [S20] |
| Odoo | Yes: the pricing page detected `country_code: "VN"` and quoted in USD | Not checked | [S26] |

## 3. Vietnamese custom-build rates

No Vietnamese software company found publishes a formal rate card. VINASA publishes no rate data that could be found. TopDev's latest report (2024–2025, September 2024) is a download, and its salary tables were not read. What is available:

**3a. Salaries (primary survey data, ITviec Vietnam IT Salary & Recruitment Market Report 2025–2026; 1,839 respondents, surveyed May–Nov 2025; median monthly gross, VND)** [S28]

| Role | 3–4 yrs | 5–8 yrs | > 8 yrs | 5–8 yrs ÷ 22 days *(computed)* |
|---|---|---|---|---|
| Full-stack developer | 34.5M | 41.8M | 44.8M | 1.90M/day |
| Back-end developer | 30.1M | 39.9M | 54.9M | 1.81M/day |
| Business analyst | 28.0M | 37.4M | 41.35M | 1.70M/day |
| Tester | 20.7M | 25.3M | 36.5M | 1.15M/day |
| Project leader / manager | 48.4M | 58.45M | — | 2.66M/day |
| Tech lead | 53.85M | — | 68.45M | — |

These are employee **salaries**, not what a company bills. The 22 working days a month are an assumption of this note. Employer insurance contributions, overhead and margin are not included.

**3b. Vendor-published bands (marketing estimates, flagged as such)**

| Source | Size band | Cost (VND) | Delivery | T&M / man-day | Maintenance per year | Source |
|---|---|---|---|---|---|---|
| Saigon Technology (CEO blog, 2026-08-19; "chỉ mang tính tham khảo", for reference only) | MVP | 260M – 1.3B | 2–4 months | 650k – 1.3M VND/hour (≈ 5.2–10.4M per 8-hour day); dedicated team 75–200M per person/month | 15–25% of project value | [S30] |
| | Medium | 1.3B – 3.9B | 6–12 months | | | [S30] |
| Vina Software (blog, 2025-12-11; "reference prices") | Simple management software (MVP) | 50 – 100M | 2–4 months | Not given | 15–30% of development cost | [S31] |
| | Enterprise management system (medium) | 200 – 400M | 4–8 months | | | [S31] |
| MekongSoft (blog, 2025-02-25) | No figures; contact for a quote | — | — | — | — | [S32] |

Saigon Technology quotes the same bands in USD ($10k–50k for an MVP, $25–50/hour), so its rates look aimed at offshore and export work as much as at local clients. The article does not say which.

## 4. Comparison with Watchtower

**Watchtower figures from the repo:** Phase 0 VND 15M (credited against Phase 1) · Phase 1 VND 370M / 20 weeks · Phase 2 VND 285M / 14 weeks · Phase 3 VND 130M / 6 weeks (provisional) · maintenance VND 5M/month after Phase 1, 9M/month after Phase 2 · infrastructure at cost + 20% (est. 1.5–3M/month) · change requests VND 2.5M per person-day · prices ex-VAT [`docs/client/04-solution-proposal-and-cost.md` §1, §6]. Phase 1 was re-estimated on 2026-10-11 at 233 story md / **~194 team md** / 10 sprints (20 weeks + 2 weeks pilot); Phase 2 at ~114 md, Phase 3 at ~48 md [`docs/backlog/01-epics-and-user-stories.md` §0, `docs/delivery/02-delivery-roadmap.md` §7]. **The proposal still shows the 2026-09-29 price.**

**4a. Implied rates (computed)**

| Measure | Value |
|---|---|
| Phase 1: 370M ÷ 194 team md | **≈ VND 1.91M per team md** |
| Phase 1: 370M ÷ 233 story md | ≈ VND 1.59M per story md |
| Phase 2: 285M ÷ 114 team md | VND 2.50M per team md |
| Phase 3: 130M ÷ 48 team md | ≈ VND 2.71M per team md |
| 194 team md at the proposal's change-request rate (2.5M) | VND 485M |
| Maintenance 60M/year as a share of 370M | 16% (market bands: 15–25% / 15–30%, see §3b) |

**4b. Cost over 3 years for 40 staff at one location (VND, ex-VAT, list prices, computed)**

| Option | Year 1 | 3-year total | Notes |
|---|---|---|---|
| **Watchtower Phase 0+1** | 370M build + ops | **≈ 604 – 658M** | 370M + 36 × 5M maintenance + 36 × 1.5–3M infra. Simplified: starts the clock at go-live and ignores the free 3-month warranty overlap |
| Watchtower Phases 0+1+2 | — | ≈ 1,033 – 1,087M | 655M + 36 × 9M + infra. Rough upper view; ignores the Phase 1-only months at 5M |
| iPOS HRM HR 50 | 4.2M | 12.6M | |
| FastWork Chấm công | 8.8M | 18.4M | Includes 4M setup |
| Homebase Essentials (annual) | 7.5M | 22.5M | Full app suite may not be offered in VN (§2) |
| ACheckin Starter / Advance | 12.0M / 23.5M | 36.0M / 70.6M | |
| MISA AMIS HRM Standard / Professional | 16.8M / 24.0M | 50.4M / 72.0M | Includes payroll, which Watchtower has only in Phase 2 |
| Sling Premium (annual) | 21.3M | 63.8M | |
| 7shifts Pro (annual) | 25.0M | 75.1M | US/Canada only per ToS |
| When I Work Essentials | 31.3M | 93.9M | |
| Deputy Lite / Pro | 62.6M / 112.6M | 187.7M / 337.9M | |
| Odoo Standard (yearly) | 90.7M | 314.7M | Year 1 discounted, then 112.0M/year |

SaaS prices can rise. 7shifts' ToS, for example, allows increases on 30 days' notice. The table holds today's prices flat for 3 years.

**4c. Watchtower Phase 1 rules: does the SaaS obviously support them?** "Not seen" means it is not on the pricing or help pages read. It does not mean the product cannot do it.

| Watchtower Phase 1 rule (PRD / CLAUDE.md) | Evidence on vendor pages |
|---|---|
| 5 fixed periods; registration in whole periods with custom times inside a period (FR-S1, FR-S21) | Staff self-registration of shifts exists: iPOS ("staff actively register their shifts", overlap notifications), ACheckin ("Đăng ký ca, xếp ca mô hình self-service"), Base Schedule ("Nhân viên dễ dàng đăng ký ca"), 7shifts availability. **Custom times inside a fixed period: not seen.** [S1, S5, S11, S17] |
| Window Thursday 00:00 – Saturday 15:00, draft until Save, auto-lock at the cutoff (FR-S1, FR-S20) | **Not seen.** 7shifts has availability *approvals* and an "allow submissions for published schedules" setting, but no submission cutoff. [S17] |
| Position colours and unique nicknames on the calendar (FR-O42, FR-A11) | Not seen (not checked in depth) |
| 10-minute grace · late penalty from minute 11 · 2× deduction from minute 16 · anomaly when deduction ≥ shift (FR-S9, FR-S17, FR-S18) | **Not seen as a rule.** Deputy has start-time rounding in 5/10/15/30/60-minute steps. ACheckin shows late-arrival statistics. MISA AMIS payroll has configurable deduction formulas, but no specific lateness schedule is shown. [S25, S5, S7] |
| Bilingual VI/EN chosen per user (NFR-7) | Deputy: Vietnamese on mobile only, English-only web app for managers. 7shifts: EN/FR/ES. Vietnamese vendors: Vietnamese pages; an English UI is not stated. [S24, S16] |
| Audit log of every change with old/new values and reason (NFR-1) | 7shifts Activity Log covers availability, publishing and shift-pool changes, but not shift trades, and "may require a plan upgrade". MISA AMIS payroll lists "Nhật ký thay đổi … lưu vết kiểm toán". [S17b, S7] |
| Server-side read restriction: staff see only their own schedule and pay (NFR-2) | Cannot be verified from marketing pages. 7shifts Essentials lists "customizable permission settings". [S14] |

## 5. Caveats / open questions

- **Not verified:** Tanca prices (it no longer publishes per-user prices; Lifetime is "contact sales"). Base Checkin and Base Schedule prices (the price block is empty). The MISA AMIS Chấm công standalone price (in an image). Homebase country support (the support page is behind a login, so this note relies on a search-engine summary). TopDev salary tables (download). Any VINASA rate data.
- **Access workaround:** 7shifts returned HTTP 403 to direct fetches. Its pricing, Terms of Service and help pages were read as rendered by a reader proxy (`r.jina.ai`), so the text is 7shifts' own.
- **Region-dependent prices:** Odoo prices by visitor country (the VN prices above were served to a VN IP). Deputy bills AUD/GBP/USD by region. Card payments in USD will convert at the card issuer's rate, not the Vietcombank rate.
- **Promotions in effect on 2026-10-11:** Odoo's 12-month discount for initial users. Homebase "6 months free Payroll & Plus" with Payroll. 7shifts "3 months of Payroll free". Homebase "Save 20%" and 7shifts "Save 10%" for annual billing.
- **Taxes:** Watchtower and FastWork prices exclude VAT. ACheckin says it charges no VAT. Foreign-SaaS tax treatment for a Vietnamese buyer was not checked.
- **Billing basis:** Deputy's per-user price is "billed upfront or monthly installments". When I Work's annual terms are not stated. Base requires 12 months' payment up front.
- **The "1.5–3.5M VND per man-day" band** that a search engine returned could not be traced to any named source, so it is excluded.
- **Implied-rate caveat:** the Phase 1 team md (194) are scaled from story md with the 2026-09-08 ratio (`02-delivery-roadmap.md` §7). They are not a bottom-up count.

## 6. Earlier chat figures, re-checked

| Earlier figure | Finding |
|---|---|
| iPOS HRM 15–30k/user/month | **Wrong model.** Flat tiers per month by headcount cap: HR 50 = 350k/month for ≤ 50 staff (≈ 8.75k/staff at 40). [S1] |
| FastWork 10–30k | **Partly right.** Chấm công 10k/user/month (minimum 10 users) + setup fee; HRM+ 45k. No 30k plan. [S3] |
| ACheckin 20–30k | **Understated.** 25k / 40k / 49k per employee/month. [S5] |
| Tanca 15–60k | **Unverifiable.** No per-user price is published now: Free (no scheduling), Lifetime = contact sales, AI add-on from 647k/month. [S6] |
| MISA AMIS ~14–70k | **Not confirmed.** HRM bundle at the 40-staff tier = 35k (Standard) / 50k (Professional) per staff per month; MISA's own estimate for Chấm công alone is 10–15k. [S8, S9] |
| Base Checkin 25–60k | **Unverifiable.** No Checkin price is published. Sibling Base apps are tiered per app (450k ≤ 30 / 900k ≤ 60 accounts per month, 12-month minimum). [S10, S12, S13] |
| 7shifts $39.99 / $79.99 / $134.99 | **Correct, but these are annual-billing prices** (monthly: $44.99 / $89.99 / $149.99). Essentials caps at 30 employees, and the service is US/Canada only. [S14, S15] |
| Homebase $30 / $70 / $120 | **Correct as monthly billing.** Annual: $24 / $56 / $96. [S18] |
| Sling $2–4/user | Correct (monthly). Annual $1.70 / $3.40; free up to 30 users. [S20] |
| When I Work $2.5–8/user | Correct. [S21] |
| Deputy $5–9/user | Correct; also a $30/month minimum on monthly plans. [S22] |
| Odoo SEA ~$13.5–20.4/user | **These are the Custom plan's prices.** Standard is $8.95 yearly / $11.20 monthly ($7.25 / $9.10 discounted for the first 12 months). One App Free is $0. [S26] |

## Sources

All checked 2026-10-11.

- [S1] iPOS.vn, iPOS HRM (VI): https://ipos.vn/san-pham/phan-mem-quan-tri-nhan-su-ipos-hrm/
- [S2] iPOS.vn, iPOS HRM (EN): https://ipos.vn/en/san-pham/phan-mem-quan-tri-nhan-su-ipos-hrm/
- [S3] FastWork, Bảng giá: https://fastwork.vn/bang-gia/
- [S5] ACheckin, Bảng giá: https://acheckin.vn/bang-gia
- [S6] Tanca, Pricing (VI): https://tanca.io/vi/pricing
- [S7] MISA AMIS, Bảng giá Phần mềm Nhân sự AMIS HRM: https://amis.misa.vn/bang-gia-bo-giai-phap-hrm/
- [S8] MISA AMIS, price script loaded by S7: https://amis.misa.vn/sites/amis/js/pages/bao-gia-hrm-v2.js
- [S9] MISA AMIS, Bảng báo giá AMIS chấm công (updated 2026-10-02): https://amis.misa.vn/98295/gia-phan-mem-misa-amis-cham-cong/
- [S10] Base.vn, Base Checkin: https://base.vn/checkin (and https://base.vn/app/checkin)
- [S11] Base.vn, Base Schedule: https://base.vn/app/schedule
- [S12] Base.vn, Base Payroll pricing: https://base.vn/payroll/pricing
- [S13] Base.vn, Base Timeoff pricing: https://base.vn/timeoff/pricing
- [S14] 7shifts, Pricing: https://www.7shifts.com/pricing/
- [S15] 7shifts, Terms of Service §17 "International Use": https://www.7shifts.com/terms-of-use-and-terms-of-service/
- [S16] 7shifts KB, Language Support: https://kb.7shifts.com/hc/en-us/articles/4417519528211-Language-Support
- [S17] 7shifts KB, Availability Company Settings: https://kb.7shifts.com/hc/en-us/articles/33770703246099-Availability-Company-Settings
- [S17b] 7shifts KB, Activity Log: https://kb.7shifts.com/hc/en-us/articles/4417513587347-Activity-Log
- [S18] Homebase, Pricing (including its schema.org offer data: "billed monthly" / "billed annually"): https://www.joinhomebase.com/pricing
- [S19] Homebase Support, Countries supported on Homebase (login wall; content per search-engine summary, 2026-10-11): https://support.joinhomebase.com/hc/en-us/articles/235021388-Countries-supported-on-Homebase
- [S20] Sling, Pricing: https://www.getsling.com/pricing
- [S21] When I Work, Pricing: https://wheniwork.com/pricing
- [S22] Deputy, Pricing: https://www.deputy.com/pricing
- [S24] Deputy Help, Manage different languages in the workplace: https://help.deputy.com/hc/en-au/articles/4621854798223-Manage-different-languages-in-the-workplace-with-Deputy
- [S25] Deputy Help, Rounding timesheets settings: https://help.deputy.com/hc/en-au/articles/4689509976463-Rounding-timesheets-settings-in-Deputy
- [S26] Odoo, Pricing (served to VN): https://www.odoo.com/pricing
- [S27] Vietcombank exchange rates, 2026-10-11 (USD sell 26,070; transfer 25,690): https://www.vietcombank.com.vn/api/exchangerates?date=2026-10-11
- [S28] ITviec, Vietnam IT Salary & Recruitment Market Report 2025–2026: https://itviec.com/report/vietnam-it-salary-and-recruitment-market
- [S29] TopDev, Báo cáo thị trường IT Việt Nam (latest 2024–2025): https://topdev.vn/page/bao-cao-it-viet-nam
- [S30] Saigon Technology, Báo giá phát triển phần mềm theo yêu cầu 2026 (2026-08-19): https://saigontechnology.com.vn/blog/bao-gia-phat-trien-phan-mem-theo-yeu-cau/
- [S31] Vina Software, Chi phí thiết kế phần mềm theo yêu cầu là bao nhiêu (2025-12-11): https://vinasoftware.com.vn/chi-phi-thiet-ke-phan-mem-theo-yeu-cau-la-bao-nhieu
- [S32] MekongSoft, Báo giá viết phần mềm theo yêu cầu (2025-02-25): https://mekongsoft.com.vn/tin-tuc/kien-thuc-kinh-doanh/bao-gia-viet-phan-mem-theo-yeu-cau-doanh-nghiep-can-chuan-bi-bao-nhieu
- Repo: `docs/client/04-solution-proposal-and-cost.md` (v3.0, 2026-09-29); `docs/backlog/01-epics-and-user-stories.md` §0; `docs/delivery/02-delivery-roadmap.md` §4, §7; `docs/prd/shift-scheduling-solution-requirements.md` v1.9; `CLAUDE.md`
