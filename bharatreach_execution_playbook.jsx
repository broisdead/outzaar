import { useState } from "react";

const sections = [
  {
    id: "bottleneck",
    label: "⚡ CRITICAL INTEL",
    title: "The 3 Things That Will Make or Break You",
    color: "#FF4444",
    content: `BIGGEST BOTTLENECK YOU WILL FACE FIRST:
Getting Indian SMBs and agencies to believe you're real. Cold LinkedIn outreach + no product + no case studies = zero trust. Indian B2B is RELATIONSHIP-FIRST. You will spend 70% of your first month fighting distrust, not building product.

FASTEST UNFAIR ADVANTAGE YOU CAN BUILD:
Get 2-3 agencies on WhatsApp. Deliver results manually. They become case studies + referral engines. One agency = access to 20-50 clients. This is distribution leverage that Apollo can never buy at ₹2,999/month pricing.

MOST LIKELY REASON CUSTOMERS ACTUALLY PAY:
NOT features. NOT AI. They pay because: "Apollo data is useless for India. I'm wasting ₹25K/month and still doing things manually. This person helped [Agency Name] book 15 meetings in 30 days and it costs less than one Apollo seat."

The payment trigger is: ROI-proven + India-specific + cheaper than current mess.`
  },
  {
    id: "day1",
    label: "🔥 NEXT 24 HOURS",
    title: "What You Do In The Next 24 Hours",
    color: "#FF6B00",
    content: `DO THIS IN ORDER — RIGHT NOW:

1. Open LinkedIn. Write this post and publish it TODAY:
"I'm building India's first WhatsApp-native outbound sales platform — built specifically for how Indian B2B actually works (not Apollo translated for India). If you or your agency runs cold outreach and is frustrated with bad Indian data, no WhatsApp support, or Apollo's pricing — DM me. I'm giving free 30-minute strategy calls to 10 founders this week. No pitch."

2. Build a list of 50 LinkedIn targets RIGHT NOW:
→ Digital agency founders (10–50 employees, "growth" or "performance" in bio)
→ B2B SaaS founders with sales teams
→ IT staffing heads at firms with 50–200 people
Use filters: India + "head of sales" OR "founder" OR "VP sales" + company size 11–200

3. Send 15 personalized LinkedIn DMs TODAY using this template:
"Hi [Name], noticed you're running outbound for [type of business]. Quick question — are you currently using Apollo or manual lists? Building something for the exact pain point of bad Indian data + no WhatsApp outreach. Would love 15 minutes to understand your workflow. No pitch, just research. Worth a call?"

4. Create a Notion page: "Customer Discovery Notes" — you will fill this with every conversation you have.

5. Set up Calendly for "20-min BharatReach Discovery Call"

DO NOT: Build anything. Write any code. Design a logo. Register a company today. This can wait. Conversations cannot.`
  },
  {
    id: "week1",
    label: "📅 WEEK 1 PLAN",
    title: "Day-by-Day: Your First 7 Days",
    color: "#FF9500",
    content: `DAY 1: Outreach blitz
→ Publish LinkedIn post (see above)
→ Send 15 DMs to ICP targets
→ Join 5 WhatsApp groups: B2B SaaS founders India, Digital agency owners India, Startup India communities, Export promotion groups
→ Introduce yourself in each group ONCE — no pitch, just "I'm researching Indian outbound sales tools, happy to share what I'm learning"

DAY 2: More outreach + setup
→ Send 20 more LinkedIn DMs
→ Reply to any responses from Day 1
→ Build landing page in Framer or Carrd (2 hours max): Headline + 3 bullet pain points + "Book a call" button. NO PRICING YET.
→ Setup a Brevo (free) or Mailchimp account for later

DAY 3: First discovery calls begin
→ Run every call that gets booked
→ ONLY ask questions — never pitch:
  "Walk me through how you currently find leads"
  "What tools do you use? What do you hate about them?"
  "If you had perfect Indian B2B data, what would that change?"
  "What's ONE thing that if fixed, would double your pipeline?"
  "What would you pay for a solution that fixes that?"
→ Write verbatim notes into Notion

DAY 4-5: Deep discovery
→ 10 DMs per day, ongoing
→ Run all booked calls (target: 5 calls by end of Day 5)
→ After each call — identify: What exact pain? What are they currently spending? What's the trigger to switch?
→ Start a "Pattern Doc" — what are the top 3 pain points you keep hearing?

DAY 6-7: Synthesize + offer
→ Review all discovery notes
→ Identify your 3 highest-pain, most-likely-to-pay prospects
→ Send each of them this message:
"Based on our call, I think I can help with [their specific pain]. I'm doing a 30-day pilot with 3 companies — you'd get [specific outcome: e.g., 100 qualified Indian leads + personalized email sequences + campaign setup] for ₹8,000. We do the work manually but you get real results. Interested?"
→ Target: 1 verbal YES by Day 7.`
  },
  {
    id: "priority",
    label: "🎯 PRIORITIES",
    title: "What to Prioritize (Ranked Brutally)",
    color: "#D4AC0D",
    content: `RANK ORDER — DO NOT REORDER THIS:

#1 — CUSTOMER DISCOVERY (Days 1-14, always running)
Non-negotiable. You cannot build for India without talking to 20+ Indian B2B buyers first. Every hour spent here saves 10 hours of building the wrong thing. Goal: 20 discovery calls in 2 weeks.

#2 — MANUAL SERVICE (Days 8-30)
Once you have 3 "yes, I'd pay" signals — STOP discovery and START delivering. Manually. Use Apollo + LinkedIn Sales Nav + ChatGPT + Mailchimp. Charge ₹8,000-12,000/month. This funds you while you validate AND teaches you what the actual product needs to do.

#3 — LEAD GENERATION (Ongoing, starting Day 1)
Your own outbound. 15-20 targeted LinkedIn DMs per day. This is how you fill your discovery call pipeline. No leads in = no customers = no data = dead startup.

#4 — AGENCY PARTNERSHIPS (Days 15-45)
One agency = 10-50x leverage. Identify 5 target agencies in Bangalore, Mumbai, Delhi. Offer: free 2-week pilot for their client campaign. If it works, convert to ₹12,000-15,000/month.

#5 — MVP BUILDING (Days 31-90)
Only after 3 paying customers. Build the simplest possible version: lead import + email sequence sender + basic tracking. Nothing more.

#6 — LINKEDIN BRANDING (Ongoing, 30 min/day)
1 post per day minimum. NOT about your product — about Indian cold outreach insights, mistakes, playbooks. Build the audience while building the product.

COMPLETELY IGNORE FOR NOW:
→ Full product development
→ Mobile app
→ WhatsApp automation (manual WhatsApp task is fine)
→ Your own scraping infrastructure
→ SEO / content marketing
→ Fundraising
→ Company registration (do this Week 2)
→ Logo / brand design beyond basics
→ PR / media
→ Hiring anyone before ₹50K MRR`
  },
  {
    id: "outsource",
    label: "👤 DO / OUTSOURCE",
    title: "What You Do vs. What You Outsource",
    color: "#27AE60",
    content: `YOU DO YOURSELF (non-negotiable):
→ All discovery calls
→ All LinkedIn outreach (authenticity cannot be outsourced)
→ All customer conversations + WhatsApp
→ Product decisions
→ Manual service delivery (enrichment, campaign setup) for first 3 customers
→ LinkedIn content writing
→ Pricing / positioning decisions
→ Agency relationship building

OUTSOURCE IMMEDIATELY when you have budget:
→ Landing page design: Framer template ₹0 / freelancer ₹5-10K
→ Company registration: Vakilsearch ₹5,000 one-time
→ Part-time developer (Month 2): ₹25,000-35,000/month for basic Next.js + Supabase MVP
→ Graphic design for case studies: Fiverr ₹500-1,500/task
→ Video editing (LinkedIn content): ₹1,000-2,000/video

NEVER OUTSOURCE UNTIL PRODUCT-MARKET FIT:
→ Sales
→ Content strategy
→ Customer success
→ Pricing / positioning

THE RULE: If it requires your personal relationship capital or domain judgment — you do it. If it's execution you've already specified — outsource it.`
  },
  {
    id: "offer",
    label: "💰 FIRST OFFER",
    title: "Your First Offer / Package",
    color: "#2980B9",
    content: `DO NOT SELL SOFTWARE. SELL OUTCOMES.

YOUR FIRST OFFER (Weeks 2-8):
"BharatReach Pilot — ₹8,000/month"

What they get:
✓ 100 verified, enriched Indian leads matching their exact ICP (city + industry + size)
✓ Contact data: email, phone, LinkedIn URL
✓ AI-written 3-step email sequence personalized to their offering
✓ Campaign setup and delivery via their email (you use Brevo/Mailchimp)
✓ Weekly report: opens, clicks, replies
✓ WhatsApp access to you for questions

What you actually do (backend):
→ Apollo free trial / basic plan to find leads
→ LinkedIn Sales Navigator for enrichment
→ ChatGPT for email sequence writing
→ Brevo (free) for campaign sending
→ Google Sheets for reporting
→ Your brain for ICP targeting

TIME COST PER CUSTOMER: 8-12 hours/month
MARGIN: ~95% (your time costs you nothing yet)
3 customers = ₹24,000 MRR. 5 customers = ₹40,000 MRR.

FOR AGENCIES (higher value, higher price):
"Agency Campaign Partner — ₹12,000-15,000/month"
→ Multi-client campaign management
→ 200-500 leads per client per month
→ Sequence templates per industry
→ Weekly campaign performance deck
→ Priority WhatsApp support

UPSELL TRIGGER: "We've been running this manually. I'm now building the platform version that automates this at 5x scale. You get founding member pricing — ₹7,999/month locked for life vs. future ₹19,999/month — and your exact workflow shapes what we build."

This converts manual service customers into platform customers.`
  },
  {
    id: "discovery",
    label: "📞 DISCOVERY CALLS",
    title: "Exact Discovery Call Script",
    color: "#8E44AD",
    content: `PRE-CALL PREP (5 min):
→ LinkedIn: Check their profile, company, recent posts
→ Note: Company size, what they sell, who their customers are
→ Note: Any hint of sales team or outreach activity

OPENING (30 seconds):
"Hey [Name], thanks for making time. I want to be straight — I'm building something for Indian B2B sales teams and I want to understand the problem before I build anything. So this is purely research, no pitch today. I just want to understand how you currently do outbound. Sound good?"

QUESTION FLOW (don't deviate from this order):

Round 1 — Current State:
"Walk me through your current lead generation process from zero. How do you actually find companies to reach out to?"
[Let them talk. Don't interrupt. Write everything.]

"What tools are you using today?"
[Note: Apollo, JustDial, IndiaMART, manual, WhatsApp groups, referrals]

"What does your typical week look like for sales outreach? How many hours?"

Round 2 — Pain:
"What's the most frustrating part of this process?"

"How good is your Indian contact data? What % of phone numbers actually work? Emails?"

"Have you tried Apollo or Clay? What was your experience?"

Round 3 — Impact:
"What would it mean for your business if you could reliably generate 20-30 qualified meetings per month?"

"How many SDRs or sales people are doing outreach right now? What's the cost?"

Round 4 — The Money Question (never skip this):
"If there was a tool that solved [repeat back their pain exactly], what would you be willing to pay per month? Roughly."
[They will lowball. That's OK. Note the number.]

"What would make you try something new vs. stick with your current process?"

CLOSING:
"This has been incredibly helpful. Based on what you've shared, I think [specific pain] is exactly what I'm building for. I'm doing a small paid pilot with 3 companies — you'd get [outcome]. Would you be interested in being one of the 3? It's ₹8,000 for the first month, and if we don't generate at least 50 qualified leads with verified contacts, I refund you."

AFTER THE CALL (within 1 hour):
→ Write up notes in Notion
→ Rate their fit (1-5) and likelihood to pay (1-5)
→ Send WhatsApp: "Great speaking with you. I'll follow up with specifics on the pilot by [day]. Thanks for your time."`
  },
  {
    id: "niche",
    label: "🏹 TARGET NICHE",
    title: "Which Niche to Target First",
    color: "#16A085",
    content: `TARGET THIS NICHE FIRST — NO DEBATE:

DIGITAL/GROWTH AGENCIES (10-50 employees, Bangalore/Mumbai/Delhi)

Why them, not B2B SaaS or IT firms:
✓ They ALREADY run outbound for clients — they need tools, not convincing
✓ One agency = 10-30 client campaigns = massive usage data for you
✓ They will refer other agencies (tight-knit community)
✓ They understand tools, pricing, ROI — shorter sales cycle
✓ Their pain is ACUTE: bad Apollo data, no WhatsApp, managing 10 client campaigns in Excel
✓ They become resellers/partners when you build the white-label feature

HOW TO FIND THEM:
LinkedIn search: "digital agency" OR "growth agency" founder/owner, India, 11-50 employees
Filter by: Bangalore, Mumbai, Pune, Delhi, Chennai
Look for: Agency pages with client testimonials, "performance marketing" in bio, B2B client work

YOUR PITCH TO AGENCIES:
"I help digital agencies run outbound campaigns for their B2B clients with better Indian data and less manual work. Are you currently managing outbound campaigns for your clients?"

SECONDARY TARGET (Month 2 onwards):
B2B SaaS startups (post-product, pre-PMF, 10-50 employees) — they have budget, tech understanding, and a clear need for pipeline

TERTIARY (Month 3+):
IT staffing / services firms — constant outbound need, price-insensitive if ROI is clear

DO NOT START WITH:
→ Export manufacturers (long sales cycle, harder to prove ROI quickly)
→ Solo founders (too price-sensitive, high churn)
→ Enterprise (6-month sales cycle will kill you)
→ EdTech (complex internal approval chains)`
  },
  {
    id: "metrics",
    label: "📊 TRACK WEEKLY",
    title: "Metrics to Track Every Week",
    color: "#E74C3C",
    content: `WEEKLY SCORECARD (review every Monday, 20 min):

SALES PIPELINE METRICS:
→ Discovery calls run this week (target: 5/week for first month)
→ "Yes I'd pay" signals received (target: 1-2/week)
→ Paid pilot proposals sent (track conversion: calls → proposals)
→ New paying customers signed
→ Current MRR (your North Star)

OUTREACH METRICS (your own prospecting):
→ LinkedIn DMs sent (target: 15-20/day)
→ DM → call conversion rate (target: 10-15%)
→ LinkedIn post impressions + comments (leading indicator of brand)

DELIVERY METRICS (for manual service customers):
→ Leads delivered per customer (target: 100/month)
→ Email open rate (target: 35-45% for warm Indian audiences)
→ Reply rate (target: 5-8%)
→ Meetings booked per campaign (target: 5-10)

HEALTH METRICS (Month 2 onwards):
→ Customer churn (who paused/cancelled this month)
→ NPS proxy: Did any customer proactively refer someone?
→ Time spent per customer/month (must go DOWN as you build systems)

MONTH 1 TARGETS:
Week 1: 10 DMs/day, 5 discovery calls booked
Week 2: 10 discovery calls run, 3 pilot proposals sent
Week 3: 1 paying customer, ₹8,000 MRR
Week 4: 3 paying customers, ₹24,000 MRR

THE ONE NUMBER THAT MATTERS BEFORE ₹1L MRR:
"Discovery calls run this week" — everything flows from conversations.`
  },
  {
    id: "mistakes",
    label: "💀 DEATH TRAPS",
    title: "Mistakes That Will Kill This Startup Early",
    color: "#C0392B",
    content: `FATAL MISTAKES — READ THIS BEFORE ANYTHING ELSE:

MISTAKE #1: Building before validating
Symptom: "I'll do discovery calls after I have something to show them"
Reality: You will build the wrong thing for 3 months, show it to customers, and hear "this isn't how we work." ₹3-5L wasted. 
FIX: 20 discovery calls first. No exceptions.

MISTAKE #2: Pricing too low to be taken seriously
Symptom: Charging ₹1,999/month to "get first customers"
Reality: Indian B2B buyers don't trust cheap. ₹1,999 signals "side project." ₹8,000-12,000 signals "serious tool."
FIX: Start at ₹8,000/month for managed service. Never go below ₹4,999 for any real customer.

MISTAKE #3: Targeting everyone
Symptom: "Our ICP is any company that does B2B sales in India"
Reality: You will have generic messaging, confusing positioning, and 0% conversion.
FIX: ONLY agencies in Month 1. Period.

MISTAKE #4: Building WhatsApp automation before product-market fit
Symptom: Getting excited about WhatsApp Business API, BSPs, compliance
Reality: 6 weeks to build, hard to maintain, and you don't even know if customers want it yet.
FIX: Offer WhatsApp as a manual task in Month 1. Build the automation in Month 4.

MISTAKE #5: Spending on LinkedIn ads before you have a case study
Symptom: "I'll run ₹10K ads to drive signups"
Reality: No case study = no trust = 0% conversion on cold ads in India.
FIX: Get 2 paying customers and a real result FIRST. Then use that result in ads.

MISTAKE #6: Hiring a developer before ₹50K MRR
Symptom: "I need a developer to build this properly"
Reality: You haven't validated the product yet. A developer will build something the wrong customer doesn't want.
FIX: Deliver manually. Use no-code. Hire dev only after 5 paying customers and clear product requirements.

MISTAKE #7: Not being personally accessible on WhatsApp
Symptom: "I'll use Intercom/Zendesk for support"
Reality: Indian B2B buyers EXPECT WhatsApp access to the founder. It's a trust signal, not a burden.
FIX: Put your WhatsApp on the pricing page. Respond within 4 hours. This closes more deals than any feature.

MISTAKE #8: Ignoring deliverability
Symptom: "We'll set up the email sending quickly"
Reality: Bad deliverability = low open rates = customers churn in Month 2 = dead business.
FIX: Mandatory email warmup for every customer from Day 1. Use ZeroBounce. Enforce 30-40 emails/mailbox/day limits.`
  },
  {
    id: "fake",
    label: "🎭 FAKE IT SMART",
    title: "What to Manually Fake Before Building",
    color: "#7D3C98",
    content: `THE RULE: If a customer can't see it's manual — it's not dishonest, it's smart validation. This is exactly how Zapier, Stripe, and Clearbit started.

FAKE THIS → AUTOMATE LATER:

FAKE #1: "The Platform"
Show: A clean Notion database or Airtable as your "lead workspace"
Reality: You're populating it manually from Apollo + LinkedIn
Automate when: You have 5 paying customers
Timeline: Month 3-4

FAKE #2: "AI-Generated Email Sequences"
Show: "Our AI writes your sequences in seconds"
Reality: You open ChatGPT, paste company info, prompt it to write the email, copy-paste into Brevo
Automate when: You've written 50+ sequences and see the patterns
Timeline: Month 2-3

FAKE #3: "Lead Enrichment Pipeline"
Show: "We automatically enrich leads from IndiaMART, LinkedIn, GST data"
Reality: You manually check IndiaMART, Apollo, LinkedIn for each lead
Automate when: You're spending 20+ hours/week on enrichment
Timeline: Month 3

FAKE #4: "Campaign Analytics Dashboard"
Show: A weekly Google Sheets report with open rates, replies, meetings booked
Reality: You're pulling this from Brevo's free analytics manually
Automate when: You build the MVP
Timeline: Month 2-3

FAKE #5: "ICP Scoring"
Show: "Our AI scored this lead 84/100 based on fit"
Reality: You're eyeballing it and assigning scores manually
Automate when: You have 200+ scored leads and clear patterns
Timeline: Month 4

THE MAGIC LINE YOU SAY TO CUSTOMERS:
"Right now we're in a managed-service phase where our team handles the research and setup. We're building the self-serve platform based on exactly what we learn from customers like you. Your workflows are literally shaping the product."

THIS IS TRUE. And it creates loyalty — they feel ownership.`
  },
  {
    id: "roi",
    label: "💡 HIGHEST ROI",
    title: "Highest ROI Activities for First Paying Customers",
    color: "#1ABC9C",
    content: `RANKED BY ROI (time invested → revenue generated):

RANK #1: Direct LinkedIn DM to agency founders [ROI: ∞]
Cost: 0 rupees, 30 min/day
Why: Highest quality, most targeted, relationship-building channel
Script: Short, curiosity-driven, specific to their situation
Target: 15-20/day = 1-2 calls/day = 1 customer/week at this rate

RANK #2: WhatsApp group warm outreach [ROI: Very High]
Cost: 0 rupees, 15 min/day
Why: Indian founders trust WhatsApp. Being helpful in groups = trust before pitch.
Rule: Provide value 5x before asking for anything. Never pitch in groups.
What to post: Answer questions about cold email, share data on Indian open rates, ask for opinions on your positioning.

RANK #3: Personal referrals from discovery calls [ROI: Very High]
Cost: 0 rupees, 2 min ask
At end of every discovery call: "Do you know 2-3 other founders who also run outbound? I'd love to talk to them — purely research."
30% of people will refer 1-2 people. This is free pipeline.

RANK #4: LinkedIn content (founder POV posts) [ROI: High, slower]
Cost: 0 rupees, 30 min/day
Format that converts: "I analyzed X Indian cold emails. Here's what 95% do wrong." → Offer to "send them the full breakdown" in comments → Collect DMs → Book calls.
The post IS the funnel. Don't post and hope — post and engage every comment within 2 hours.

RANK #5: Cold email to agency decision-makers [ROI: Medium]
Cost: Low (Brevo free tier + Apollo free), 2 hours setup
Once you have 1 case study: send 50 targeted cold emails/week to agencies with a specific result claim: "We helped [Agency X] book 12 meetings in 4 weeks for one of their SaaS clients. Open to a 15-min call about your client campaigns?"

DO NOT DO (Low ROI right now):
→ LinkedIn ads (no case study yet)
→ Google ads (wrong buyer intent stage)
→ ProductHunt launch (too early, no product)
→ Podcast outreach (slow, 3-month wait time)
→ SEO content (6-month payoff window)`
  },
  {
    id: "mrr",
    label: "🚀 PATH TO ₹1L MRR",
    title: "Fastest Path to ₹1L MRR",
    color: "#E67E22",
    content: `THE MATH FIRST:

Option A (slow): 34 customers at ₹2,999 = ₹1L MRR [too many customers to manage manually]
Option B (smart): 7 customers at ₹14,000 = ₹98K MRR [THIS IS THE PLAY]
Option C (fastest): 3 agencies at ₹30-35K = ₹1L MRR [ultimate leverage]

TARGET: 7 mid-tier customers at ₹12,000-15,000 each OR 3 agencies at ₹30,000-35,000 each.

THE 90-DAY PATH:

MONTH 1 — Manual Service (Target: ₹24K-40K MRR)
Week 1-2: 20 discovery calls, identify 5 best-fit prospects
Week 3-4: Convert 3-5 to paid pilot at ₹8,000-12,000/month
Deliver manually. Focus 100% on results. Results = case studies = everything else.

MONTH 2 — Agency Conversion (Target: ₹60K-80K MRR)
Take your best result from Month 1 → Use it in outreach to 20 agencies
Offer agencies ₹12,000-15,000/month for multi-client management
Sign 3-4 agencies. Each one represents 5-15x more leverage than individual customers.
Start building basic MVP (landing page → Airtable → Brevo → eventually Next.js frontend)

MONTH 3 — Platform Conversion (Target: ₹1L+ MRR)
Convert manual service customers to "platform early access" at ₹7,999-19,999/month
Use the case studies you've built to convert 5 more inbound leads
Agency referrals start kicking in (each agency refers 1 peer agency = 20% commission)

THE SINGLE FASTEST PATH TO ₹1L MRR:
Find 1 mid-size digital agency (20-50 employees, 15+ B2B clients). Offer them 2-week free pilot on their best client campaign. Deliver real results. Convert at ₹25,000-35,000/month for full multi-client access. Then ask them to introduce you to 3 other agencies they know.
One relationship done right = ₹30K MRR + 3 warm referrals = ₹1L MRR in 60 days.`
  },
  {
    id: "schedule",
    label: "⏰ DAILY SCHEDULE",
    title: "Your Daily Founder Schedule",
    color: "#2C3E50",
    content: `THE RULE: Until ₹1L MRR, 70% of your time is revenue-generating activity. Not building.

6:00 AM — 7:00 AM | DEEP WORK BLOCK
→ Write 1 LinkedIn post (30 min)
→ Review discovery call notes / prepare for today's calls (30 min)
No distractions. Phone on silent.

7:00 AM — 9:00 AM | OUTREACH BLOCK
→ Send 15-20 LinkedIn DMs to ICP targets
→ Reply to all LinkedIn comments from yesterday's post
→ Check and reply to WhatsApp messages from prospects
→ Follow up on any pending proposals
Target: Minimum 15 new outreach touchpoints before 9 AM.

9:00 AM — 12:00 PM | DISCOVERY CALLS / CUSTOMER WORK
→ Run all booked discovery calls (ideally 2-3/day in Month 1)
→ Take verbatim notes in Notion during calls
→ Customer delivery work: enriching leads, building sequences, checking campaigns
This is your MONEY TIME. Protect it.

12:00 PM — 1:00 PM | ADMIN + REVIEW
→ Send follow-up WhatsApps from morning calls
→ Update your pipeline tracker (even a simple Notion page)
→ Respond to any email / LinkedIn messages
→ Lunch

1:00 PM — 4:00 PM | DEEP WORK / BUILD BLOCK
→ Product thinking, roadmap, technical architecture (Month 1: skip, do more calls)
→ Writing case studies, refining positioning
→ When you have paying customers: manual service delivery for their campaigns

4:00 PM — 6:00 PM | CONTENT + COMMUNITY BLOCK
→ Engage in WhatsApp groups (answer questions, add value)
→ Comment on 5-10 LinkedIn posts from potential ICP targets
→ Write your LinkedIn post for tomorrow (schedule it for 7 AM)
→ LinkedIn DMs round 2 (reply to responses, send 10 more)

6:00 PM — 7:00 PM | REVIEW + PLAN
→ Update weekly metrics tracker
→ Note: What did I learn today? What worked? What didn't?
→ Plan tomorrow's calls and outreach targets
→ Respond to any remaining messages

THE NON-NEGOTIABLE RULES:
→ 15 LinkedIn DMs per day, every day, no exceptions
→ 2 discovery calls minimum per day in Month 1
→ 1 LinkedIn post per day
→ Reply to ALL WhatsApp messages within 4 hours (you are the support team)
→ Weekly review every Monday 8 AM: MRR, calls, pipeline

WHEN YOU HAVE 5 PAYING CUSTOMERS:
The schedule shifts. More delivery. Less discovery. Start hiring part-time developer.`
  },
  {
    id: "roadmap",
    label: "🗺️ 30-DAY ROADMAP",
    title: "Exact 30-Day Execution Roadmap",
    color: "#1A5276",
    content: `WEEK 1 (Days 1-7): DISCOVER — Conversations over everything

Day 1: LinkedIn post + 15 DMs + join 5 WhatsApp groups
Day 2: 20 DMs + landing page (Framer/Carrd, 2 hours max) + Calendly setup
Day 3: First discovery calls begin + 15 DMs
Day 4: 15 DMs + 2-3 discovery calls + update pattern notes
Day 5: 15 DMs + 2-3 discovery calls + refine ICP based on calls
Day 6: Review all discovery notes + write pattern summary + send 3 "pilot" warm-up messages
Day 7: Identify top 3 prospects + send pilot offers to each

CHECKPOINT: By Day 7, you should have: 8-10 discovery calls done, 3 pilot offers sent, 1 verbal interest.

WEEK 2 (Days 8-14): CONVERT — First paying customers

Day 8: Follow up on pilot offers (WhatsApp, not email) + 15 DMs + 2 calls
Day 9: 15 DMs + discovery calls + start content calendar (10 LinkedIn post ideas)
Day 10: 15 DMs + close first customer (send simple agreement, take payment via Razorpay link)
Day 11: Begin manual delivery for Customer #1 + 15 DMs + 1 discovery call
Day 12: Deliver first batch of 50 leads to Customer #1 + 15 DMs
Day 13: 15 DMs + follow up second and third pilot prospects
Day 14: Close Customers #2 and/or #3

CHECKPOINT: By Day 14, you should have: ₹8,000-24,000 MRR, 1-3 paying customers, clear product requirements starting to emerge.

WEEK 3 (Days 15-21): DELIVER + EXPAND

Day 15: Full campaign setup for all paying customers
Day 16: 15 DMs + 2 discovery calls (never stop prospecting) + campaign delivery
Day 17: LinkedIn post about Indian cold email insights (data-driven, shareable)
Day 18: Agency outreach begins — target 10 specific agencies with personalized approach
Day 19: Check campaign performance for existing customers + optimize
Day 20: Follow up with agencies + discover call with 1-2 agencies
Day 21: First weekly customer report sent to all customers (WhatsApp + email)

WEEK 4 (Days 22-30): SCALE MANUAL + START BUILDING

Day 22: Agency conversion focus — close 1 agency at ₹12,000-15,000/month
Day 23: Sign up for Apollo basic plan (₹3,500/month) — you now have budget
Day 24: 15 DMs + 2 calls + build Notion "product requirements" doc from customer feedback
Day 25: Write first customer case study (with their permission) — publish on LinkedIn
Day 26: Find freelance developer on Toptal/LinkedIn — scope basic MVP (1 conversation)
Day 27: Run customer feedback calls — "What do you need most right now?"
Day 28: Update positioning based on customer language — revise landing page messaging
Day 29: Post case study on LinkedIn (with result numbers) — this is your biggest content piece
Day 30: REVIEW: MRR, customers, pipeline, patterns learned, roadmap for Month 2

30-DAY SUCCESS CRITERIA:
✓ ₹24,000+ MRR (3 customers minimum)
✓ 20+ discovery calls completed
✓ 1 agency in pipeline or signed
✓ Clear top 3 ICP pain points documented
✓ 1 case study with real numbers
✓ LinkedIn following growing (target: 500+ new followers from content)

IF YOU DON'T HIT ₹24K MRR BY DAY 30:
→ Pricing is wrong (go higher, not lower — low price = low trust in India)
→ ICP is wrong (you're talking to the wrong people)
→ Value prop is unclear (your positioning needs sharper pain-language)
→ You didn't do enough calls (the answer is always: more conversations)`
  }
];

