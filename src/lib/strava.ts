// lib/strava.ts

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_at: number;
	expires_in: number;
}

interface Activity {
	id: number;
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string;
	start_date: string;
	start_date_local: string;
	timezone: string;
	// Add more fields as needed
}

const getAccessToken = async (): Promise<string> => {
	const { STRAVA_REFRESH_TOKEN, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } =
		process.env;

	if (!STRAVA_REFRESH_TOKEN || !STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
		throw new Error("Missing Strava credentials");
	}

	const body = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: STRAVA_REFRESH_TOKEN,
		client_id: STRAVA_CLIENT_ID,
		client_secret: STRAVA_CLIENT_SECRET,
	});

	const response = await fetch("https://www.strava.com/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Failed to get access token: ${response.statusText} - ${errorText}`
		);
	}

	const data = (await response.json()) as TokenResponse;
	return data.access_token;
};

export const getActivities = async (): Promise<Activity[]> => {
	const accessToken = await getAccessToken();

	const response = await fetch(
		"https://www.strava.com/api/v3/athlete/activities",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Failed to get activities: ${response.statusText} - ${errorText}`
		);
	}

	const data = await response.json();
	return data as Activity[];
};
