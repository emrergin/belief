import { gaussianRandom } from "@/utilities/functions";
import { useEffect, useRef, useState } from "react";
import styles from "./eps.module.css";
import styles1 from "@/styles/Home.module.css";

export default function Home() {
	const [actualEps, setActualEps] = useState(0);
	const [forecasts, setForecasts] = useState([...new Array(10)].map(() => 0));
	const guessRef = useRef<HTMLInputElement>(null);
	const [qsrReward, setQsrReward] = useState<number | null>(null);
	const [bsrReward, setBsrReward] = useState<number | null>(null);
	const [errorThreshold, setErrorThreshold] = useState<number | null>(null);

	useEffect(() => {
		renew();
	}, []);

	function renew() {
		const actual = gaussianRandom(60, 20);
		const forecastCal = [...new Array(10)].map(
			() => gaussianRandom(0, Math.sqrt(8)) + actual,
		);
		setActualEps(actual);
		setForecasts(forecastCal);
		setQsrReward(null);
		setBsrReward(null);
		setErrorThreshold(Math.random() * 6);

		if (guessRef.current) {
			guessRef.current.value = "";
		}
	}

	function guess() {
		if (guessRef.current?.value && errorThreshold) {
			setBsrReward(
				(Number(guessRef.current?.value) - actualEps) ** 2 < errorThreshold
					? 80
					: 0,
			);
			setQsrReward(
				90 - 25 * (actualEps - Number(guessRef.current?.value)) ** 2,
			);
		}
	}
	return (
		<main className={styles1.main} style={{ userSelect: "none" }}>
			<div className={styles.epsContainer}>
				<div className={styles.forecastsContainer}>
					<h3>Tahminler</h3>
					{forecasts.map((forecast, index) => (
						<p key={index}>{forecast}</p>
					))}
					<h3>Ortalama Tahmin </h3>
					{forecasts.reduce((acc, curr) => acc + curr, 0) / forecasts.length}
				</div>
				<div className={styles.rewardContainer}>
					<h3>Gerçek Hisse Kazancı (T)</h3>
					{qsrReward ? actualEps : "..."}
					<h3> QSR kazanç</h3>
					{qsrReward ?? "..."}
					<h3> BSR kazanç</h3>
					{bsrReward ?? "..."}
					<h3> BSR için hata eşiği (K)</h3>
					{bsrReward !== null ? errorThreshold : "..."}
				</div>
				<div className={styles.epsButtons}>
					<button className={styles.epsButton} onClick={() => renew()}>
						Yenile
					</button>
					<button className={styles.epsButton} onClick={() => guess()}>
						Tahmin
					</button>
					<label htmlFor="eps-guess">Tahmin (M)</label>
					<input
						type="text"
						name="eps-guess"
						id="eps-guess"
						className={styles.guessInput}
						ref={guessRef}
					/>
				</div>
			</div>
		</main>
	);
}
