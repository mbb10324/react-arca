import reactArcaLoop from "../assets/videos/react-arca.mp4";

export default function Arca() {
	return (
		<>
			<video data-testid="arca-video" src={reactArcaLoop} autoPlay loop muted />
			<h1 data-testid="arca-message">
				react-arca is designed to empower the developer. If you have any issues
				<br /> or want to see things added/removed, reach out to us on{" "}
				<a href="https://github.com/mbb10324/react-arca" target="_blank" rel="noopener noreferrer">
					github
				</a>
			</h1>
		</>
	);
}
