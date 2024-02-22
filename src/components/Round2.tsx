import { useState, useRef, Dispatch, SetStateAction } from "react";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import customStyles from "@/styles/Custom.module.css";

import { Button } from "@mantine/core";

import { Round } from "@prisma/client";
import { Drawing2T, DrawingT, Phase } from "@/utilities/types";
import BagHolder2 from "./experimentComponents/BagHolder2";
import Drawing2 from "./experimentComponents/Drawing2";

interface SubTypeRound extends DrawingT {
	is_blue: boolean;
	decision_time: number;
}

function Round2({
	bsr,
	arrayOfBags,
	phaseFunction,
	pointFunction,
	participantId,
	currentRound,
	roundFunction,
}: {
	bsr: boolean;
	arrayOfBags: number[];
	phaseFunction: (p: Phase) => void;
	pointFunction: Dispatch<SetStateAction<number>>;
	participantId: string;
	currentRound: number;
	roundFunction: (r: number) => void;
}) {
	const [redRatio, setRedRatio] = useState(50);
	const numberOfRounds = arrayOfBags.length;
	const [currentColor, setCurrentColor] = useState<"blue" | "red">(
		Math.random() < arrayOfBags[currentRound] / 100 ? "blue" : "red",
	);

	const roundData = useRef<Partial<Round>>({});
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing",
	);
	const time = useRef(new Date());
	const [pointsForCurrentRound, setPointsForCurrentRound] = useState(0);

	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}

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

	function endDrawing(drawing: Drawing2T) {
		roundData.current = {
			...roundData.current,
			...drawing,
		};
		setSubPhase("input");
	}

	async function generateNewRound(lastRound: Omit<Round, "id">) {
		await fetch("./api/round", {
			method: "POST",
			body: JSON.stringify(lastRound),
		});
	}

	function nextRound() {
		const lastRound: Omit<Round, "id"> = {
			...(roundData.current as SubTypeRound),
			participantId,
			chosen_probability: 100 - redRatio,
			reward: pointsForCurrentRound,
			round: currentRound + 1,
		};
		console.log(lastRound);
		generateNewRound(lastRound);
		pointFunction((p: number) => p + pointsForCurrentRound);

		if (currentRound < numberOfRounds - 1) {
			const newBall =
				Math.random() < arrayOfBags[currentRound] / 100 ? "blue" : "red";
			setCurrentColor(newBall);

			setSubPhase("drawing");
			roundData.current = {
				...roundData.current,
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
			<>
				<BagHolder2
					aBlue={arrayOfBags[currentRound]}
					showBalls={subPhase === "drawing"}
				/>
				<Drawing2
					nextFunction={(d) => endDrawing(d)}
					fullView={subPhase === "drawing"}
					key={currentRound}
					result={subPhase === "result"}
					isBlue={currentColor === "blue"}
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
						chooseCircle={currentColor}
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
				)}
			</>
		</div>
	);
}

export default Round2;
