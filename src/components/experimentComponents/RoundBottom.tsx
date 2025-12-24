import { Button, NumberInput } from "@mantine/core";
import Circles from "./Circles";
import Slider from "./Slider";
import { Dispatch, SetStateAction } from "react";
import customStyles from "@/styles/Custom.module.css";
import PSR from "@/components/experimentComponents/PSR";
import NSR from "./NSR";

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
	// treatment: "QSR" | "BSR" | "PSR" | "QSR2" | "BSR2" | "PSR2";
	treatment:
		| "QSR"
		| "BSR"
		| "PSR"
		| "QSR2"
		| "BSR2"
		| "PSR2"
		| "NSR2"
		| "NSR"
		| "NIT"
		| "NIT2";
	chosenColor: "blue" | "red";
	setCurrentPoints: Dispatch<SetStateAction<number>>;
	pointsForCurrentRound: number;
	nextSubPhase: () => void;
}) {
	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}
	function setRatioForPSR(value: number | "") {
		setRedRatio(value === "" ? 0 : value);
	}
	const isPsr =
		treatment === "PSR" ||
		treatment === "PSR2" ||
		treatment === "NIT2" ||
		treatment === "NIT";
	const withInfo = treatment !== "NIT2" && treatment !== "NIT";
	const isNsr = treatment === "NSR2" || treatment === "NSR";
	const isBayesian =
		treatment === "QSR" ||
		treatment === "BSR" ||
		treatment === "NSR" ||
		treatment === "PSR";
	const isOurTreatment =
		treatment === "QSR" ||
		treatment === "BSR" ||
		treatment === "QSR2" ||
		treatment === "BSR2";

	return (
		<>
			{subPhase === "input" && isOurTreatment && (
				<Slider
					updatingFunction={updateSlider}
					value={redRatio}
					disabled={subPhase !== "input"}
				/>
			)}
			{subPhase === "input" && (isPsr || isNsr) && (
				<NumberInput
					label={`Kırmızı ${
						isBayesian ? "torbaya" : "bilyeye"
					} verdiğiniz ihtimal`}
					description="Yüzdelik değer"
					placeholder="0-100"
					onChange={setRatioForPSR}
					value={redRatio}
					disabled={subPhase !== "input"}
					style={{ width: "15ch", marginInline: "auto", marginBottom: "5ch" }}
				/>
			)}

			{(subPhase === "input" || subPhase === "result") && isOurTreatment && (
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
					isBayesian={treatment === "PSR"}
					information={withInfo}
					style={{
						gap: "10ch",
						justifyContent: "center",
					}}
				/>
			)}

			{(subPhase === "input" || subPhase === "result") && isNsr && (
				<NSR
					value={redRatio}
					showResult={subPhase === "result"}
					chosenColor={chosenColor}
					setCurrentPoints={setCurrentPoints}
					isBayesian={treatment === "NSR"}
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
