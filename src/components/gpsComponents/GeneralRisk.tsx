import { Radio, Button, Divider, Container } from "@mantine/core";
import type { GpsData } from "@/utilities/types";
import { useState } from "react";

import type { GpsQuestion } from "@/utilities/types";

function GeneralRisk({
	setSubphase,
}: {
	setSubphase: (
		subsetOfGps: Partial<GpsData>,
		lastSubphase: boolean,
		p: GpsQuestion,
	) => void;
}) {
	const [value, setValue] = useState<string | undefined>(undefined);
	return (
		<Container style={{ marginTop: "6rem" }}>
			<h4>
				Genel olarak, risk almaya istekli bir kişi mi yoksa risk almaktan
				sakınan biri misiniz?
			</h4>
			<Divider my="sm" />
			<Radio.Group
				name="risk_willingness"
				label='Lütfen cevabınızı 0&apos;dan 10&apos;a kadar bir ölçekte
				belirtin. Burada 0, "risk almaya tamamen isteksiz" ve
				10, "risk almaya çok istekli" anlamına gelir. Ölçekte
				nereye düştüğünüzü belirtmek için 0 ile 10 arasında herhangi bir
				sayı kullanabilirsiniz.'
				withAsterisk
				value={value}
				onChange={setValue}
			>
				<div className="likertDiv">
					<Radio required value="0" label="0- Risk almaya tamamen isteksiz" />
					<Radio value="1" label="1" />
					<Radio value="2" label="2" />
					<Radio value="3" label="3" />
					<Radio value="4" label="4" />
					<Radio value="5" label="5" />
					<Radio value="6" label="6" />
					<Radio value="7" label="7" />
					<Radio value="8" label="8" />
					<Radio value="9" label="9" />
					<Radio value="10" label="10- Risk almaya çok istekli" />
				</div>
			</Radio.Group>
			<Button
				onClick={() =>
					setSubphase(
						{ gps_risk_willingness: Number(value) },
						false,
						"willingnesstoact",
					)
				}
				size="md"
				style={{
					marginTop: "18ch",
					display: "block",
					margin: "auto",
				}}
			>
				Devam
			</Button>
		</Container>
	);
}

export default GeneralRisk;
