// app/api/strava/authorize/route.ts

import { NextRequest, NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;

export async function GET() {
	const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(
		STRAVA_REDIRECT_URI!
	)}&response_type=code&scope=read,activity:read_all`;
	return NextResponse.redirect(stravaAuthUrl);
}
