import styles from "@/styles/Home.module.css";

import Intro from "@/components/Intro";
import Intro3 from "./IntroGuess";
import TopBar from "@/components/TopBar";

import { Participant } from "@prisma/client";
import { useState } from "react";

import Demographics from "@/components/Demographics";
import Gps from "@/components/Gps";

import { Phase, GpsQuestion, SessionType2 } from "@/utilities/types";
import Round2 from "./Round2";

function Experiment2({ data }: { data: SessionType2 }) {
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
	const [points, setPoints] = useState(0);
	const [currentRound, setCurrentRound] = useState(0);
	const [gpsQuestion, setGpsQuestion] = useState<GpsQuestion>("generalrisk");

	return (
		<main className={styles.main} style={{ userSelect: "none" }}>
			<TopBar
				phase={phase}
				points={points}
				currentRound={currentRound}
				lastRound={data.round_parameters.length}
				currentQuestion={gpsQuestion}
			/>
			{phase === Phase.Intro && <Intro nameFunction={generateNewParticipant} />}

			{phase === Phase.Intro2 && (
				<Intro3
					treatment={data.treatment}
					phaseFunction={setPhase}
					numberOfRounds={data.round_parameters.length}
				/>
			)}

			{phase === Phase.Main && (
				<Round2
					bsr={data.treatment === "BSR2"}
					arrayOfBags={data.round_parameters}
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

export default Experiment2;
