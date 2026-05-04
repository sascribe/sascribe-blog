// Cloudflare Pages Function — POST /subscribe
// Subscribes email to Beehiiv (Sascribe newsletter platform)
// THEN fires a Resend welcome email immediately, bypassing Beehiiv automation
// (Beehiiv automation requires Scale plan $49/month to publish — using Resend as workaround)
// NOTE: This is the only Sascribe function that uses RESEND_API_KEY. Normally Resend is
// QR-Perks transactional only — this is a deliberate exception per 2026-05-03 session.

const PUB_ID = 'pub_df60cb42-4828-474d-8553-8092d9f0746b';

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

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: corsHeaders });
    }

    // Step 1: Subscribe to Beehiiv (adds to list, no welcome email from Beehiiv automation)
    const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false,  // Beehiiv automation blocked by Scale plan — Resend handles welcome
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

    // Step 2: Send welcome email via Resend (bypasses Beehiiv automation paywall)
    // qr-perks.com is the verified Resend domain. sascribe.com is not yet verified in Resend.
    // Using hello@qr-perks.com as sender until sascribe.com domain is verified.
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
      // Log but don't fail the subscription — Beehiiv subscribe succeeded
      console.error('Resend welcome email failed:', resendRes.status, JSON.stringify(resendData));
    } else {
      console.log('Welcome email sent via Resend:', resendData.id);
    }

    // Frontend will redirect to https://try.elevenlabs.io/25umn8melpnn on ok: true
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
