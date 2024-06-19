// components/Activities.tsx

import { useEffect, useState } from "react";

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

const Activities = () => {
	const [activities, setActivities] = useState<Activity[]>([]);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await fetch("/api/strava");
				if (!response.ok) {
					throw new Error(`Failed to fetch activities: ${response.statusText}`);
				}
				const data: Activity[] = await response.json();
				setActivities(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchActivities();
	}, []);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1>Strava Activities</h1>
			<ul>
				{activities.map((activity) => (
					<li key={activity.id}>
						<h2>{activity.name}</h2>
						<p>Distance: {activity.distance} meters</p>
						<p>Moving Time: {activity.moving_time} seconds</p>
						<p>Elapsed Time: {activity.elapsed_time} seconds</p>
						<p>Elevation Gain: {activity.total_elevation_gain} meters</p>
						<p>Type: {activity.type}</p>
						<p>Start Date: {activity.start_date}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Activities;
