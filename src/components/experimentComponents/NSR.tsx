import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "@/styles/Circles.module.css";

function NSR({
	value,
	showResult,
	chosenColor,
	isBayesian,
	setCurrentPoints = false,
	style,
}: {
	value: number;
	showResult: boolean;
	chosenColor: "blue" | "red";
	isBayesian: boolean;
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
	style?: React.CSSProperties;
}) {
	const [chance, setChance] = useState<{
		ifRed: number;
		ifBlue: number;
	} | null>(null);

	useEffect(() => {
		const calculatePointsForRound = () => {
			const n1 = Math.random() * 100;
			if (chosenColor === "red" && chance?.ifRed !== undefined) {
				setCurrentPoints && setCurrentPoints(n1 < chance?.ifRed ? 10000 : 0);
			} else if (chosenColor === "blue" && chance?.ifBlue !== undefined) {
				setCurrentPoints && setCurrentPoints(n1 < chance?.ifBlue ? 10000 : 0);
			}
		};
		if (showResult) {
			calculatePointsForRound();
		}
		if (!showResult) {
			const ifRed = (1 - (100 - value) ** 2 / 10000) * 100;
			const ifBlue = (1 - value ** 2 / 10000) * 100;
			setChance({ ifRed, ifBlue });
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
							? "Bilgisayarın seçtiği torba"
							: "Seçilen bilyenin rengi"}{" "}
						: {chosenColor === "red" ? "Kırmızı" : "Mavi"}
					</p>
					<p>
						Kırmızı {isBayesian ? "torbaya " : "bilyeye "}
						verdiğiniz ihtimal: {value}
					</p>
					{chance?.ifRed !== undefined && (
						<p>
							{isBayesian ? "Torba " : "Bilye "} gerçekte{" "}
							<b className={styles.redText}>kırmızı</b>ysa kazanma ihtimaliniz:{" "}
							{chance?.ifRed}
						</p>
					)}
					{chance?.ifBlue !== undefined && (
						<p>
							{isBayesian ? "Torba " : "Bilye "} gerçekte{" "}
							<b className={styles.redText}>mavi</b>yse kazanma ihtimaliniz:{" "}
							{chance?.ifBlue}
						</p>
					)}
				</div>
			)}
		</>
	);
}

export default NSR;
