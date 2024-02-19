import { useState, useRef, Dispatch, SetStateAction } from "react";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

import { Button } from "@mantine/core";

import { Round } from "@prisma/client";
import { DrawingT, Phase } from "@/utilities/types";
import { getDiceText } from "@/utilities/functions";
import BagHolder2 from "./experimentComponents/BagHolder2";

interface SubTypeRound extends DrawingT {
	is_blue: boolean;
	decision_time: number;
}

function Round2({
	bsr,
	aBlue,
	phaseFunction,
	pointFunction,
	participantId,
	currentRound,
	roundFunction,
}: {
	bsr: boolean;
	aBlue: number;
	phaseFunction: (p: Phase) => void;
	pointFunction: Dispatch<SetStateAction<number>>;
	participantId: string;
	currentRound: number;
	roundFunction: (r: number) => void;
}) {
	const [redRatio, setRedRatio] = useState(50);

	// const roundData = useRef<Partial<Round>>({
	// 	is_blue: selectedBag === "blue",
	// });
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing",
	);
	const time = useRef(new Date());
	const [pointsForCurrentRound, setPointsForCurrentRound] = useState(0);

	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}

	// function nextSubPhase() {
	// 	if (subPhase === "input") {
	// 		roundData.current = {
	// 			...roundData.current,
	// 			decision_time: Number(new Date()) - Number(time.current),
	// 		};
	// 		setSubPhase("result");
	// 	} else {
	// 		nextRound();
	// 	}
	// }

	// function endDrawing(drawing: DrawingT) {
	// 	roundData.current = {
	// 		...roundData.current,
	// 		...drawing,
	// 	};
	// 	setSubPhase("input");
	// }

	async function generateNewRound(lastRound: Omit<Round, "id">) {
		await fetch("./api/round", {
			method: "POST",
			body: JSON.stringify(lastRound),
		});
	}

	// function nextRound() {
	// 	const lastRound: Omit<Round, "id"> = {
	// 		...(roundData.current as SubTypeRound),
	// 		participantId,
	// 		chosen_probability: 100 - redRatio,
	// 		reward: pointsForCurrentRound,
	// 		round: currentRound + 1,
	// 	};
	// 	console.log(lastRound);
	// 	generateNewRound(lastRound);
	// 	pointFunction((p: number) => p + pointsForCurrentRound);

	// 	if (currentRound < numberOfRounds - 1) {
	// 		const newBag =
	// 			Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red";
	// 		setSelectedBag(newBag);
	// 		setSubPhase("drawing");
	// 		roundData.current = {
	// 			...roundData.current,
	// 			is_blue: newBag === "blue" ? true : false,
	// 		};
	// 		roundFunction(currentRound + 1);
	// 		setRedRatio(50);
	// 		time.current = new Date();
	// 	} else {
	// 		phaseFunction(Phase.Demographics);
	// 	}
	// }

	return (
		<div>
			<>
				<BagHolder2 aBlue={10} showBalls={subPhase === "drawing"} />
				{/* <Drawing
					numberOfDraws={arrayOfDraws[currentRound]}
					numberofBlues={selectedBag === "blue" ? bBlue : aBlue}
					nextFunction={(d) => endDrawing(d)}
					fullView={subPhase === "drawing"}
					key={currentRound}
				/>
				{subPhase === "input" && (
					<Slider
						updatingFunction={updateSlider}
						value={redRatio}
						disabled={subPhase !== "input"}
					/>
				)}
				{(subPhase === "input" || subPhase === "result") && (
					<Circles
						bsr={bsr}
						value={redRatio}
						showResult={subPhase === "result"}
						chooseCircle={selectedBag}
						setCurrentPoints={setPointsForCurrentRound}
						style={{
							gap: "10ch",
							justifyContent: "center",
						}}
					/>
				)}

				{subPhase === "result" && (
					<div className={customStyles.reward}>
						{`${pointsForCurrentRound} kazandınız.`}
					</div>
				)}
				{(subPhase === "input" || subPhase === "result") && (
					<Button
						size="lg"
						onClick={nextSubPhase}
						style={{
							marginTop: "13ch",
							display: "block",
							margin: "auto",
						}}
					>
						{subPhase === "input" ? "Karar Verdim" : "Sonraki Tur"}
					</Button>
				)} */}
			</>
		</div>
	);
}

export default Round2;
