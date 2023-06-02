import { Phase } from "@/utilities/types";
import { Button } from "@mantine/core";

const stairPatienceMap = new Map();
stairPatienceMap.set(62, [50, 74]);
stairPatienceMap.set(50, [45, 56]);
stairPatienceMap.set(74, [68, 81]);
stairPatienceMap.set(45, [42, 48]);
stairPatienceMap.set(56, [53, 59]);
stairPatienceMap.set(68, [65, 71]);
stairPatienceMap.set(81, [77, 84]);
stairPatienceMap.set(42, [41, 44]);
stairPatienceMap.set(48, [46, 49]);
stairPatienceMap.set(53, [52, 54]);
stairPatienceMap.set(59, [57, 60]);
stairPatienceMap.set(65, [63, 66]);
stairPatienceMap.set(71, [69, 72]);
stairPatienceMap.set(77, [76, 79]);
stairPatienceMap.set(84, [82, 86]);

function StairPatience({ setSubphase }: { setSubphase: (p: Phase) => void }) {
	return (
		<div>
			<p>stairpatience</p>
			<Button
				onClick={() => setSubphase(Phase.End)}
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

export default StairPatience;
