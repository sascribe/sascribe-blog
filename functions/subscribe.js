// Cloudflare Pages Function — POST /subscribe
// Subscribes email to Beehiiv (Sascribe newsletter platform)
// Beehiiv handles all email for Sascribe — welcome sequences, newsletters, follow-ups
// Resend is NOT used here — Resend is QR-Perks transactional only

const PUB_ID = 'pub_df60cb42-4828-474d-8553-8092d9f0746b';

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

    // Subscribe to Beehiiv — Beehiiv handles the welcome email sequence
    const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'elevenlabs-landing',
        utm_medium: 'push-traffic',
        utm_campaign: 'elevenlabs-voice-guide',
      }),
    });

    const beehiivData = await beehiivRes.json().catch(() => ({}));

    if (!beehiivRes.ok && beehiivRes.status !== 409) {
      // 409 = already subscribed, still a success for us
      console.error('Beehiiv error:', beehiivRes.status, JSON.stringify(beehiivData));
      return new Response(JSON.stringify({ error: 'Subscription failed' }), { status: 500, headers: corsHeaders });
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
