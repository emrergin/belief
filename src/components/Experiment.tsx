import styles from "@/styles/Home.module.css";
import cStyles from "@/styles/Custom.module.css";

import Intro from "@/components/Intro";
import Intro2 from "@/components/Intro2";
import TopBar from "@/components/TopBar";

import Footer from "./Footer";

import { Participant } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import Round from "@/components/Round";
import Demographics from "@/components/Demographics";

import { Phase } from "@/utilities/types";

import { SessionType } from "@/pages";

function shuffle(array: number[]) {
	let resArray = array;
	for (let i = resArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[resArray[i], resArray[j]] = [resArray[j], resArray[i]];
	}
	return resArray;
}

function Experiment({ data }: { data: SessionType }) {
	const [participant, setParticipant] = useState<Participant | {}>({});

	async function generateNewParticipant(name: string) {
		const respond = await fetch("./api/participant", {
			method: "POST",
			body: JSON.stringify({ name_surname: name, sessionId: data.id }),
		});
		setParticipant(await respond.json());
		setPhase(Phase.Intro2);
	}

	useEffect(() => {
		console.log(data);
		shuffle(data.drawn_balls);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [phase, setPhase] = useState("INTRO");
	// const [phase, setPhase] = useState("MAIN");
	const randomizedDraws = useRef(data.drawn_balls);
	const [points, setPoints] = useState(0);

	return (
		<main className={styles.main} style={{ userSelect: "none" }}>
			<TopBar phase={phase} />
			{phase === "INTRO" && (
				<Intro nameFunction={generateNewParticipant} />
			)}
			{phase === "INTRO2" && (
				<Intro2
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					priors={data.prior as [number, number]}
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
					participantId={
						"id" in participant ? participant.id : "no-id-given"
					}
				/>
			)}
			{phase === "DEMO" && (
				<Demographics
					participantId={
						"id" in participant ? participant.id : "no-id-given"
					}
				/>
			)}
			{phase === "END" && (
				<div>Deney Bitti. Kazandığınız toplam puan: {points}</div>
			)}
			<Footer />
		</main>
	);
}

export default Experiment;
