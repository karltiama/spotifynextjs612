// app/api/strava/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getActivities } from "@/lib/strava";

export async function GET() {
	try {
		const activities = await getActivities();
		return NextResponse.json(activities);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
