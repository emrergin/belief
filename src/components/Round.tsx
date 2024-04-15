import { useState, useRef, Dispatch, SetStateAction } from "react";

import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";

import { Round as RoundT } from "@prisma/client";
import { Drawing2T, DrawingT, Phase, SubTypeRound } from "@/utilities/types";
import { getDiceText } from "@/utilities/functions";
import RoundBottom from "./experimentComponents/RoundBottom";
import BagHolder2 from "./experimentComponents/BagHolder2";
import Drawing2 from "./experimentComponents/Drawing2";

function Round({
	bsr,
	roundParameters,
	priors,
	aBlue,
	bBlue,
	phaseFunction,
	pointFunction,
	participantId,
	currentRound,
	roundFunction,
	type,
}:
	| {
			bsr: boolean;
			roundParameters: number[];
			priors: [number, number];
			aBlue: number;
			bBlue: number;
			phaseFunction: (p: Phase) => void;
			pointFunction: Dispatch<SetStateAction<number>>;
			participantId: string;
			currentRound: number;
			roundFunction: (r: number) => void;
			type: "bayesian";
	  }
	| {
			bsr: boolean;
			roundParameters: number[];
			priors?: undefined;
			aBlue?: undefined;
			bBlue?: undefined;
			phaseFunction: (p: Phase) => void;
			pointFunction: Dispatch<SetStateAction<number>>;
			participantId: string;
			currentRound: number;
			roundFunction: (r: number) => void;
			type: "guess";
	  }) {
	const [redRatio, setRedRatio] = useState(50);
	const numberOfRounds = roundParameters.length;

	let startingColor: "blue" | "red";
	if (type === "bayesian") {
		startingColor =
			Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red";
	} else {
		startingColor =
			Math.random() < roundParameters[currentRound] / 100 ? "blue" : "red";
	}

	const [currentColor, setCurrentColor] = useState<"blue" | "red">(
		startingColor,
	);

	const roundData = useRef<Partial<RoundT>>({
		is_blue: type === "bayesian" ? startingColor === "blue" : undefined,
	});
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing",
	);
	const time = useRef(new Date());
	const [pointsForCurrentRound, setPointsForCurrentRound] = useState(0);

	const diceText =
		type === "bayesian" ? getDiceText(priors) : (["", ""] as [string, string]);

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

	function endDrawing(drawing: DrawingT | Drawing2T) {
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
			round_parameter: roundParameters[currentRound],
		};
		console.log(lastRound);
		generateNewRound(lastRound);
		pointFunction((p: number) => p + pointsForCurrentRound);

		if (currentRound < numberOfRounds - 1) {
			if (type === "bayesian") {
				const newBag =
					Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red";
				setCurrentColor(newBag);
				setSubPhase("drawing");
				roundData.current = {
					...roundData.current,
					is_blue: newBag === "blue" ? true : false,
				};
			} else {
				const newBall =
					Math.random() < roundParameters[currentRound] / 100 ? "blue" : "red";
				setCurrentColor(newBall);
				setSubPhase("drawing");
				roundData.current = {
					...roundData.current,
				};
			}
			roundFunction(currentRound + 1);
			setRedRatio(50);
			time.current = new Date();
		} else {
			phaseFunction(Phase.Demographics);
		}
	}

	return (
		<div>
			{type === "bayesian" ? (
				<>
					<BagHolder
						aBlue={aBlue}
						bBlue={bBlue}
						diceText={diceText}
						showBalls={subPhase === "drawing"}
					/>
					<Drawing
						numberOfDraws={roundParameters[currentRound]}
						numberofBlues={currentColor === "blue" ? bBlue : aBlue}
						nextFunction={(d) => endDrawing(d)}
						fullView={subPhase === "drawing"}
						key={currentRound}
					/>
				</>
			) : (
				<>
					<BagHolder2
						aBlue={roundParameters[currentRound]}
						showBalls={subPhase === "drawing"}
					/>
					<Drawing2
						nextFunction={(d) => endDrawing(d)}
						fullView={subPhase === "drawing"}
						key={currentRound}
						result={subPhase === "result"}
						isBlue={currentColor === "blue"}
					/>
				</>
			)}
			<RoundBottom
				subPhase={subPhase}
				redRatio={redRatio}
				setRedRatio={setRedRatio}
				bsr={bsr}
				chosenCircle={currentColor}
				pointsForCurrentRound={pointsForCurrentRound}
				setCurrentPoints={setPointsForCurrentRound}
				nextSubPhase={nextSubPhase}
			/>
		</div>
	);
}

export default Round;
