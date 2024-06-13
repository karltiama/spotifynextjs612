// Define the type for the response from the token endpoint
interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
}

// Define the type for the response from the top tracks endpoint
interface Track {
	name: string;
	artists: { name: string }[];
	album: { name: string; images: { url: string }[] };
	// Add more fields as needed
}

const getAccessToken = async (): Promise<TokenResponse> => {
	const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

	if (!refresh_token) {
		throw new Error("Missing Spotify refresh token");
	}

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(
				`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
			).toString("base64")}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to get access token: ${response.statusText}`);
	}

	return response.json() as Promise<TokenResponse>;
};

export const topTracks = async (): Promise<Track[]> => {
	const { access_token } = await getAccessToken();

	const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to get top tracks: ${response.statusText}`);
	}

	const data = await response.json();
	return data.items as Track[];
};
