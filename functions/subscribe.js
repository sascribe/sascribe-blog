// Cloudflare Pages Function — POST /subscribe
// Flow:
//   1. Validate email
//   2. Subscribe to Beehiiv with send_welcome_email:false (Beehiiv = source of truth for list)
//   3. Fire BeMob conversion postback if cid is present (attribution)
//   4. Send welcome email via SMTP2GO (free 1k/mo, SMTP2GO_API_KEY in CF Pages env)
//
// Platform rules:
//   - Beehiiv receives ALL Sascribe subscriptions (source of truth for list)
//   - SMTP2GO sends welcome email from hello@sascribe.com (domain verified, DKIM signed)
//   - QR-Perks transactional emails use Resend separately — never cross-use
//
// DNS records on sascribe.com for SMTP2GO (added 2026-05-05):
//   SPF:        v=spf1 ... include:smtp2go.net ~all
//   DKIM:       s1079579._domainkey.sascribe.com  CNAME  dkim.smtp2go.net
//   Return path: em1079579.sascribe.com           CNAME  return.smtp2go.net
//
// NOTE: MailChannels free tier deprecated 2026-05 — returns 401 from all origins.
//   Old MailChannels DNS records (mailchannels._domainkey, _mailchannels) on sascribe.com are inert.

const PUB_ID = 'pub_df60cb42-4828-474d-8553-8092d9f0746b';
const BEMOB_POSTBACK_BASE = 'https://8gwxs.bemobtrcks.com/postback';

// Ebook — The AI Creator Playbook
const EBOOK_URL = 'https://sascribe.com/ai_creator_playbook.pdf';
const EBOOK_EMAIL_SUBJECT = 'Your AI Creator Playbook is ready — download link inside';
const EBOOK_EMAIL_HTML = `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a; background: #fff;">

  <p style="font-size: 13px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #f59e0b; margin: 0 0 6px;">Sascribe · Free Resource</p>
  <h1 style="font-family: -apple-system, sans-serif; font-size: 26px; font-weight: 800; line-height: 1.2; margin: 0 0 16px; color: #111;">The AI Creator Playbook is ready for you.</h1>

  <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px; color: #374151;">
    Six chapters. Six AI tools. Five income streams you can start in 2026 without a team,
    a studio, or a $10,000 budget.
  </p>

  <div style="background: #1a1a1a; border-radius: 8px; padding: 28px 24px; margin: 0 0 32px; text-align: center;">
    <p style="font-size: 14px; color: #9ca3af; margin: 0 0 12px;">Click to download your free copy</p>
    <a href="${EBOOK_URL}"
       style="display: inline-block; background: #f59e0b; color: #1a1a1a; padding: 16px 36px;
              text-decoration: none; border-radius: 6px; font-family: -apple-system, sans-serif;
              font-size: 17px; font-weight: 800; letter-spacing: .01em;">
      Download The AI Creator Playbook (PDF) →
    </a>
    <p style="font-size: 12px; color: #6b7280; margin: 12px 0 0;">PDF · 1.1MB · 6 chapters · No sign-in required</p>
  </div>

  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 12px; color: #374151;"><strong>What's inside:</strong></p>
  <ul style="margin: 0 0 28px; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.8;">
    <li>Ch. 1 — ElevenLabs: Turn words into cash with AI voice</li>
    <li>Ch. 2 — Synthesia: Create professional AI videos without a camera</li>
    <li>Ch. 3 — AdCreative.ai: Launch profitable ads without a design team</li>
    <li>Ch. 4 — Beehiiv: Build an email list that actually pays you</li>
    <li>Ch. 5 — CapCut: Edit professional video from your phone</li>
    <li>Ch. 6 — NordVPN: Protect the business you're building</li>
  </ul>

  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 32px; color: #374151;">
    Each chapter includes the exact workflow, realistic revenue timelines, and 3 recommended
    resources to go deeper. Start with Chapter 1 and build from there.
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    <strong style="color: #6b7280;">Sascribe</strong> | <a href="mailto:hello@sascribe.com" style="color: #9ca3af; text-decoration: none;">hello@sascribe.com</a>
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    1945 S Laurel Pl, Ontario CA 91762
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    You received this because you subscribed at sascribe.com.
    To unsubscribe, reply with UNSUBSCRIBE in the subject line.
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0; line-height: 1.6;">
    This email contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.
  </p>
</div>
`;
const EBOOK_EMAIL_TEXT = `The AI Creator Playbook — Download Link
=========================================

Download your free copy here:
${EBOOK_URL}

What's inside:
- Ch. 1 — ElevenLabs: Turn words into cash with AI voice
- Ch. 2 — Synthesia: Create professional AI videos without a camera
- Ch. 3 — AdCreative.ai: Launch profitable ads without a design team
- Ch. 4 — Beehiiv: Build an email list that actually pays you
- Ch. 5 — CapCut: Edit professional video from your phone
- Ch. 6 — NordVPN: Protect the business you're building

Each chapter includes the exact workflow, realistic revenue timelines, and 3 recommended resources.

=========================================
Sascribe | hello@sascribe.com
1945 S Laurel Pl, Ontario CA 91762

You received this because you subscribed at sascribe.com.
To unsubscribe, reply with UNSUBSCRIBE in the subject line.

This email contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.`;

