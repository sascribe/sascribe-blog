// Cloudflare Pages Function — POST /subscribe
// Subscribes email to Beehiiv + sends welcome email via Resend

const PUB_ID = 'pub_df60cb42-4828-474d-8553-8092d9f0746b';

const WELCOME_EMAIL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

  <div style="text-align:center;margin-bottom:32px;">
    <p style="font-size:13px;color:#6b7280;margin:0;">Sascribe Creator Tools</p>
  </div>

  <h1 style="font-size:24px;font-weight:800;color:#f9fafb;margin:0 0 8px;line-height:1.2;">
    5 ways creators are earning with AI voice in 2026
  </h1>
  <p style="font-size:15px;color:#9ca3af;margin:0 0 32px;">Here's your free guide — no fluff, just what's working.</p>

  <hr style="border:none;border-top:1px solid #1f2937;margin:0 0 32px;">

  <div style="margin-bottom:28px;">
    <p style="font-size:13px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">01</p>
    <h2 style="font-size:17px;font-weight:700;color:#f9fafb;margin:0 0 8px;">YouTube channel voiceovers</h2>
    <p style="font-size:15px;color:#9ca3af;margin:0;line-height:1.6;">
      Faceless YouTube is the fastest-growing creator model right now. You don't need a mic, a studio, or to show your face.
      ElevenLabs voices are indistinguishable from human narration — finance, history, tech explainer channels are all doing this.
      You write the script (or use AI), generate the voice, add stock footage, upload. Channels are hitting 100k+ views within 3 months.
    </p>
  </div>

  <div style="margin-bottom:28px;">
    <p style="font-size:13px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">02</p>
    <h2 style="font-size:17px;font-weight:700;color:#f9fafb;margin:0 0 8px;">Podcast narration</h2>
    <p style="font-size:15px;color:#9ca3af;margin:0;line-height:1.6;">
      Solo podcasts where you narrate pre-written episodes are big on Spotify and Apple Podcasts right now.
      You write a weekly deep-dive on any topic, generate the audio in under 10 minutes, and distribute. No recording sessions, no editing noise.
      Some creators are running 3-4 shows this way simultaneously.
    </p>
  </div>

  <div style="margin-bottom:28px;">
    <p style="font-size:13px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">03</p>
    <h2 style="font-size:17px;font-weight:700;color:#f9fafb;margin:0 0 8px;">Audiobook creation</h2>
    <p style="font-size:15px;color:#9ca3af;margin:0;line-height:1.6;">
      If you've written a book, ebook, or course — you can turn it into an audiobook and sell it on Gumroad, Lemon Squeezy, or ACX.
      ElevenLabs Creator plan gives you 121,000 characters/month — that's roughly 2-3 hours of audio. A 20,000-word ebook takes about 45 minutes of audio.
      Audiobooks command 2-3x the price of the written version.
    </p>
  </div>

  <div style="margin-bottom:28px;">
    <p style="font-size:13px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">04</p>
    <h2 style="font-size:17px;font-weight:700;color:#f9fafb;margin:0 0 8px;">Corporate training videos</h2>
    <p style="font-size:15px;color:#9ca3af;margin:0;line-height:1.6;">
      B2B is where the real money is. Companies pay $500–$5,000 per training video and they need a lot of them — onboarding, compliance, product demos.
      If you can build slide decks or short videos, you can offer this as a service. The voiceover that used to cost $300 to record now costs you about $0.30 with ElevenLabs.
    </p>
  </div>

  <div style="margin-bottom:32px;">
    <p style="font-size:13px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;">05</p>
    <h2 style="font-size:17px;font-weight:700;color:#f9fafb;margin:0 0 8px;">Language learning content</h2>
    <p style="font-size:15px;color:#9ca3af;margin:0;line-height:1.6;">
      ElevenLabs supports 30+ languages with native-sounding voices. Language learners pay well for native-speaker audio — pronunciation guides, listening drills, shadowing content.
      You can build a Gumroad product or YouTube channel in a language you don't even speak, using ElevenLabs to generate the audio from translated scripts.
    </p>
  </div>

  <hr style="border:none;border-top:1px solid #1f2937;margin:0 0 32px;">

  <div style="background:#1a1a2e;border:1px solid #2d2d5e;border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;">
    <p style="font-size:14px;font-weight:700;color:#f9fafb;margin:0 0 8px;">Ready to start?</p>
    <p style="font-size:13px;color:#9ca3af;margin:0 0 16px;">Creator plan is $11 your first month (normally $22). No credit card needed to try free.</p>
    <a href="https://try.elevenlabs.io/25umn8melpnn" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">Try ElevenLabs Free →</a>
  </div>

  <p style="font-size:12px;color:#4b5563;text-align:center;margin:0;line-height:1.6;">
    You're receiving this because you subscribed at sascribe.com.<br>
    <a href="{{unsubscribe_url}}" style="color:#6b7280;">Unsubscribe</a> · Sascribe, Southern California
  </p>

</div>
</body>
</html>
`;

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

    // 1. Subscribe to Beehiiv
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
        utm_source: 'elevenlabs_landing',
        utm_medium: 'push_traffic',
        utm_campaign: 'elevenlabs_voice_guide',
      }),
    });

    if (!beehiivRes.ok) {
      const err = await beehiivRes.text();
      console.error('Beehiiv error:', err);
    }

    // 2. Send welcome email via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sascribe <hello@sascribe.com>',
        reply_to: 'sascribeblog@gmail.com',
        to: [email],
        subject: 'Your free guide: 5 ways creators are earning with AI voice in 2026',
        html: WELCOME_EMAIL_HTML,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
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
