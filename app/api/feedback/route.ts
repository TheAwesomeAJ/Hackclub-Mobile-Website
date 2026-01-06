import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Missing code in query params' }, { status: 400 });
    }

    // Hack Club OAuth credentials from environment
    const clientId = process.env.HC_CLIENT_ID!;
    const clientSecret = process.env.HC_CLIENT_SECRET!;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

    // Exchange code for access token
    const tokenRes = await fetch('https://auth.hackclub.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: 'Failed to obtain access token', tokenData },
        { status: 400 }
      );
    }

    // Fetch user info
    const userRes = await fetch('https://auth.hackclub.com/oauth/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userRes.json();

    // userInfo contains slack_id, email, name, etc.
    // TODO: create session or cookie here
    return NextResponse.json({ user: userInfo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
