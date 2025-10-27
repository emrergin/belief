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
	const [ordered, setOrdered] = useState(false);
	let timeoutId: NodeJS.Timeout | null = null;

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
					setCurrentPoints(value < Math.min(n1, n2) ? 10000 : 0);
			} else {
				setCurrentPoints &&
					setCurrentPoints(value > Math.max(n1, n2) ? 10000 : 0);
			}
		};
		if (showResult) {
			calculatePointsForRound(value);
			timeoutId && clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setOrdered(true);
			}, 3000);
		}
		if (!showResult) {
			setRandomValues({ n1: 0, n2: 0 });
			setOrdered(false);
		}
	}, [setCurrentPoints, showResult, value]);

	return (
		<div className={styles.circleHolder} ref={parent} style={style}>
			<div>
				{[randomValues?.n1, randomValues?.n2, value]
					.filter((a) => a)
					.sort((a, b) => (ordered ? 0 : (a || 0) - (b || 0)))
					.map((v, i) => (
						<div
							key={i}
							style={{
								border: `${
									v === value && showResult ? 2 : 0
								}px solid ${chosenColor}`,
							}}
						>
							{v}
						</div>
					))}
			</div>
		</div>
	);
}

export default PSR;
