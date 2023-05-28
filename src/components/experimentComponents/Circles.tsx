import { useRef, useEffect } from "react";
import styles from "@/styles/Circles.module.css";
import autoAnimate from "@formkit/auto-animate";

function Circles({
	value,
	bsr,
	showResult,
	chooseCircle,
	style,
}: {
	value: number;
	bsr: boolean;
	showResult: boolean;
	chooseCircle: "blue" | "red";
	style?: React.CSSProperties;
}) {
	const parent = useRef(null);
	const [showBlue, showRed] = [
		!showResult || chooseCircle === "blue",
		!showResult || chooseCircle === "red",
	];
	// const [show,setShow] = useState([true,true]);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	function addInvis(target: number) {
		//this ensures that no clipping remains in the full probabilities.
		if (value === target) {
			return ` ${styles.invis}`;
		} else {
			return "";
		}
	}

	function addCorrectMark(
		colorOfThis: "blue" | "red",
		thresholdForSmallCircle?: number
	) {
		if (
			showResult &&
			((chooseCircle === colorOfThis &&
				thresholdForSmallCircle === undefined) ||
				(chooseCircle === colorOfThis &&
					value !== thresholdForSmallCircle))
		) {
			// if (
			// 	(chooseCircle === colorOfThis && thresholdForSmallCircle === undefined) ||
			// 	(chooseCircle === colorOfThis && value !== thresholdForSmallCircle)
			// ) {
			// return ` ${styles.correctAnswer}`;
			return "";
			// }
			// else {
			// 	return ` ${styles.invis}`;
			// }
		} else {
			return "";
		}
	}

	return (
		<div className={styles.circleHolder} ref={parent} style={style}>
			{showRed && (
				<div
					className={
						styles.bigCircle +
						" " +
						styles.red +
						" " +
						styles.circle +
						" " +
						addInvis(0)
						// +
						// addCorrectMark("red")
					}
				>
					<div
						className={
							styles.circle +
							" " +
							styles.white +
							" " +
							styles.smallCircle
							// +
							// addCorrectMark("red", 100)
						}
						style={{
							width: `${300 - Number(value) * 3}px`,
							height: `${300 - Number(value) * 3}px`,
						}}
					></div>
					<p className={styles.valueBox}>{value ** 2}</p>
				</div>
			)}
			{showBlue && (
				<div
					className={
						styles.bigCircle +
						" " +
						styles.blue +
						" " +
						styles.circle +
						addInvis(100)
						//  +
						// addCorrectMark("blue")
					}
				>
					<div
						className={
							styles.circle +
							" " +
							styles.white +
							" " +
							styles.smallCircle
							// +
							// addCorrectMark("blue", 0)
						}
						style={{
							width: `${value * 3}px`,
							height: `${value * 3}px`,
						}}
					></div>
					<p className={styles.valueBox}>{(100 - value) ** 2}</p>
				</div>
			)}
		</div>
	);
}

export default Circles;
