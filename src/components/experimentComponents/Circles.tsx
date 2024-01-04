import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "@/styles/Circles.module.css";
import autoAnimate from "@formkit/auto-animate";
import Circle from "./Circle";

function radiusOfWhiteCircle(type: "red" | "blue", value: number) {
	if (type === "red") {
		return (300 - Number(value) * 3) / 2;
	} else {
		return (300 - Number(100 - value) * 3) / 2;
	}
}

function Circles({
	value,
	bsr,
	showResult,
	chooseCircle,
	setCurrentPoints = false,
	style,
}: {
	value: number;
	bsr: boolean;
	showResult: boolean;
	chooseCircle: "blue" | "red";
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
	style?: React.CSSProperties;
}) {
	const parent = useRef(null);
	const [crossCoordinates, setCrossCoordinates] = useState<{
		x: number;
		y: number;
	} | null>(null);

	const [showBlue, showRed] = [
		!showResult || chooseCircle === "blue",
		!showResult || chooseCircle === "red",
	];

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	useEffect(() => {
		const calculatePointsForRound = (value: number) => {
			if (bsr) {
				const distance = chooseARandomPoint();
				let point =
					radiusOfWhiteCircle(chooseCircle, value) > distance ? 0 : 10000;

				setCurrentPoints && setCurrentPoints(point);
			} else {
				if (chooseCircle === "blue") {
					setCurrentPoints && setCurrentPoints(10000 - value ** 2);
				} else {
					setCurrentPoints && setCurrentPoints(10000 - (100 - value) ** 2);
				}
			}
		};
		if (showResult) {
			calculatePointsForRound(value);
		}
	}, [bsr, chooseCircle, setCurrentPoints, showResult, value]);

	function chooseARandomPoint() {
		const angle = Math.random() * Math.PI * 2;
		const dist = Math.sqrt(Math.random()) * 150;
		const x = Math.cos(angle) * dist + 150;
		const y = Math.sin(angle) * dist + 150;
		setCrossCoordinates({ x, y });
		return dist;
	}

	return (
		<div className={styles.circleHolder} ref={parent} style={style}>
			{showRed && (
				<Circle
					value={value}
					color={"red"}
					bsr={bsr}
					crossCoordinates={crossCoordinates}
					showResult={showResult}
				/>
			)}
			{showBlue && (
				<Circle
					value={100 - value}
					color={"blue"}
					bsr={bsr}
					crossCoordinates={crossCoordinates}
					showResult={showResult}
				/>
			)}
		</div>
	);
}

export default Circles;
