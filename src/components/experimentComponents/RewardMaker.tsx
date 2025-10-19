import { Dispatch, SetStateAction } from "react";
import Circles from "./Circles";

function RewardMaker({
	value,
	treatment,
	showResult,
	chooseColor,
	setCurrentPoints = false,
}: {
	value: number;
	treatment: "QSR" | "BSR" | "PSR" | "QSR2" | "BSR2" | "PSR2";
	showResult: boolean;
	chooseColor: "blue" | "red";
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
}) {
	return (
		<>
			{treatment === "QSR" ||
			treatment === "BSR" ||
			treatment === "QSR2" ||
			treatment === "BSR2" ? (
				<Circles
					bsr={treatment === "BSR" || treatment === "BSR2"}
					value={value}
					showResult={showResult}
					chooseCircle={chooseColor}
					setCurrentPoints={setCurrentPoints}
					style={{
						gap: "10ch",
						justifyContent: "center",
					}}
				/>
			) : (
				<p>PLACEHOLDER</p>
			)}
		</>
	);
}

export default RewardMaker;
