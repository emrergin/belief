import {
	Button,
	Container,
	Radio,
	Group,
	Center,
	Divider,
} from "@mantine/core";
import type { GpsData } from "../Gps";
import { useState, useRef } from "react";
import { inflationMultiplier } from "@/utilities/constants";

import customStyles from "@/styles/Custom.module.css";

const stairPatienceMap = new Map();
stairPatienceMap.set(62, [50, 74]);
stairPatienceMap.set(50, [45, 56]);
stairPatienceMap.set(74, [68, 81]);
stairPatienceMap.set(45, [42, 48]);
stairPatienceMap.set(56, [53, 59]);
stairPatienceMap.set(68, [65, 71]);
stairPatienceMap.set(81, [77, 84]);
stairPatienceMap.set(42, [41, 44]);
stairPatienceMap.set(48, [46, 49]);
stairPatienceMap.set(53, [52, 54]);
stairPatienceMap.set(59, [57, 60]);
stairPatienceMap.set(65, [63, 66]);
stairPatienceMap.set(71, [69, 72]);
stairPatienceMap.set(77, [76, 79]);
stairPatienceMap.set(84, [82, 86]);

function StairPatience({
	setSubphase,
}: {
	setSubphase: (subsetOfGps: Partial<GpsData>, lastSubphase: boolean) => void;
}) {
	const [valueNow, setValueNow] = useState(62);
	const radioRefA = useRef<HTMLInputElement>(null);
	const radioRefB = useRef<HTMLInputElement>(null);
	const stairStepRef = useRef<HTMLParagraphElement>(null);
	const stairSelections = useRef<number[]>([]);

	const [buttonDisabled, setButtonDisabled] = useState(false);

	function nextQuestion() {
		if (radioRefA.current !== null && radioRefB.current !== null) {
			let nextValue: number;
			if (radioRefA.current.checked || radioRefB.current.checked) {
				if (radioRefA.current.checked) {
					stairSelections.current.push(Number(radioRefA.current.value));
					if (stairPatienceMap.get(valueNow)) {
						nextValue = stairPatienceMap.get(valueNow)[1];
					}
				}
				if (radioRefB.current.checked) {
					stairSelections.current.push(Number(radioRefB.current.value));
					if (stairPatienceMap.get(valueNow)) {
						nextValue = stairPatienceMap.get(valueNow)[0];
					}
				}
				setButtonDisabled(true);
				if (stairStepRef.current !== null) {
					stairStepRef.current.style.opacity = "0";
				}
				setTimeout(() => {
					if (stairStepRef.current !== null) {
						stairStepRef.current.style.opacity = "1";
					}
					setValueNow(nextValue);
					setButtonDisabled(false);
				}, 750);
			} else {
				radioRefA.current.reportValidity();
			}
		}
		if (stairSelections.current.length < 5) {
			return false;
		}
		const finalResult =
			33 -
			stairSelections.current.reduce(
				(prev, curr, index) => prev + curr * (16 / 2 ** index),
				1,
			);
		setSubphase({ gps_stair_patience: finalResult }, true);
	}
	return (
		<Container style={{ marginTop: "3rem" }}>
			<div>
				<p>
					Size bugün bir ödeme alma veya 12 ay sonra bir ödeme alma arasında
					seçim hakkı verildiğini varsayın. Şimdi size beş durum sunacağız.
					Bugünkü ödeme miktarı, bu beş durumun her birinde aynıdır. 12 ay sonra
					ödenecek miktar ise her durumda farklıdır.
				</p>
				<p>
					Bu durumların her biri için hangisini seçeceğinizi bilmek istiyoruz.{" "}
					<b>
						Enflasyon olmadığını varsayın, yani gelecekteki fiyatlar bugünkü
						fiyatlar ile aynıdır.
					</b>
				</p>
			</div>
			<Divider my="sm" />
			<div>
				<Center style={{ marginBottom: "3ch" }}>
					Lütfen aşağıdaki durumu değerlendirin:
				</Center>
				<p ref={stairStepRef} className={customStyles.stairStep}>
					Bugün <strong>{40 * inflationMultiplier} TL</strong> almayı mı yoksa
					12 ay sonra <strong>{valueNow * inflationMultiplier} TL</strong>{" "}
					almayı mı tercih edersiniz?
				</p>
				<Center>
					<Radio.Group
						name="stairPatience"
						label="Seçiminiz:"
						withAsterisk
						key={stairSelections.current.length}
					>
						<Group mt="xs">
							<Radio value="1" label="Bugün" ref={radioRefA} required />
							<Radio value="0" label="12 ay sonra" ref={radioRefB} />
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

export default StairPatience;
