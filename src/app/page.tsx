import { topTracks } from "@/lib/spotify";

const HomePage = async () => {
	const tracks = await topTracks();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Top Tracks</h1>
			<ul>
				{tracks.map((track) => (
					<li key={track.name}>
						<h2>{track.name}</h2>
						<p>
							Artists: {track.artists.map((artist) => artist.name).join(", ")}
						</p>
						<p>Album: {track.album.name}</p>
						<img
							src={track.album.images[0].url}
							alt={track.album.name}
							width={100}
						/>
					</li>
				))}
			</ul>
		</main>
	);
};

export default HomePage;
