import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Circles.module.css";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

import { Inter } from "next/font/google";
import { Round } from "@prisma/client";
import { DrawingT, Phase } from "@/state/types";
const inter = Inter({ subsets: ["latin"] });

function Treatment({
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
	const [currentRoundData, setCurrentRoundData] = useState({});
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing"
	);
	const [selectedBag, setSelectedBag] = useState<0 | 1>(
		Math.random() < priors[1] / (priors[0] + priors[1]) ? 1 : 0
	);
	const [point, setPoint] = useState(0);

	const numberOfRounds = arrayOfDraws.length;

	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}

	function nextSubPhase() {
		if (subPhase === "input") {
			setSubPhase("result");
		} else {
			nextRound();
		}
		console.log("placeholder, nextSubPhase - Treatment.tsx");
	}

	function endDrawing(drawing: DrawingT) {
		setCurrentRoundData({
			...currentRoundData,
			...drawing,
		});
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
		if (currentRound < numberOfRounds) {
			setPoint(calculatePointsForRound() + point);
			pointFunction(calculatePointsForRound() + point);

			const newBag =
				Math.random() < priors[1] / (priors[0] + priors[1]) ? 1 : 0;
			setSelectedBag(newBag);
			setSubPhase("drawing");
			setCurrentRoundData({
				...currentRoundData,
				isBlue: newBag === 1 ? true : false,
			});
			setCurrentRound(currentRound + 1);
			setRedRatio(50);
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
						numberofBlues={selectedBag === 0 ? aBlue : bBlue}
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
								customStyles.reward + " " + inter.className
							}
						>
							{`${calculatePointsForRound()} kazandınız.`}
						</div>
					)}

					<button
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
					</button>
				</>
			)}
		
		</div>
	);
}

export default Treatment;
