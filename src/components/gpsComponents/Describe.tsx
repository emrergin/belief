import { Button, Container, Radio, Divider } from "@mantine/core";
import type { GpsData } from "../Gps";
import { useState } from "react";

function Describe({
	setSubphase,
}: {
	setSubphase: (
		subsetOfGps: Partial<GpsData>,
		lastSubphase: boolean,
		p: string
	) => void;
}) {
	const [value1, setValue1] = useState<string | undefined>(undefined);
	const [value2, setValue2] = useState<string | undefined>(undefined);
	const [value3, setValue3] = useState<string | undefined>(undefined);
	const [value4, setValue4] = useState<string | undefined>(undefined);
	const [value5, setValue5] = useState<string | undefined>(undefined);
	return (
		<Container>
			<p>Aşağıdaki ifadelerden her biri sizi ne kadar iyi tanımlar?</p>
			<p>
				Lütfen cevabınızı 0&#39;dan 10&#39;a kadar bir ölçekte belirtin.
				0 “beni hiç ifade etmiyor” ve 10 “beni mükemmel şekilde ifade
				ediyor” anlamına gelir. Ölçekte nereye düştüğünüzü belirtmek
				için 0 ile 10 arasında herhangi bir sayı kullanabilirsiniz.
			</p>

			<Divider my="sm" />
			<Radio.Group
				name="gps_d1"
				label="Bana iyilikte bulunan birisine karşılık vermeye hazırım."
				withAsterisk
				value={value1}
				onChange={setValue1}
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Beni hiç ifade etmiyor"
						required
					/>
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio
						value="10"
						label="10 - Beni mükemmel şekilde ifade ediyor"
					/>
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="gps_d2"
				label="Eğer çok haksız bir muamele görürsem, bunu yapmak için bir bedel olsa bile ilk fırsatta bunun intikamını alırım."
				withAsterisk
				value={value2}
				onChange={setValue2}
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Beni hiç ifade etmiyor"
						required
					/>
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio
						value="10"
						label="10 - Beni mükemmel şekilde ifade ediyor"
					/>
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="gps_d3"
				label="Ben insanların sadece en iyi niyetlerle davrandıklarını varsayarım."
				withAsterisk
				value={value3}
				onChange={setValue3}
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Beni hiç ifade etmiyor"
						required
					/>
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio
						value="10"
						label="10 - Beni mükemmel şekilde ifade ediyor"
					/>
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="gps_d4"
				label="Matematikte iyiyim."
				withAsterisk
				value={value4}
				onChange={setValue4}
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Beni hiç ifade etmiyor"
						required
					/>
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio
						value="10"
						label="10 - Beni mükemmel şekilde ifade ediyor"
					/>
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="gps_d5"
				label="Görevleri hemen yapmanın daha iyi olacağını bilsem bile erteleme eğilimindeyim."
				withAsterisk
				value={value5}
				onChange={setValue5}
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Beni hiç ifade etmiyor"
						required
					/>
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio
						value="10"
						label="10 - Beni mükemmel şekilde ifade ediyor"
					/>
				</div>
			</Radio.Group>
			<Button
				onClick={() =>
					setSubphase(
						{
							gps_d1: Number(value1),
							gps_d2: Number(value2),
							gps_d3: Number(value3),
							gps_d4: Number(value4),
							gps_d5: Number(value5),
						},
						false,
						"stairrisk"
					)
				}
				size="md"
				style={{
					marginTop: "13ch",
					display: "block",
					margin: "auto",
				}}
			>
				Devam
			</Button>
		</Container>
	);
}

export default Describe;
