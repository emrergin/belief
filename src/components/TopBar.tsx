import customStyles from "@/styles/Custom.module.css";
import { GpsQuestion } from "@/utilities/types";
import { Stepper } from "@mantine/core";
import { Phase } from "@/utilities/types";

const phaseName = new Map();
phaseName.set("INTRO", "Karşılama");
phaseName.set("INTRO2", "Giriş");
phaseName.set("MAIN", "Deney");
phaseName.set("END", "Sonuç");
phaseName.set("DEMO", "Anket");
phaseName.set("GPS", "Anket");

const allGpsQuestions = [
	`generalrisk`,
	`willingnesstoact`,
	`describe`,
	`stairrisk`,
	`gift`,
	`hypodonation`,
	`stairpatience`,
];

const allStepperPhases = ["Karşılama", "Giriş", "Deney", "Anket"];

function TopBar({
	phase,
	points,
	currentRound,
	lastRound,
	currentQuestion,
}: {
	phase: Phase;
	points: number;
	currentRound: number;
	lastRound: number;
	currentQuestion: GpsQuestion;
}) {
	const activeStep =
		allStepperPhases.indexOf(phaseName.get(phase)) >= 0
			? allStepperPhases.indexOf(phaseName.get(phase))
			: 4;
	return (
		<div className={customStyles.topbar}>
			<div
				style={{
					width: "100vw",
					display: "flex",
					justifyContent: "center",
				}}
			>
				{}
				<Stepper active={activeStep} breakpoint="sm" style={{ width: "900px" }}>
					<Stepper.Step label={phaseName.get(Phase.Intro)}></Stepper.Step>
					<Stepper.Step label={phaseName.get(Phase.Intro2)}></Stepper.Step>
					<Stepper.Step
						label={phaseName.get(Phase.Main)}
						description={phase === "MAIN" ? `${currentRound}/${lastRound}` : ""}
					>
						<div style={{ display: "flex", gap: "20px" }}>
							<div>Toplam puan: {points}</div>
						</div>
					</Stepper.Step>
					<Stepper.Step
						label={phaseName.get(Phase.Demographics)}
						description={
							phase === "DEMO" || phase === "GPS"
								? phase === "DEMO"
									? "1/8"
									: `${allGpsQuestions.indexOf(currentQuestion) + 2}/8`
								: ""
						}
					></Stepper.Step>
					<Stepper.Completed>
						<div>
							<div>Deney Bitti. Kazandığınız toplam puan: {points} </div>
							<div>
								Kazandığınız toplam para: {30 + Math.round(points / 1000)} TL
							</div>
						</div>
					</Stepper.Completed>
				</Stepper>
			</div>
		</div>
	);
}

export default TopBar;
