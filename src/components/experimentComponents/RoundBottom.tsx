import { Button } from "@mantine/core";
import Circles from "./Circles";
import Slider from "./Slider";
import { Dispatch, SetStateAction } from "react";
import customStyles from "@/styles/Custom.module.css";

function RoundBottom({
	subPhase,
	redRatio,
	setRedRatio,
	bsr,
	chosenCircle,
	setCurrentPoints,
	pointsForCurrentRound,
	nextSubPhase,
}: {
	subPhase: "result" | "input" | "drawing";
	redRatio: number;
	setRedRatio: (value: SetStateAction<number>) => void;
	bsr: boolean;
	chosenCircle: "blue" | "red";
	setCurrentPoints: Dispatch<SetStateAction<number>>;
	pointsForCurrentRound: number;
	nextSubPhase: () => void;
}) {
	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}

	return (
		<>
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
					chooseCircle={chosenCircle}
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