const WELCOME_EMAIL_SUBJECT = 'Your free guide — 5 ways creators are earning with AI voice in 2026';

const WELCOME_EMAIL_HTML = `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a; background: #fff;">

  <!-- SECTION 1: GUIDE CONTENT -->
  <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">Here are 5 income streams creators are building right now with AI voice — specifically with ElevenLabs.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">01 — YouTube channel voiceovers</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">Faceless YouTube is the fastest-growing creator model right now. No mic, no studio, no face on camera. ElevenLabs voices are indistinguishable from professional human narration.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">The workflow: write the script (or generate it with AI), paste it into ElevenLabs, download the audio, layer it over stock footage in CapCut or DaVinci Resolve, upload. Finance explainers, historical documentaries, and tech breakdowns are the top-performing niches. Channels in these categories are regularly hitting 100k+ views within their first 3 months.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Monetization: YouTube AdSense once you hit 1,000 subscribers and 4,000 watch hours. Sponsorships after 10k. Some creators are running 3–4 channels simultaneously — one voice, multiple revenue streams.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">02 — Podcast narration</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">Solo podcasts where you narrate pre-written episodes are booming on Spotify and Apple Podcasts. No recording sessions, no noise editing, no microphone upgrade cycle.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">The workflow: write a 1,500–2,500 word deep-dive on a topic your audience cares about, generate the audio in under 10 minutes, upload directly to Spotify for Podcasters or Anchor. Consistent weekly episodes compound — your back catalog becomes a long-term traffic asset. Some creators run 3–4 shows simultaneously with distinct ElevenLabs voice profiles for each brand.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">03 — Audiobook creation</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">Any book, ebook, or course can become an audiobook in hours — not weeks. Sell on Gumroad, Lemon Squeezy, or submit to ACX (Amazon's audiobook marketplace, which distributes to Audible).</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">The Creator plan gives you 121,000 characters per month — roughly 2–3 hours of finished audio. A 20,000-word ebook turns into a 2.5-hour audiobook.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Pricing advantage: audiobooks command 2–3x the price of the written version. A $27 ebook becomes a $67–$97 audiobook. ACX royalties run 25–40% of list price. The production cost: a few dollars in ElevenLabs credits.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">04 — Corporate training videos</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">Companies pay $500–$5,000 per training video for employee onboarding, compliance training, and product demos. The voiceover that used to cost $200–$400 to record now costs roughly $0.30 with ElevenLabs.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">If you can use PowerPoint or Canva, you can build these. Find clients on Upwork, LinkedIn, or directly pitch HR departments at mid-size companies. Package it as a recurring service — companies update training annually. One client paying $1,500/quarter is $6,000/year.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">05 — Language learning content</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 8px;">ElevenLabs supports 30+ languages with native-sounding voices. Language learners pay well for pronunciation guides, vocabulary drills, and listening comprehension content.</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">The opportunity: you don't need to speak the language. Write scripts in English, use AI translation (DeepL or GPT-4), generate native-accent audio with ElevenLabs. Build a Gumroad product bundle or a YouTube channel in Spanish, French, or Mandarin. Language learning is a $60B industry and growing — the audience is massive and willing to spend.</p>

  <!-- SECTION 2: CTA -->
  <div style="background: #f9fafb; border: 2px solid #1a1a1a; border-radius: 8px; padding: 28px 24px; margin: 40px 0; text-align: center;">
    <p style="font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6b7280; margin: 0 0 10px;">The tool behind everything above</p>
    <p style="font-size: 18px; font-weight: 800; margin: 0 0 12px; line-height: 1.3;">ElevenLabs turns any text into professional AI voice in seconds.</p>
    <p style="font-size: 15px; color: #374151; margin: 0 0 24px; line-height: 1.5;">First month just <strong>$11</strong> (Creator plan, normally $22). Start free — no credit card required.</p>
    <a href="https://try.elevenlabs.io/25umn8melpnn?utm_source=sascribe&utm_medium=email&utm_campaign=welcome"
       style="display: inline-block; background: #1a1a1a; color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-family: -apple-system, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: .01em;">
      Try ElevenLabs Free →
    </a>
    <p style="font-size: 12px; color: #9ca3af; margin: 12px 0 0;">Creator plan · $11 first month · Cancel anytime</p>
  </div>

  <!-- SECTION 3: CAN-SPAM FOOTER -->
  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0;" />
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    <strong style="color: #6b7280;">Sascribe</strong> | <a href="mailto:hello@sascribe.com" style="color: #9ca3af; text-decoration: none;">hello@sascribe.com</a>
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    1945 S Laurel Pl, Ontario CA 91762
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 6px; line-height: 1.6;">
    You received this email because you subscribed at <a href="https://sascribe.com" style="color: #9ca3af;">sascribe.com</a>.
    To unsubscribe, reply to this email with UNSUBSCRIBE in the subject line.
  </p>
  <p style="font-size: 12px; color: #9ca3af; margin: 0; line-height: 1.6;">
    This email contains affiliate links. We may earn a commission if you click and purchase, at no additional cost to you.
  </p>

</div>
`;

