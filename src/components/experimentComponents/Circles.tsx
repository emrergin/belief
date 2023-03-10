import { useState, useRef, useEffect } from "react";
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
	chooseCircle: 0 | 1;
}) {
	const whiteCircle1 = useRef<HTMLDivElement>(null);
	const whiteCircle2 = useRef<HTMLDivElement>(null);
	const blackCross1 = useRef<HTMLDivElement>(null);
	const blackCross2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		whiteCircle1.current!.style.width = `${value * 3}px`;
		whiteCircle1.current!.style.height = `${value * 3}px`;
		whiteCircle2.current!.style.width = `${300 - Number(value) * 3}px`;
		whiteCircle2.current!.style.height = `${300 - Number(value) * 3}px`;
		if (bsr) {
			blackCross1.current!.style.display = `none`;
			blackCross2.current!.style.display = `none`;
		}
	}, [value, bsr]);

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
		if (chooseCircle === 0) {
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

	function addCorrectMark(correct: number, number2?: number) {
		if (showResult) {
			if (
				(chooseCircle === correct && number2 === undefined) ||
				(chooseCircle === correct && value !== number2)
			) {
				return ` ${styles.correctAnswer}`;
			} else {
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
					addCorrectMark(0)
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
						addCorrectMark(0, 0)
					}
					ref={whiteCircle1}
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
					addCorrectMark(1)
				}
			>
				<div
					className={
						styles.circle +
						" " +
						styles.white +
						" " +
						styles.smallCircle +
						addCorrectMark(1, 100)
					}
					ref={whiteCircle2}
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
