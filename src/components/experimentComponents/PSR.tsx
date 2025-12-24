import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "@/styles/Circles.module.css";
import autoAnimate from "@formkit/auto-animate";

function PSR({
	value,
	showResult,
	chosenColor,
	isBayesian,
	setCurrentPoints = false,
	information = true,
	style,
}: {
	value: number;
	showResult: boolean;
	chosenColor: "blue" | "red";
	isBayesian: boolean;
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
	information?: boolean;
	style?: React.CSSProperties;
}) {
	const parent = useRef(null);
	const [randomValues, setRandomValues] = useState<{
		n1: number;
		n2: number;
	} | null>(null);

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
			} else {
				setCurrentPoints &&
					setCurrentPoints(value < Math.max(n1, n2) ? 10000 : 0);
			}
		};
		if (showResult) {
			calculatePointsForRound(value);
		}
		if (!showResult) {
			setRandomValues({ n1: 0, n2: 0 });
		}
	}, [setCurrentPoints, showResult, value]);

	return (
		<>
			{showResult && (
				<div style={{ marginInline: "auto", width: "max-content" }}>
					<p
						className={chosenColor === "red" ? styles.redText : styles.blueText}
					>
						{isBayesian
							? "Bilgisayarın belirlediği torba"
							: "Çekilen bilyenin rengi"}{" "}
						: {chosenColor === "red" ? "Kırmızı" : "Mavi"}
					</p>
					<p>
						Kırmızı {isBayesian ? "torbaya " : "bilyeye "}
						verdiğiniz ihtimal: {value}
					</p>
					{information && (
						<p>
							Bilgisayarın seçtiği sayıların ilki:{" "}
							{Math.round((randomValues?.n1 || 0) * 100) / 100}
						</p>
					)}
					{information && (
						<p>
							Bilgisayarın seçtiği sayıların ikincisi:{" "}
							{Math.round((randomValues?.n2 || 0) * 100) / 100}
						</p>
					)}
					{chosenColor === "red" &&
						information &&
						"Tahmininiz bilgisayarın seçtiği sayıların en az birinden büyük" +
							(value >
							Math.min(
								randomValues?.n1 || Number.MAX_SAFE_INTEGER,
								randomValues?.n2 || Number.MAX_SAFE_INTEGER,
							)
								? "."
								: " değil.")}
					{chosenColor === "blue" &&
						information &&
						"Tahmininiz bilgisayarın seçtiği sayıların en az birinden küçük" +
							(value <
							Math.max(
								randomValues?.n1 || Number.MIN_SAFE_INTEGER,
								randomValues?.n2 || Number.MIN_SAFE_INTEGER,
							)
								? "."
								: " değil.")}
				</div>
			)}
		</>
	);
}

export default PSR;
