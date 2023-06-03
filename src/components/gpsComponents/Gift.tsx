import { Button } from "@mantine/core";
import type { GpsData } from "../Gps";

function Gift({ setSubphase }: { setSubphase: (subsetOfGps: Partial<GpsData>, lastSubphase: boolean, p: string) => void  }) {
	return (
		<div>
			<p>gif</p>
			<Button
				onClick={() => setSubphase({}, false, "hypodonation")}
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
