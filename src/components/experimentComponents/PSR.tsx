import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "@/styles/Circles.module.css";
import autoAnimate from "@formkit/auto-animate";

function PSR({
	value,
	showResult,
	chosenColor,
	setCurrentPoints = false,
	style,
}: {
	value: number;
	showResult: boolean;
	chosenColor: "blue" | "red";
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
	style?: React.CSSProperties;
}) {
	const parent = useRef(null);
	const [randomValues, setRandomValues] = useState<{
		n1: number;
		n2: number;
	} | null>(null);
	const [isGreen, setIsGreen] = useState(false);

	function chooseRandomValues() {
		const n1 = Math.random() * 100;
		const n2 = Math.random() * 100;
		setRandomValues({ n1, n2 });
		return { n1, n2 };
	}

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	useEffect(() => {
		const calculatePointsForRound = (value: number) => {
			const { n1, n2 } = chooseRandomValues();
			if (chosenColor === "red") {
				setCurrentPoints &&
					setCurrentPoints(value > Math.min(n1, n2) ? 10000 : 0);
				if (value > Math.min(n1, n2)) {
					setIsGreen(true);
				}
			} else {
				setCurrentPoints &&
					setCurrentPoints(value < Math.max(n1, n2) ? 10000 : 0);
				if (value < Math.max(n1, n2)) {
					setIsGreen(true);
				}
			}
		};
		if (showResult) {
			calculatePointsForRound(value);
		}
		if (!showResult) {
			setRandomValues({ n1: 0, n2: 0 });
			setIsGreen(false);
		}
	}, [setCurrentPoints, showResult, value]);

	return (
		<>
			{showResult && (
				<div style={{ marginInline: "auto" }}>
					<p
						className={chosenColor === "red" ? styles.redText : styles.blueText}
					>
						Seçilen renk: {chosenColor === "red" ? "Kırmızı" : "Mavi"}
					</p>
					<p>
						Seçtiğiniz {chosenColor === "red" ? "kırmızı" : "mavi"} ihtimali{" "}
						{chosenColor === "red" ? value : 100 - value}
					</p>
				</div>
			)}
			<div
				className={styles.psrHolder}
				ref={parent}
				style={{ ...style, backgroundColor: isGreen ? "#5cb85c" : "white" }}
			>
				{[
					randomValues?.n1,
					randomValues?.n2,
					chosenColor === "red" ? value : 100 - value,
				]
					.filter((a) => a)
					.sort((a, b) => (a || 0) - (b || 0))
					.map((v) => (
						<div
							key={v}
							className={styles.psrBox}
							style={{
								border: `${
									v === value && showResult ? 2 : 0
								}px solid ${chosenColor}`,
							}}
						>
							{v === value ? v : Math.round((v || 0) * 100) / 100}
						</div>
					))}
			</div>
		</>
	);
}

export default PSR;
