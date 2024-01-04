import styles from "@/styles/Home.module.css";

import Intro from "@/components/Intro";
import Intro2 from "@/components/Intro2";
import TopBar from "@/components/TopBar";

import { Participant } from "@prisma/client";
import { useRef, useState } from "react";

import Round from "@/components/Round";
import Demographics from "@/components/Demographics";
import Gps from "@/components/Gps";

import { Phase, GpsQuestion } from "@/utilities/types";

import { SessionType } from "@/pages";

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

	const [phase, setPhase] = useState<Phase>(Phase.Intro);
	const randomizedDraws = useRef(data.drawn_balls);
	const [points, setPoints] = useState(0);
	const [currentRound, setCurrentRound] = useState(0);
	const [gpsQuestion, setGpsQuestion] = useState<GpsQuestion>("generalrisk");

	return (
		<main className={styles.main} style={{ userSelect: "none" }}>
			<TopBar
				phase={phase}
				points={points}
				currentRound={currentRound}
				lastRound={data.drawn_balls.length}
				currentQuestion={gpsQuestion}
			/>
			{phase === Phase.Intro && <Intro nameFunction={generateNewParticipant} />}
			{phase === Phase.Intro2 && (
				<Intro2
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					priors={data.prior as [number, number]}
					treatment={data.treatment}
					phaseFunction={setPhase}
					numberOfRounds={data.drawn_balls.length}
				/>
			)}
			{phase === Phase.Main && (
				<Round
					bsr={data.treatment === "BSR"}
					arrayOfDraws={randomizedDraws.current}
					priors={data.prior}
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					phaseFunction={setPhase}
					pointFunction={setPoints}
					participantId={"id" in participant ? participant.id : "no-id-given"}
					currentRound={currentRound}
					roundFunction={setCurrentRound}
				/>
			)}
			{phase === Phase.Demographics && (
				<Demographics
					participantId={"id" in participant ? participant.id : "no-id-given"}
					phaseFunction={setPhase}
				/>
			)}
			{phase === Phase.Gps && (
				<Gps
					participantId={"id" in participant ? participant.id : "no-id-given"}
					phaseFunction={setPhase}
					question={gpsQuestion}
					setQuestion={setGpsQuestion}
				/>
			)}
		</main>
	);
}

export default Experiment;
