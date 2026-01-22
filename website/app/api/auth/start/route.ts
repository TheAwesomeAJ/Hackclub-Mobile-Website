import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientId = process.env.NEXT_PUBLIC_HC_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_HC_REDIRECT_URI!;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: redirectUri,
  });

  const authUrl = `https://auth.hackclub.com/oauth/authorize?${params.toString()}`;

  return NextResponse.redirect(new URL(authUrl));
}