const WELCOME_EMAIL_TEXT = `5 ways creators are earning with AI voice (ElevenLabs)
================================================================

01 — YouTube channel voiceovers
Faceless YouTube is the fastest-growing creator model right now. No mic, no studio, no face on camera. ElevenLabs voices are indistinguishable from professional human narration.

Workflow: write script → paste into ElevenLabs → download audio → layer over stock footage → upload. Finance, history, and tech channels are hitting 100k+ views in their first 3 months. Monetize via AdSense, then sponsorships. Some creators run 3–4 channels simultaneously.

02 — Podcast narration
Solo podcasts narrating pre-written episodes are booming. No recording sessions, no noise editing. Write a 1,500–2,500 word deep-dive, generate audio in 10 minutes, upload to Spotify. Back catalog compounds over time. Some creators run 3–4 distinct shows with different ElevenLabs voice profiles.

03 — Audiobook creation
Turn any book, ebook, or course into an audiobook in hours. Sell on Gumroad, Lemon Squeezy, or ACX (Amazon/Audible). Creator plan: 121,000 characters/month = roughly 2–3 hours of audio. Audiobooks command 2–3x the price of written versions. A $27 ebook becomes a $67–$97 audiobook. Production cost: a few dollars in ElevenLabs credits.

04 — Corporate training videos
Companies pay $500–$5,000 per training video. The voiceover that used to cost $200–$400 now costs ~$0.30 with ElevenLabs. Package it as a recurring service — companies update training annually. One client at $1,500/quarter = $6,000/year.

05 — Language learning content
ElevenLabs supports 30+ languages with native-sounding voices. You don't need to speak the language. Write in English, translate with DeepL or GPT-4, generate native audio. Build a Gumroad product bundle or YouTube channel. Language learning is a $60B industry with an audience willing to spend.

================================================================
THE TOOL BEHIND EVERYTHING ABOVE
================================================================

ElevenLabs turns any text into professional AI voice in seconds.

First month just $11 (Creator plan, normally $22). Start free — no credit card required.

Try ElevenLabs Free: https://try.elevenlabs.io/25umn8melpnn?utm_source=sascribe&utm_medium=email&utm_campaign=welcome

================================================================

Sascribe | hello@sascribe.com
1945 S Laurel Pl, Ontario CA 91762

You received this email because you subscribed at sascribe.com.
To unsubscribe, reply to this email with UNSUBSCRIBE in the subject line.

This email contains affiliate links. We may earn a commission if you click and purchase, at no additional cost to you.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const cid = (body.cid || '').trim();      // BeMob click ID — passed from landing page URL ?cid=
    const source = (body.source || '').trim(); // 'ebook' = AI Creator Playbook LP, '' = ElevenLabs LP

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: corsHeaders });
    }

    const isEbook = source === 'ebook';

    // Step 1: Subscribe to Beehiiv
    const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false,
        utm_source: isEbook ? 'ebook-lp' : 'elevenlabs-landing',
        utm_medium: isEbook ? 'organic' : 'push-traffic',
        utm_campaign: isEbook ? 'ai-creator-playbook' : 'elevenlabs-voice-guide',
      }),
    });

    const beehiivData = await beehiivRes.json().catch(() => ({}));

    if (!beehiivRes.ok && beehiivRes.status !== 409) {
      console.error('Beehiiv error:', beehiivRes.status, JSON.stringify(beehiivData));
      return new Response(JSON.stringify({ error: 'Subscription failed' }), { status: 500, headers: corsHeaders });
    }

    // Step 2: Fire BeMob postback if we have a click ID (attribution — tells BeMob email lead converted)
    if (cid && /^[a-zA-Z0-9_\-]{6,64}$/.test(cid)) {
      const bemobUrl = `${BEMOB_POSTBACK_BASE}?cid=${encodeURIComponent(cid)}&payout=0&status=approved`;
      fetch(bemobUrl).catch((err) => console.error('BeMob postback failed:', err));
      console.log('BeMob postback fired for cid:', cid);
    }

    // Step 3: Send welcome email via SMTP2GO
    // Ebook signups get the ebook delivery email with PDF download link.
    // ElevenLabs LP signups get the AI voice guide email.
    const emailSubject = isEbook ? EBOOK_EMAIL_SUBJECT : WELCOME_EMAIL_SUBJECT;
    const emailHtml    = isEbook ? EBOOK_EMAIL_HTML    : WELCOME_EMAIL_HTML;
    const emailText    = isEbook ? EBOOK_EMAIL_TEXT    : WELCOME_EMAIL_TEXT;

    const smtp2goRes = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: env.SMTP2GO_API_KEY,
        to: [email],
        sender: 'Sascribe <hello@sascribe.com>',
        subject: emailSubject,
        text_body: emailText,
        html_body: emailHtml,
      }),
    });

    const smtp2goData = await smtp2goRes.json().catch(() => ({}));
    if (smtp2goData?.data?.succeeded === 1) {
      console.log('Welcome email sent via SMTP2GO to:', email);
    } else {
      console.error('SMTP2GO error:', JSON.stringify(smtp2goData));
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('Subscribe function error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
