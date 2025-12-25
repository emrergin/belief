import { Phase } from "@/utilities/types";
import { useRef } from "react";

import GeneralRisk from "@/components/gpsComponents/GeneralRisk";
import WillingnessToAct from "@/components/gpsComponents/WillingnessToAct";
import Describe from "@/components/gpsComponents/Describe";
import StairRisk from "@/components/gpsComponents/StairRisk";
import Gift from "@/components/gpsComponents/Gift";
import HypoDonation from "@/components/gpsComponents/HypoDonation";
import StairPatience from "@/components/gpsComponents/StairPatience";

import type { GpsData, GpsQuestion } from "@/utilities/types";

function Gps({
	participantId,
	phaseFunction,
	question,
	setQuestion,
}: {
	participantId: string;
	phaseFunction: (p: Phase) => void;
	question: string;
	setQuestion: (p: GpsQuestion) => void;
}) {
	const gpsDataRef = useRef<Partial<GpsData>>({});

	function updateGpsData(
		newData: Partial<GpsData>,
		lastSubphase: boolean,
		nextSubphase?: GpsQuestion,
	) {
		gpsDataRef.current = { ...gpsDataRef.current, ...newData };
		const inputs = document.getElementsByTagName("input");
		for (let index = 0; index < inputs.length; ++index) {
			inputs[index].reportValidity();
			if (!inputs[index].checkValidity()) {
				return false;
			}
		}

		if (lastSubphase) {
			sendData();
			phaseFunction(Phase.End);
		} else if (nextSubphase !== undefined) {
			setQuestion(nextSubphase);
		}
	}

	async function sendData() {
		if (participantId !== "no-id-given") {
			await fetch(`./api/participant/${participantId}`, {
				method: "PUT",
				body: JSON.stringify(gpsDataRef.current),
			});
		}
		phaseFunction(Phase.End);
	}

	return (
		<div>
			{question === "generalrisk" && (
				<GeneralRisk setSubphase={updateGpsData} />
			)}
			{question === "willingnesstoact" && (
				<WillingnessToAct setSubphase={updateGpsData} />
			)}
			{question === "describe" && <Describe setSubphase={updateGpsData} />}
			{question === "stairrisk" && <StairRisk setSubphase={updateGpsData} />}
			{question === "gift" && <Gift setSubphase={updateGpsData} />}
			{question === "hypodonation" && (
				<HypoDonation setSubphase={updateGpsData} />
			)}
			{question === "stairpatience" && (
				<StairPatience setSubphase={updateGpsData} />
			)}
		</div>
	);
}

export default Gps;
