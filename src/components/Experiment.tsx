import styles from "@/styles/Home.module.css";
import cStyles from "@/styles/Custom.module.css";

import Intro from "@/components/Intro";
import Intro2 from "@/components/Intro2";

import Footer from "./Footer";

import { Session } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Round from "@/components/Round";

function shuffle(array: number[]) {
	let resArray = array;
	for (let i = resArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[resArray[i], resArray[j]] = [resArray[j], resArray[i]];
	}
	return resArray;
}

function Experiment({ data }: { data: Session }) {

	useEffect(()=>{
		console.log(data);
	},[data]);
	const [phase, setPhase] = useState("INTRO");
	const [name, setName] = useState("");
	const randomizedDraws = useRef(shuffle(data.drawn_balls));
	const [points, setPoints] = useState(0);

	return (
		<main className={styles.main} style={{ userSelect: "none" }}>
			<p className={cStyles.debug}>
				{phase} - {data.treatment}
			</p>
			{phase === "INTRO" && (
				<Intro phaseFunction={setPhase} nameFunction={setName} />
			)}
			{phase === "INTRO2" && (
				<Intro2
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					treatment={data.treatment}
					phaseFunction={setPhase}
				/>
			)}
			{phase === "MAIN" && (
				<Round
					bsr={data.treatment === "BSR"}
					arrayOfDraws={randomizedDraws.current}
					priors={data.prior}
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					phaseFunction={setPhase}
					pointFunction={setPoints}
				/>
			)}
			{phase === "END" && (
				<div>Deney Bitti. Kazandığınız toplam puan: {points}</div>
			)}
			<Footer/>
		</main>
	);
}

export default Experiment;
