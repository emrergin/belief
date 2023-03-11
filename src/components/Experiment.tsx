import styles from "@/styles/Home.module.css";
import cStyles from "@/styles/Custom.module.css";

import Intro from "@/components/Intro";
import Circles from "@/components/Circles";
import Intro2 from "@/components/Intro2";

import { useStateValue } from "../state";
import { Session } from "@prisma/client";
import { useEffect } from "react";

function shuffle(array: number[]) {
	let resArray = array;
	for (let i = resArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[resArray[i], resArray[j]] = [resArray[j], resArray[i]];
	}
	return resArray;
}

function Experiment({ data }: { data: Session }) {
	// console.log(data);
	const [{ phase }] = useStateValue();
	let randomizedTreatments;

	useEffect(() => {
		let randomizedTreatments = shuffle(data.drawn_balls);
	}, [data.drawn_balls]);

	return (
		<main className={styles.main}>
			<p className={cStyles.debug}>
				{phase} - {data.treatment}
			</p>
			{phase === "INTRO" && <Intro />}
			{phase === "INTRO2" && (
				<Intro2
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					treatment={data.treatment}
				/>
			)}
			{phase === "MAIN" && data.treatment === "QSR" && (
				<Circles bsr={false} />
			)}
			{phase === "MAIN" && data.treatment === "BSR" && (
				<Circles bsr={true} />
			)}
		</main>
	);
}

export default Experiment;
