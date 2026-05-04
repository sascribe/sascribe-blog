// Cloudflare Pages Function — POST /subscribe
// Flow:
//   1. Validate email + honeypot (honeypot handled client-side; server ignores it)
//   2. Subscribe to Beehiiv with send_welcome_email:false
//   3. Fire BeMob conversion postback if cid is present (attribution)
//   4. Send welcome email via Resend from hello@sascribe.com
//
// Platform rules:
//   - Beehiiv receives ALL Sascribe subscriptions (source of truth for list)
//   - Resend sends welcome email as approved exception while Beehiiv Scale plan ($49/mo) is not active
//   - Sender MUST be hello@sascribe.com (sascribe.com verified in Resend)
//   - QR-Perks transactional emails use Resend separately — never cross-use
//
// AWAITING: Resend Pro plan ($20/mo) required to add sascribe.com as second domain
// TEMPORARY: Sending from hello@qr-perks.com until sascribe.com is verified in Resend
// TODO: Change from address to 'Sascribe <hello@sascribe.com>' after Resend plan upgrade

const PUB_ID = 'pub_df60cb42-4828-474d-8553-8092d9f0746b';
const BEMOB_POSTBACK_BASE = 'https://8gwxs.bemobtrcks.com/postback';

const WELCOME_EMAIL_SUBJECT = 'Your free guide — 5 ways creators are earning with AI voice in 2026';

const WELCOME_EMAIL_HTML = `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a; background: #fff;">
  <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">Here are 5 income streams creators are building right now with AI voice — specifically with ElevenLabs.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">01 — YouTube channel voiceovers</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Faceless YouTube is the fastest-growing creator model. No mic, no studio, no face required. ElevenLabs voices are indistinguishable from human narration. Finance, history, and tech explainer channels are doing this at scale. Write the script (or use AI), generate the voice, add stock footage, upload. Channels are hitting 100k+ views within 3 months.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">02 — Podcast narration</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Solo podcasts where you narrate pre-written episodes are big on Spotify and Apple Podcasts right now. Write a weekly deep-dive, generate audio in under 10 minutes, distribute. No recording sessions, no noise editing. Some creators run 3–4 shows simultaneously.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">03 — Audiobook creation</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Turn any book, ebook, or course into an audiobook and sell it on Gumroad, Lemon Squeezy, or ACX. Creator plan gives you 121,000 characters/month — roughly 2–3 hours of audio. Audiobooks command 2–3x the price of the written version.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">04 — Corporate training videos</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">Companies pay $500–$5,000 per training video — onboarding, compliance, product demos. The voiceover that used to cost $300 to record now costs ~$0.30 with ElevenLabs.</p>

  <p style="font-size: 17px; font-weight: bold; margin: 32px 0 8px;">05 — Language learning content</p>
  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">30+ languages with native-sounding voices. Language learners pay well for pronunciation guides and listening drills. Build a Gumroad product or YouTube channel in a language you don't even speak — just translate scripts and generate audio.</p>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0;" />

  <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
    <a href="https://try.elevenlabs.io/25umn8melpnn?utm_source=sascribe&utm_medium=email&utm_campaign=welcome" style="background: #1a1a1a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-family: -apple-system, sans-serif; font-size: 15px;">Try ElevenLabs Free →</a>
  </p>

  <p style="font-size: 13px; color: #888; margin: 24px 0 0; line-height: 1.5;">Creator plan is $11 your first month (normally $22). Start free, no credit card needed.<br>You're receiving this because you signed up at sascribe.com.</p>
</div>
`;

const WELCOME_EMAIL_TEXT = `Here are 5 income streams creators are building right now with AI voice — specifically with ElevenLabs.

01 — YouTube channel voiceovers
Faceless YouTube is the fastest-growing creator model. No mic, no studio, no face required. ElevenLabs voices are indistinguishable from human narration. Finance, history, and tech explainer channels are doing this at scale.

02 — Podcast narration
Solo podcasts where you narrate pre-written episodes are big on Spotify and Apple Podcasts right now. Write a weekly deep-dive, generate audio in under 10 minutes, distribute.

03 — Audiobook creation
Turn any book, ebook, or course into an audiobook and sell it on Gumroad, Lemon Squeezy, or ACX. Creator plan gives you 121,000 characters/month — roughly 2–3 hours of audio.

04 — Corporate training videos
Companies pay $500–$5,000 per training video. The voiceover that used to cost $300 to record now costs ~$0.30 with ElevenLabs.

05 — Language learning content
30+ languages with native-sounding voices. Language learners pay well for pronunciation guides and listening drills.

---
Try ElevenLabs Free: https://try.elevenlabs.io/25umn8melpnn?utm_source=sascribe&utm_medium=email&utm_campaign=welcome

Creator plan is $11 your first month (normally $22). Start free, no credit card needed.`;

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const cid = (body.cid || '').trim();  // BeMob click ID — passed from landing page URL ?cid=

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: corsHeaders });
    }

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
        utm_source: 'elevenlabs-landing',
        utm_medium: 'push-traffic',
        utm_campaign: 'elevenlabs-voice-guide',
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

    // Step 3: Send welcome email via Resend
    // TEMPORARY: sending from hello@qr-perks.com — sascribe.com domain requires Resend Pro plan ($20/mo)
    // TODO after plan upgrade: change from to 'Sascribe <hello@sascribe.com>'
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sascribe <hello@qr-perks.com>',
        to: [email],
        subject: WELCOME_EMAIL_SUBJECT,
        html: WELCOME_EMAIL_HTML,
        text: WELCOME_EMAIL_TEXT,
        tags: [
          { name: 'campaign', value: 'elevenlabs-welcome' },
          { name: 'source', value: 'push-traffic' },
        ],
      }),
    });

    const resendData = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      console.error('Resend welcome email failed:', resendRes.status, JSON.stringify(resendData));
    } else {
      console.log('Welcome email sent via Resend:', resendData.id);
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
