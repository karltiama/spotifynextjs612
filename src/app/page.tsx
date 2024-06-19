// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import StravaActivities from "@/components/strava-activities";

const HomePage = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const handleAuthorizeClick = () => {
		window.location.href = "/api/strava/authorize";
	};

	const fetchAccessToken = async () => {
		const response = await fetch("/api/strava/callback"); // Adjust this to your logic
		if (response.ok) {
			const data = await response.json();
			setAccessToken(data.access_token);
		} else {
			console.error("Failed to fetch access token");
		}
	};

	useEffect(() => {
		// Only fetch access token if there's a code in the URL
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has("code")) {
			fetchAccessToken();
		}
	}, []);

	if (!accessToken) {
		return (
			<div>
				<h1>Welcome to My Strava App</h1>
				<button onClick={handleAuthorizeClick}>Authorize with Strava</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Welcome to My Strava App</h1>
			<StravaActivities accessToken={accessToken} />
		</div>
	);
};

export default HomePage;
