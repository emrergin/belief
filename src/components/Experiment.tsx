import styles from "@/styles/Home.module.css";
import cStyles from "@/styles/Custom.module.css";

import Intro from "@/components/Intro";
// import Circles from "@/components/Treatment";
import Intro2 from "@/components/Intro2";

import { useStateValue } from "../state";
import { Session } from "@prisma/client";
import { useEffect, useRef } from "react";
import Treatment from "@/components/Treatment";

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
	const [{ phase },] = useStateValue();
	const randomizedDraws = useRef(shuffle(data.drawn_balls));

	// useEffect(() => {
	// 	let randomizedTreatments = shuffle(data.drawn_balls);
	// 	console.log(randomizedTreatments)
	// }, [data.drawn_balls]);

	// useEffect(()=>{
	// 	console.log(currentRound)
	// },[currentRound.first_draw_blue,currentRound])

	return (
		<main className={styles.main} style={{ userSelect: "none" }}>
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
			{phase === "MAIN"  && (
				<Treatment
					bsr={data.treatment === "BSR"}
					arrayOfDraws={randomizedDraws.current}
					priors={data.prior}
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
				/>
			)}
			{/* {phase === "MAIN" && data.treatment === "BSR" && (
				<Treatment
					bsr={true}
					arrayOfDraws={randomizedDraws.current}
					priors={data.prior}
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
				/>
			)} */}
		</main>
	);
}

export default Experiment;
