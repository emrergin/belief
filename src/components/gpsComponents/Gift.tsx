import { Button } from "@mantine/core";

function Gift({ setSubphase }: { setSubphase: (p: string) => void }) {
	return (
		<div>
			<p>gif</p>
			<Button
				onClick={() => setSubphase("hypodonation")}
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

export default Gift;
