// app/api/strava/callback/route.ts

import { NextRequest, NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;

const exchangeCodeForToken = async (code: string) => {
	const response = await fetch("https://www.strava.com/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: STRAVA_CLIENT_ID!,
			client_secret: STRAVA_CLIENT_SECRET!,
			code,
			grant_type: "authorization_code",
			redirect_uri: STRAVA_REDIRECT_URI!,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Failed to exchange token: ${response.statusText} - ${errorText}`
		);
	}

	return response.json();
};

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return NextResponse.json(
			{ error: "Authorization code not provided" },
			{ status: 400 }
		);
	}

	try {
		const tokenData = await exchangeCodeForToken(code);
		// Here you would typically store the tokenData (access token, refresh token, etc.)
		// securely in your database or session.

		// For demonstration purposes, we'll just send it back in the response.
		return NextResponse.json(tokenData);
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}
