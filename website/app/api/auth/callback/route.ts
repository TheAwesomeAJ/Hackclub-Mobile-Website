import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    );
  }

  const clientId = process.env.NEXT_PUBLIC_HC_CLIENT_ID!;
  const clientSecret = process.env.HC_CLIENT_SECRET!;
  const redirectUri = process.env.NEXT_PUBLIC_HC_REDIRECT_URI!;

  const authHeader =
    'Basic ' +
    Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenRes = await fetch('https://auth.hackclub.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authHeader,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: 'Failed to obtain access token', tokenData },
      { status: 400 }
    );
  }

  const userRes = await fetch('https://auth.hackclub.com/oauth/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userRes.json();

  // 🔐 Create response + redirect
  const res = NextResponse.redirect(
    new URL('/?logged_in=1', req.url)
  );

  // Store minimal user info (safe, non-secret)
  res.cookies.set(
    'hc_user',
    JSON.stringify({
      sub: user.sub,
      name: user.name,
      nickname: user.nickname,
    }),
    {
      httpOnly: false, // readable on client
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }
  );

  return res;
}
