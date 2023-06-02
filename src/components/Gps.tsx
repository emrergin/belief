import { Phase } from "@/utilities/types";
import { useState } from "react";

import GeneralRisk from "@/components/gpsComponents/GeneralRisk";
import WillingnessToAct from "@/components/gpsComponents/WillingnessToAct";
import Describe from "@/components/gpsComponents/Describe";
import StairRisk from "@/components/gpsComponents/StairRisk";
import Gift from "@/components/gpsComponents/Gift";
import HypoDonation from "@/components/gpsComponents/HypoDonation";
import StairPatience from "@/components/gpsComponents/StairPatience";

const questionList = [
	`generalrisk`,
	`willingnesstoact`,
	`describe`,
	`stairrisk`,
	`gift`,
	`hypodonation`,
	`stairpatience`,
];

function Gps({ phaseFunction }: { phaseFunction: (p: Phase) => void }) {
	const [question, setQuestion] = useState("generalrisk");
	return (
		<div>
			{question === "generalrisk" && (
				<GeneralRisk setSubphase={setQuestion} />
			)}
			{question === "willingnesstoact" && (
				<WillingnessToAct setSubphase={setQuestion} />
			)}
			{question === "describe" && <Describe setSubphase={setQuestion} />}
			{question === "stairrisk" && (
				<StairRisk setSubphase={setQuestion} />
			)}
			{question === "gift" && <Gift setSubphase={setQuestion} />}
			{question === "hypodonation" && (
				<HypoDonation setSubphase={setQuestion} />
			)}
			{question === "stairpatience" && (
				<StairPatience setSubphase={phaseFunction} />
			)}
		</div>
	);
}

export default Gps;
