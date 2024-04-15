import { useState, useRef, Dispatch, SetStateAction } from "react";

import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";

import { Round as RoundT } from "@prisma/client";
import { DrawingT, Phase, SubTypeRound } from "@/utilities/types";
import { getDiceText } from "@/utilities/functions";
import RoundBottom from "./experimentComponents/RoundBottom";

function Round({
	bsr,
	arrayOfDraws,
	priors,
	aBlue,
	bBlue,
	phaseFunction,
	pointFunction,
	participantId,
	currentRound,
	roundFunction,
}: {
	bsr: boolean;
	arrayOfDraws: number[];
	priors: [number, number];
	aBlue: number;
	bBlue: number;
	phaseFunction: (p: Phase) => void;
	pointFunction: Dispatch<SetStateAction<number>>;
	participantId: string;
	currentRound: number;
	roundFunction: (r: number) => void;
}) {
	const [redRatio, setRedRatio] = useState(50);
	const [selectedBag, setSelectedBag] = useState<"blue" | "red">(
		Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red",
	);
	const roundData = useRef<Partial<RoundT>>({
		is_blue: selectedBag === "blue",
	});
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing",
	);
	const time = useRef(new Date());
	const [pointsForCurrentRound, setPointsForCurrentRound] = useState(0);

	const numberOfRounds = arrayOfDraws.length;
	const diceText = getDiceText(priors);

	function nextSubPhase() {
		if (subPhase === "input") {
			roundData.current = {
				...roundData.current,
				decision_time: Number(new Date()) - Number(time.current),
			};
			setSubPhase("result");
		} else {
			nextRound();
		}
	}

	function endDrawing(drawing: DrawingT) {
		roundData.current = {
			...roundData.current,
			...drawing,
		};
		setSubPhase("input");
	}

	async function generateNewRound(lastRound: Omit<RoundT, "id">) {
		await fetch("./api/round", {
			method: "POST",
			body: JSON.stringify(lastRound),
		});
	}

	function nextRound() {
		const lastRound: Omit<RoundT, "id"> = {
			...(roundData.current as SubTypeRound),
			participantId,
			chosen_probability: 100 - redRatio,
			reward: pointsForCurrentRound,
			round: currentRound + 1,
			round_parameter: arrayOfDraws[currentRound],
		};
		console.log(lastRound);
		generateNewRound(lastRound);
		pointFunction((p: number) => p + pointsForCurrentRound);

		if (currentRound < numberOfRounds - 1) {
			const newBag =
				Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red";
			setSelectedBag(newBag);
			setSubPhase("drawing");
			roundData.current = {
				...roundData.current,
				is_blue: newBag === "blue" ? true : false,
			};
			roundFunction(currentRound + 1);
			setRedRatio(50);
			time.current = new Date();
		} else {
			phaseFunction(Phase.Demographics);
		}
	}

	return (
		<div>
			<BagHolder
				aBlue={aBlue}
				bBlue={bBlue}
				diceText={diceText}
				showBalls={subPhase === "drawing"}
			/>
			<Drawing
				numberOfDraws={arrayOfDraws[currentRound]}
				numberofBlues={selectedBag === "blue" ? bBlue : aBlue}
				nextFunction={(d) => endDrawing(d)}
				fullView={subPhase === "drawing"}
				key={currentRound}
			/>
			<RoundBottom
				subPhase={subPhase}
				redRatio={redRatio}
				setRedRatio={setRedRatio}
				bsr={bsr}
				chosenCircle={selectedBag}
				pointsForCurrentRound={pointsForCurrentRound}
				setCurrentPoints={setPointsForCurrentRound}
				nextSubPhase={nextSubPhase}
			/>
		</div>
	);
}

export default Round;
