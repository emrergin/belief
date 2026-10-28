import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "@/styles/Circles.module.css";

function NSR({
	value,
	showResult,
	chosenColor,
	isBayesian,
	isQuestion = false,
	setCurrentPoints = false,
	style,
}: {
	value: number;
	showResult: boolean;
	chosenColor: "blue" | "red";
	isBayesian: boolean;
	isQuestion?: boolean;
	setCurrentPoints?: Dispatch<SetStateAction<number>> | false;
	style?: React.CSSProperties;
}) {
	const [chance, setChance] = useState<{
		ifRed: number;
		ifBlue: number;
	} | null>(null);
	const [chosenNumber, setChosenNumber] = useState<number | null>(null);

	useEffect(() => {
		const calculatePointsForRound = () => {
			const n1 = Math.random() * 100;
			setChosenNumber(n1);
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
			const ifRed = (10000 - (100 - value) ** 2) / 100;
			const ifBlue = (10000 - value ** 2) / 100;
			setChance({ ifRed, ifBlue });
			setChosenNumber(null);
		}
	}, [setCurrentPoints, showResult, value]);

	return (
		<div
			style={{
				marginInline: "auto",
				width: "max-content",
				marginBottom: "2ch",
			}}
		>
			{showResult && (
				<p className={chosenColor === "red" ? styles.redText : styles.blueText}>
					{isQuestion
						? "Cümle aslında"
						: isBayesian
						? "Bilgisayarın belirlediği torba"
						: "Çekilen bilyenin rengi"}{" "}
					:{" "}
					{isQuestion
						? chosenColor === "red"
							? "Yanlıştı"
							: "Doğruydu"
						: chosenColor === "red"
						? "Kırmızı"
						: "Mavi"}
				</p>
			)}
			{!isQuestion && (
				<p>
					Kırmızı {isBayesian ? "torbaya " : "bilyeye "}
					verdiğiniz ihtimal: {value}
				</p>
			)}
			{isQuestion && <p>Cümlenin yanlış olmasına verdiğiniz ihtimal:</p>}
			{chance?.ifRed !== undefined && !isQuestion ? (
				<p>
					{isBayesian ? "Torba " : "Bilye "} gerçekte{" "}
					<b className={styles.redText}>kırmızı</b>ysa kazanma ihtimaliniz:{" "}
					{chance?.ifRed}
				</p>
			) : (
				<p>
					Cümle aslında
					<b className={styles.redText}>yanlış</b>tıysa kazanma ihtimaliniz:{" "}
					{chance?.ifRed}
				</p>
			)}
			{chance?.ifBlue !== undefined && !isQuestion ? (
				<p>
					{isBayesian ? "Torba " : "Bilye "} gerçekte{" "}
					<b className={styles.blueText}>mavi</b>yse kazanma ihtimaliniz:{" "}
					{chance?.ifBlue}
				</p>
			) : (
				<p>
					Cümle aslında
					<b className={styles.redText}>doğru</b>yduysa kazanma ihtimaliniz:{" "}
					{chance?.ifRed}
				</p>
			)}
			{showResult && chosenNumber && (
				<p>Bilgisayarın seçtiği sayı: {Math.round(chosenNumber * 100) / 100}</p>
			)}
		</div>
	);
}

export default NSR;
