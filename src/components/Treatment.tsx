import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Circles.module.css";
import Slider from "./experimentComponents/Slider";
import Circles from "./experimentComponents/Circles";
import Drawing from "./experimentComponents/Drawing";
import BagHolder from "./experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function Treatment({
	bsr,
	arrayOfDraws,
	priors,
	aBlue,
	bBlue,
}: {
	bsr: boolean;
	arrayOfDraws: number[];
	priors: number[];
	aBlue: number;
	bBlue: number;
}) {
	const [redRatio, setRedRatio] = useState(50);
	const [currentRound, setCurrentRound] = useState(1);
	const numberOfRounds = arrayOfDraws.length;
	const [subPhase, setSubPhase] = useState<"drawing" | "input" | "result">(
		"drawing"
	);
	const [selectedBag, setSelectedBag] = useState(
		Math.random() < (priors[0] / (priors[0] + priors[1])) ? 0 : 1
	);

	function updateSlider(e: React.ChangeEvent<HTMLInputElement>) {
		setRedRatio(Number(e.target.value));
	}

	function nextSubPhase() {
		setSubPhase("result")
		console.log("placeholder, nextSubPhase - Treatment.tsx");
	}

	return (
		<div>
			{subPhase === "drawing" && (
				<>
					<BagHolder aBlue={aBlue} bBlue={bBlue} />
					<Drawing
						numberOfDraws={arrayOfDraws[currentRound]}
						numberofBlues={selectedBag === 0 ? aBlue : bBlue}
						nextFunction={()=>setSubPhase("input" )}
					/>
				</>
			)}
			{(subPhase === "input" || subPhase==="result") &&
			<>
				<Slider updatingFunction={updateSlider} value={redRatio} disabled={subPhase!=="input"}/>
				<Circles bsr={bsr} value={redRatio} showResult={false} />
			
				{subPhase === "input" && <button className={styles.exp+" "+inter.className + " " + customStyles.navButton} onClick={nextSubPhase}
				style={{marginTop:"3ch"}}>
					Karar Verdim
				</button>
				}
			</>
			}
		</div>
	);
}

export default Treatment;
