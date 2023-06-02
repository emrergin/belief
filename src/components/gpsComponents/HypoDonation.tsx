import { Button } from "@mantine/core";

function HypoDonation({ setSubphase }: { setSubphase: (p: string) => void }) {
	return (
		<div>
			<p>hypo</p>
			<Button
				onClick={() => setSubphase("stairpatience")}
				size="md"
				style={{
					marginTop: "13ch",
					display: "block",
					margin: "auto",
				}}
			></Button>
		</div>
	);
}

export default HypoDonation;
