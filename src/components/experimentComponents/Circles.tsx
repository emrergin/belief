import { useRef } from "react";
import styles from "@/styles/Circles.module.css";

function Circles({
	value,
	bsr,
	showResult,
	chooseCircle,
}: {
	value: number;
	bsr: boolean;
	showResult: boolean;
	chooseCircle: "blue" | "red";
}) {
	const blackCross1 = useRef<HTMLDivElement>(null);
	const blackCross2 = useRef<HTMLDivElement>(null);

	if (
		bsr &&
		blackCross1.current != null &&
		blackCross2.current !== null &&
		showResult
	) {
		blackCross1.current!.style.display = `none`;
		blackCross2.current!.style.display = `none`;
	}

	function choosePoint() {
		if (!bsr) {
			return false;
		}
		const angle = Math.random() * Math.PI * 2;
		const dist = Math.random() * 150;
		const x = Math.cos(angle) * dist + 150;
		const y = Math.sin(angle) * dist + 150;
		blackCross1.current!.style.display = `none`;
		blackCross2.current!.style.display = `none`;
		if (chooseCircle === "blue") {
			blackCross1.current!.style.display = "block";
			blackCross1.current!.style.top = `${y}px`;
			blackCross1.current!.style.left = `${x}px`;
			blackCross1.current!.style.transform = `translate(-3px,-3px)`;
		} else {
			blackCross2.current!.style.display = "block";
			blackCross2.current!.style.top = `${y}px`;
			blackCross2.current!.style.left = `${x}px`;
			blackCross2.current!.style.transform = `translate(-${y}px,-${x}px)`;
		}
	}

	function addInvis(target: number) {
		//this ensures that no clipping remains in the full probabilities.
		if (value === target) {
			return ` ${styles.invis}`;
		} else {
			return "";
		}
	}

	function addCorrectMark(correct: "blue" | "red", number2?: number) {
		if (showResult) {
			if (
				(chooseCircle === correct && number2 === undefined) ||
				(chooseCircle === correct && value !== number2)
			) {
				return ` ${styles.correctAnswer}`;
			} else {
				// return ` ${styles.inCorrectAnswer}`;
				return ` ${styles.invis}`;
			}
		} else {
			return "";
		}
	}
	return (
		<div className={styles.circleHolder}>
			<div
				className={
					styles.bigCircle +
					" " +
					styles.blue +
					" " +
					styles.circle +
					addInvis(100) +
					addCorrectMark("blue")
				}
			>
				{bsr && (
					<div
						className={
							styles.circle +
							" " +
							styles.black +
							" " +
							styles.smallestCircle
						}
						ref={blackCross1}
					></div>
				)}
				<div
					className={
						styles.circle +
						" " +
						styles.white +
						" " +
						styles.smallCircle +
						addCorrectMark("blue", 0)
					}
					style={{
						width: `${value * 3}px`,
						height: `${value * 3}px`,
					}}
				></div>
			</div>
			<div
				className={
					styles.bigCircle +
					" " +
					styles.red +
					" " +
					styles.circle +
					" " +
					addInvis(0) +
					addCorrectMark("red")
				}
			>
				<div
					className={
						styles.circle +
						" " +
						styles.white +
						" " +
						styles.smallCircle +
						addCorrectMark("red", 100)
					}
					style={{
						width: `${300 - Number(value) * 3}px`,
						height: `${300 - Number(value) * 3}px`,
					}}
				>
					{bsr && (
						<div
							className={
								styles.circle +
								" " +
								styles.black +
								" " +
								styles.smallestCircle
							}
							ref={blackCross2}
						></div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Circles;
