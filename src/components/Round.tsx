import { useState, useRef } from "react";
// import styles from "@/styles/Circles.module.css";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

import { Button } from "@mantine/core";

import { Round } from "@prisma/client";
import { DrawingT, Phase } from "@/utilities/types";

interface SubTypeRound extends DrawingT {
	is_blue: boolean;
	decision_time: number;
}

function Round({
	bsr,
	arrayOfDraws,
	priors,
	aBlue,
	bBlue,
	phaseFunction,
	pointFunction,
	participantId,
}: {
	bsr: boolean;
	arrayOfDraws: number[];
	priors: number[];
	aBlue: number;
	bBlue: number;
	phaseFunction: (p: Phase) => void;
	pointFunction: (p: number) => void;
	participantId: string;
}) {
	const [redRatio, setRedRatio] = useState(50);
	const [currentRound, setCurrentRound] = useState(1);
	const [selectedBag, setSelectedBag] = useState<"blue" | "red">(
		Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red"
	);
	const roundData = useRef<Partial<Round>>({
		is_blue: selectedBag === "blue",
	});
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing"
	);
	const [point, setPoint] = useState(0);
	const time = useRef(new Date());

	const numberOfRounds = arrayOfDraws.length;

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
		// console.log("placeholder, nextSubPhase - Treatment.tsx");
	}

	function endDrawing(drawing: DrawingT) {
		roundData.current = {
			...roundData.current,
			...drawing,
		};
		setSubPhase("input");
	}

	function calculatePointsForRound() {
		if (selectedBag === "blue") {
			return (100 - redRatio) ** 2;
		} else {
			return redRatio ** 2;
		}
	}

	async function generateNewRound(lastRound: Omit<Round, "id">) {
		const respond = await fetch("/belief/api/round", {
			method: "POST",
			body: JSON.stringify(lastRound),
		});
	}

	function nextRound() {
		const lastRound: Omit<Round, "id"> = {
			...(roundData.current as SubTypeRound),
			// decision_time: 0,
			participantId: participantId,
			// id: crypto.randomUUID(),
			chosen_probability: 100 - redRatio,
			// is_blue: selectedBag===0,
			reward: calculatePointsForRound(),
			round: currentRound,
		};
		console.log(lastRound);
		generateNewRound(lastRound);
		setPoint(calculatePointsForRound() + point);
		pointFunction(calculatePointsForRound() + point);

		if (currentRound < numberOfRounds) {
			const newBag =
				Math.random() < priors[0] / (priors[0] + priors[1])
					? "blue"
					: "red";
			setSelectedBag(newBag);
			setSubPhase("drawing");
			roundData.current = {
				...roundData.current,
				is_blue: newBag === "blue" ? true : false,
			};
			setCurrentRound(currentRound + 1);
			setRedRatio(50);
			time.current = new Date();
		} else {
			phaseFunction(Phase.End);
			pointFunction(point);
		}
	}

	return (
		<div>
			{subPhase === "drawing" && (
				<>
					<BagHolder aBlue={aBlue} bBlue={bBlue} />
					<Drawing
						numberOfDraws={arrayOfDraws[currentRound]}
						numberofBlues={selectedBag === "blue" ? bBlue : aBlue}
						nextFunction={(d) => endDrawing(d)}
					/>
				</>
			)}
			{(subPhase === "input" || subPhase === "result") && (
				<>
					<Slider
						updatingFunction={updateSlider}
						value={redRatio}
						disabled={subPhase !== "input"}
					/>
					<Circles
						bsr={bsr}
						value={redRatio}
						showResult={subPhase === "result"}
						chooseCircle={selectedBag}
					/>

					{subPhase === "result" && (
						<div className={customStyles.reward}>
							{`${calculatePointsForRound()} kazandınız.`}
						</div>
					)}

					<Button
						size="lg"
						onClick={nextSubPhase}
						style={{ marginTop: "3ch" }}
					>
						{subPhase === "input" ? "Karar Verdim" : "Sonraki Tur"}
					</Button>
				</>
			)}
		</div>
	);
}

export default Round;
