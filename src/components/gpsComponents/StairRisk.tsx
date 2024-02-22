import {
	Button,
	Container,
	Radio,
	Group,
	Center,
	Divider,
} from "@mantine/core";
import { useRef, useState } from "react";
import customStyles from "@/styles/Custom.module.css";
import type { GpsData } from "@/utilities/types";
import { inflationMultiplier } from "@/utilities/constants";
import type { GpsQuestion } from "@/utilities/types";

const stair1SureOutcome = 150;

function StairRisk({
	setSubphase,
}: {
	setSubphase: (
		subsetOfGps: Partial<GpsData>,
		lastSubphase: boolean,
		p: GpsQuestion,
	) => void;
}) {
	const radioRefA = useRef<HTMLInputElement>(null);
	const radioRefB = useRef<HTMLInputElement>(null);
	const stairStepRef = useRef<HTMLParagraphElement>(null);
	const stairSelections = useRef<number[]>([]);

	const stairStartingValue = 80;
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [currentSure, setCurrentSure] = useState(stairStartingValue);

	function nextQuestion() {
		if (radioRefA.current !== null && radioRefB.current !== null) {
			let nextValue: number;
			if (radioRefA.current.checked || radioRefB.current.checked) {
				if (radioRefA.current.checked) {
					stairSelections.current.push(Number(radioRefA.current.value));
					nextValue =
						currentSure +
						(1 / 2 ** stairSelections.current.length) * stairStartingValue;
				}
				if (radioRefB.current.checked) {
					stairSelections.current.push(Number(radioRefB.current.value));
					nextValue =
						currentSure -
						(1 / 2 ** stairSelections.current.length) * stairStartingValue;
				}
				setButtonDisabled(true);
				if (stairStepRef.current !== null) {
					stairStepRef.current.style.opacity = "0";
				}
				setTimeout(() => {
					if (stairStepRef.current !== null) {
						stairStepRef.current.style.opacity = "1";
					}

					setCurrentSure(nextValue);
					setButtonDisabled(false);
				}, 750);
			} else {
				radioRefA.current.reportValidity();
			}
		}
		if (stairSelections.current.length < 5) {
			return false;
		}
		const finalResult = stairSelections.current.reduce(
			(prev, curr, index) => prev + curr * (16 / 2 ** index),
			1,
		);
		setSubphase({ gps_stair_risk: finalResult }, false, "gift");
	}
	return (
		<Container style={{ marginTop: "3rem" }}>
			<div>
				<Center>Lütfen aşağıdaki durumu hayal edin: </Center>
				<p>
					{stair1SureOutcome * inflationMultiplier} TL kazanma ve hiçbir şey
					kazanamama arasında eşit şansa sahip olacağınız bir çekiliş yahut
					belirli bir miktar kesin ödeme arasında seçim yapabilirsiniz. Size
					böyle beş farklı durum sunacağız.
				</p>
			</div>
			<Divider my="sm" />
			<div>
				<Center style={{ marginBottom: "3ch" }}>
					Hangisini tercih ederdiniz:
				</Center>
				<p ref={stairStepRef} className={customStyles.stairStep}>
					%50 şansla{" "}
					<strong>{inflationMultiplier * stair1SureOutcome} TL</strong> para
					kazandıran ve %50 şansla hiçbir şey kazandırmayan bir çekilişi mi
					yahut <strong>{currentSure * inflationMultiplier} TL</strong>’lik
					kesin bir nakit para ödemesini mi?{" "}
				</p>
				<Center>
					<Radio.Group
						name="stairRisk"
						label="Seçiminiz:"
						withAsterisk
						key={stairSelections.current.length}
					>
						<Group mt="xs">
							<Radio value="1" label="50/50 çekiliş" ref={radioRefA} required />
							<Radio value="0" label="Kesin ödeme" ref={radioRefB} />
						</Group>
					</Radio.Group>
				</Center>
			</div>
			<Divider my="sm" />
			<Button
				disabled={buttonDisabled}
				onClick={() => nextQuestion()}
				size="md"
				style={{
					display: "block",
					margin: "auto",
				}}
			>
				Devam
			</Button>
		</Container>
	);
}

export default StairRisk;
