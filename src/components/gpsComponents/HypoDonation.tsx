import { Button } from "@mantine/core";
import type { GpsData } from "../Gps";

function HypoDonation({ setSubphase }:  { setSubphase: (subsetOfGps: Partial<GpsData>, lastSubphase: boolean, p: string) => void  }) {
	return (
		<div>
			<p>hypo</p>
			<Button
				onClick={() => setSubphase({}, false,"stairpatience")}
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
