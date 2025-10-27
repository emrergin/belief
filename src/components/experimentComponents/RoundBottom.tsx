import { Button } from "@mantine/core";
import Circles from "./Circles";
import Slider from "./Slider";
import { Dispatch, SetStateAction } from "react";
import customStyles from "@/styles/Custom.module.css";
import PSR from "@/components/experimentComponents/PSR";

function RoundBottom({
	subPhase,
	redRatio,
	setRedRatio,
	treatment,
	chosenColor,
	setCurrentPoints,
	pointsForCurrentRound,
	nextSubPhase,
}: {
	subPhase: "result" | "input" | "drawing";
	redRatio: number;
	setRedRatio: (value: SetStateAction<number>) => void;
	treatment: "QSR" | "BSR" | "PSR" | "QSR2" | "BSR2" | "PSR2";
	chosenColor: "blue" | "red";
	setCurrentPoints: Dispatch<SetStateAction<number>>;
	pointsForCurrentRound: number;
	nextSubPhase: () => void;
}) {
	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}
	const isPsr = treatment === "PSR" || treatment === "PSR2";

	return (
		<>
			{subPhase === "input" && (
				<Slider
					updatingFunction={updateSlider}
					value={redRatio}
					disabled={subPhase !== "input"}
				/>
			)}

			{(subPhase === "input" || subPhase === "result") && !isPsr && (
				<Circles
					bsr={treatment === "BSR" || treatment === "BSR2"}
					value={redRatio}
					showResult={subPhase === "result"}
					chooseCircle={chosenColor}
					setCurrentPoints={setCurrentPoints}
					style={{
						gap: "10ch",
						justifyContent: "center",
					}}
				/>
			)}

			{(subPhase === "input" || subPhase === "result") && isPsr && (
				<PSR
					value={redRatio}
					showResult={subPhase === "result"}
					chosenColor={chosenColor}
					setCurrentPoints={setCurrentPoints}
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
	);
}

export default RoundBottom;
