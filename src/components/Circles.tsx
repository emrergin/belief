import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Circles.module.css";
import Slider from "./experimentComponents/Slider";

function Circles({ bsr }: { bsr: boolean }) {
	const [redRatio, setRedRatio] = useState(50);
	const whiteCircle1 = useRef<HTMLDivElement>(null);
	const whiteCircle2 = useRef<HTMLDivElement>(null);
	const blackCross1 = useRef<HTMLDivElement>(null);
	const blackCross2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		whiteCircle1.current!.style.width = `150px`;
		whiteCircle1.current!.style.height = `150px`;
		whiteCircle2.current!.style.width = `150px`;
		whiteCircle2.current!.style.height = `150px`;
		if (bsr) {
			blackCross1.current!.style.display = `none`;
			blackCross2.current!.style.display = `none`;
		}
	}, [bsr]);

	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
		whiteCircle1.current!.style.width = `${+e.target.value * 3}px`;
		whiteCircle1.current!.style.height = `${+e.target.value * 3}px`;
		whiteCircle2.current!.style.width = `${
			300 - Number(e.target.value) * 3
		}px`;
		whiteCircle2.current!.style.height = `${
			300 - Number(e.target.value) * 3
		}px`;
	}

	function choosePoint() {
		if (!bsr) {
			return false;
		}
		const angle = Math.random() * Math.PI * 2;
		const dist = Math.random() * 150;
		const x = Math.cos(angle) * dist + 150;
		const y = Math.sin(angle) * dist + 150;
		// console.log(angle, dist, x, y);
		blackCross1.current!.style.display = `none`;
		blackCross2.current!.style.display = `none`;
		const chooseCircle = 1;
		if (chooseCircle === 1) {
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
		if (redRatio === target) {
			return ` ${styles.invis}`;
		} else {
			return "";
		}
	}
	return (
		<div>
			<Slider updatingFunction={updateSlider} value={redRatio} />
			<div className={styles.circleHolder}>
				<div
					className={
						styles.bigCircle +
						" " +
						styles.blue +
						" " +
						styles.circle +
						addInvis(100)
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
							styles.smallCircle
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
						addInvis(0)
					}
				>
					<div
						className={
							styles.circle +
							" " +
							styles.white +
							" " +
							styles.smallCircle
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

			{bsr && (
				<button className={styles.exp} onClick={choosePoint}>
					Choose Point{" "}
				</button>
			)}
		</div>
	);
}

export default Circles;
