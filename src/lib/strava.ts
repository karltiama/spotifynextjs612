// lib/strava.ts

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
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
}

export const getActivities = async (
	accessToken: string
): Promise<Activity[]> => {
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
