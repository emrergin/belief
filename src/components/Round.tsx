import { useState, useRef } from "react";
import styles from "@/styles/Circles.module.css";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

import { Button } from "@mantine/core";

import { Inter } from "next/font/google";
import { Round } from "@prisma/client";
import { DrawingT, Phase } from "@/state/types";
const inter = Inter({ subsets: ["latin"] });

interface SubTypeRound extends DrawingT{
	is_blue: boolean,
	decision_time: number
}

function Round({
	bsr,
	arrayOfDraws,
	priors,
	aBlue,
	bBlue,
	phaseFunction,
	pointFunction,
}: {
	bsr: boolean;
	arrayOfDraws: number[];
	priors: number[];
	aBlue: number;
	bBlue: number;
	phaseFunction: (p: Phase) => void;
	pointFunction: (p: number) => void;
}) {
	const [redRatio, setRedRatio] = useState(50);
	const [currentRound, setCurrentRound] = useState(1);
	const [selectedBag, setSelectedBag] = useState<0 | 1>(
		Math.random() < priors[0] / (priors[0] + priors[1]) ? 0 : 1
	);
	const roundData = useRef<Partial<Round>>({});
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
				decision_time: Number(new Date())-Number(time.current)

			}
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
		if (selectedBag === 0) {
			return (100 - redRatio) ** 2;
		} else {
			return redRatio ** 2;
		}
	}

	function nextRound() {
		const lastRound:Round ={
			...(roundData.current as SubTypeRound),
			// decision_time: 0,
			participantId: "0",
			id: crypto.randomUUID(),
			chosen_probability: 100-redRatio,
			// is_blue: selectedBag===0,
			reward:calculatePointsForRound() 		
		}
		console.log(lastRound);
		setPoint(calculatePointsForRound() + point);
		pointFunction(calculatePointsForRound() + point);

		if (currentRound < numberOfRounds) {
			const newBag =
				Math.random() < priors[0] / (priors[0] + priors[1]) ? 0 : 1;
			setSelectedBag(newBag);
			setSubPhase("drawing");
			roundData.current={
				...roundData.current,
				is_blue: newBag === 1 ? true : false,
			};
			setCurrentRound(currentRound + 1);
			setRedRatio(50);
			time.current = new Date();
		} else{
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
						numberofBlues={selectedBag === 0 ? bBlue : aBlue}
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
						<div
							className={
								customStyles.reward
							}
						>
							{`${calculatePointsForRound()} kazandınız.`}
						</div>
					)}

					<Button size="lg"
						className={
							styles.exp +
							" " +
							inter.className +
							" " +
							customStyles.navButton
						}
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