export default function BharatReachPlaybook() {
  const [active, setActive] = useState("bottleneck");
  const current = sections.find(s => s.id === active);

  return (
    <div style={{
      fontFamily: "'Courier New', Courier, monospace",
      background: "#0A0A0A",
      minHeight: "100vh",
      color: "#E8E8E8",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "#111",
        borderBottom: "2px solid #FF4444",
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div>
          <div style={{ fontSize: "11px", color: "#FF4444", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>
            BHARATREACH — STARTUP EXECUTION ADVISOR
          </div>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: "#FFFFFF", letterSpacing: "-0.5px" }}>
            RUTHLESS 30-DAY PLAYBOOK
          </div>
        </div>
        <div style={{
          background: "#FF4444",
          color: "#000",
          padding: "8px 16px",
          fontSize: "11px",
          fontWeight: "bold",
          letterSpacing: "2px"
        }}>
          TARGET: ₹1L MRR IN 90 DAYS
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: "220px",
          minWidth: "200px",
          background: "#111",
          borderRight: "1px solid #222",
          padding: "16px 0",
          overflowY: "auto"
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px 20px",
                background: active === s.id ? "#1A1A1A" : "transparent",
                border: "none",
                borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent",
                color: active === s.id ? "#FFFFFF" : "#888",
                fontSize: "12px",
                cursor: "pointer",
                letterSpacing: "0.5px",
                transition: "all 0.15s ease",
                lineHeight: "1.4"
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {current && (
            <div>
              <div style={{
                display: "inline-block",
                background: current.color,
                color: "#000",
                fontSize: "10px",
                fontWeight: "bold",
                letterSpacing: "3px",
                padding: "4px 10px",
                marginBottom: "12px",
                textTransform: "uppercase"
              }}>
                {current.label}
              </div>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "28px",
                borderBottom: `1px solid ${current.color}`,
                paddingBottom: "12px",
                lineHeight: "1.3"
              }}>
                {current.title}
              </h2>
              <div style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.9",
                fontSize: "13.5px",
                color: "#CCCCCC",
                maxWidth: "820px"
              }}>
                {current.content.split('\n').map((line, i) => {
                  const isBold = line.startsWith('MISTAKE') || line.startsWith('RANK') || line.startsWith('FAKE') || line.startsWith('MONTH') || line.startsWith('WEEK') || line.startsWith('Day ') || line.startsWith('TARGET:') || line.startsWith('THE RULE') || line.startsWith('YOU DO') || line.startsWith('OUTSOURCE') || line.startsWith('NEVER');
                  const isHeader = line.endsWith(':') && line.length < 60 && !line.startsWith('→') && !line.startsWith('✓');
                  const isHighlight = line.startsWith('→') || line.startsWith('✓');
                  
                  return (
                    <div key={i} style={{
                      color: isBold ? current.color : isHeader ? '#FFFFFF' : isHighlight ? '#B8D4FF' : '#CCCCCC',
                      fontWeight: isBold || isHeader ? 'bold' : 'normal',
                      marginBottom: isHeader ? '4px' : '0',
                      marginTop: (isBold || isHeader) && i > 0 ? '16px' : '0'
                    }}>
                      {line || '\u00A0'}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: "#111",
        borderTop: "1px solid #222",
        padding: "12px 28px",
        fontSize: "11px",
        color: "#555",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        <span>Blueprint v1.0 — Based on India Outbound SaaS Blueprint</span>
        <span style={{ color: "#FF4444" }}>Start today. Not tomorrow. Not after the MVP. TODAY.</span>
      </div>
    </div>
  );
}
