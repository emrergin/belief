import {
	Button,
	Container,
	Center,
	Divider,
	Radio,
	Group,
} from "@mantine/core";
import type { GpsData } from "../Gps";
import { useState } from "react";
import { inflationMultiplier } from "@/utilities/constants";

function Gift({
	setSubphase,
}: {
	setSubphase: (
		subsetOfGps: Partial<GpsData>,
		lastSubphase: boolean,
		p: string
	) => void;
}) {
	const [firstAnswer, setFirstAnswer] = useState<string | undefined>(
		undefined
	);
	const [secondAnswer, setSecondAnswer] = useState<string | undefined>(
		undefined
	);

	function nextQuestion() {
		if (firstAnswer === "0") {
			setSubphase({ gps_gift: 0 }, false, "hypodonation");
		} else if (secondAnswer !== undefined) {
			setSubphase(
				{ gps_gift: Number(secondAnswer) },
				false,
				"hypodonation"
			);
		}
	}

	return (
		<Container>
			<div>
				<p>
					Size aşina olmayan bir bölgede olduğunuzun ve yolunuzu
					kaybettiğinizin farkındasınız. Tanımadığınız birine yol
					tarifi soruyorsunuz. Sizi gideceğiniz yere götürmeyi teklif
					ediyor.
				</p>

				<p>
					Size yardım etmek bu yabancıya toplamda{" "}
					{8 * inflationMultiplier} TL’ye mal olacaktır. Buna rağmen
					bu yabancı sizden hiç para istememektedir. Yanınızda 6 adet
					hediye var. En ucuz hediye {2 * inflationMultiplier} TL, en
					pahalı olanı ise {12 * inflationMultiplier} TL değerinde.
				</p>
			</div>
			<Divider my="sm" />
			<div>
				<Center>
					<Radio.Group
						name="gift"
						label="Bu hediyelerden birini “teşekkür hediyesi” olarak bu
						yabancıya verir misiniz?"
						withAsterisk
						value={firstAnswer}
						onChange={setFirstAnswer}
					>
						<Center>
							<Group mt="xs">
								<Radio value="next" label="Evet" required />
								<Radio value="0" label="Hayır" />
							</Group>
						</Center>
					</Radio.Group>
				</Center>
				<Divider my="sm" />
				{firstAnswer === "next" && (
					<>
						<Radio.Group
							name="giftvalue"
							label="Yabancıya hangi hediyeyi verirsiniz?"
							withAsterisk
							value={secondAnswer}
							onChange={setSecondAnswer}
						>
							<Center>
								<Radio
									value="2"
									label={`${
										2 * inflationMultiplier
									} TL değerinde hediye`}
									required
								/>
								<Radio
									value="4"
									label={`${
										4 * inflationMultiplier
									} TL değerinde hediye`}
								/>
								<Radio
									value="6"
									label={`${
										6 * inflationMultiplier
									} TL değerinde hediye`}
								/>
								<Radio
									value="8"
									label={`${
										8 * inflationMultiplier
									} TL değerinde hediye`}
								/>
								<Radio
									value="10"
									label={`${
										10 * inflationMultiplier
									} TL değerinde hediye`}
								/>
								<Radio
									value="12"
									label={`${
										12 * inflationMultiplier
									} TL değerinde hediye`}
								/>
							</Center>
						</Radio.Group>
						<Divider my="sm" />
					</>
				)}
			</div>
			<Button
				onClick={() => nextQuestion()}
				size="md"
				style={{
					marginTop: "14ch",
					display: "block",
					margin: "auto",
				}}
			>
				Devam
			</Button>
		</Container>
	);
}

export default Gift;
