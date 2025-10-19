import styles from "@/styles/Home.module.css";

import Intro from "@/components/Intro";
import IntroBayesian from "@/components/IntroBayesian";
import TopBar from "@/components/TopBar";

import { Participant } from "@prisma/client";
import { useState } from "react";

import Demographics from "@/components/Demographics";
import Gps from "@/components/Gps";

import {
	Phase,
	GpsQuestion,
	SessionType,
	SessionType2,
} from "@/utilities/types";
import Round from "./Round";
import IntroGuess from "./IntroGuess";

function Experiment({ data }: { data: SessionType | SessionType2 }) {
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
			{phase === Phase.Intro2 &&
				(data.treatment === "QSR" || data.treatment === "BSR") && (
					<IntroBayesian
						aBlue={data.num_of_blue_a}
						bBlue={data.num_of_blue_b}
						priors={data.prior as [number, number]}
						treatment={data.treatment}
						phaseFunction={setPhase}
						numberOfRounds={data.round_parameters.length}
					/>
				)}
			{phase === Phase.Intro2 &&
				(data.treatment === "QSR2" || data.treatment === "BSR2") && (
					<IntroGuess
						treatment={data.treatment}
						phaseFunction={setPhase}
						numberOfRounds={data.round_parameters.length}
					/>
				)}

			{(data.treatment === "QSR" ||
				data.treatment === "BSR" ||
				data.treatment === "PSR") &&
				phase === Phase.Main && (
					<Round
						treatment={data.treatment}
						roundParameters={data.round_parameters}
						priors={data.prior}
						aBlue={data.num_of_blue_a}
						bBlue={data.num_of_blue_b}
						phaseFunction={setPhase}
						pointFunction={setPoints}
						participantId={"id" in participant ? participant.id : "no-id-given"}
						currentRound={currentRound}
						roundFunction={setCurrentRound}
						type="bayesian"
					/>
				)}
			{(data.treatment === "QSR2" ||
				data.treatment === "BSR2" ||
				data.treatment === "PSR2") &&
				phase === Phase.Main && (
					<Round
						treatment={data.treatment}
						roundParameters={data.round_parameters}
						phaseFunction={setPhase}
						pointFunction={setPoints}
						participantId={"id" in participant ? participant.id : "no-id-given"}
						currentRound={currentRound}
						roundFunction={setCurrentRound}
						type="guess"
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
