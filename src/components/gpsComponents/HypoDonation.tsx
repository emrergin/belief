import { Button, Container, Center, Divider } from "@mantine/core";
import type { GpsData } from "../Gps";
import { useState } from "react";
import { inflationMultiplier } from "@/utilities/constants";

function HypoDonation({
	setSubphase,
}: {
	setSubphase: (
		subsetOfGps: Partial<GpsData>,
		lastSubphase: boolean,
		p: string
	) => void;
}) {
	const [value, setValue] = useState<string>("");
	return (
		<Container>
			<div>
				<Center>Lütfen aşağıdaki durumu hayal edin: </Center>
				<p>
					Bugün beklenmedik bir şekilde {400 * inflationMultiplier} TL
					aldınız. İyi bir amaç için bu miktarın ne kadarını
					bağışlarsınız? (0 ile {400 * inflationMultiplier} arasındaki
					herhangi bir değeri seçebilirsiniz)
				</p>
			</div>

			<Center>
				<input
					type="number"
					max={400 * inflationMultiplier}
					min="0"
					placeholder="Bağış miktarınız"
					onChange={(e) => setValue(e.target.value)}
					value={value}
					required
				/>
			</Center>
			<Divider my="sm" />
			<Button
				onClick={() =>
					setSubphase(
						{ gps_donation: Number(value) },
						false,
						"stairpatience"
					)
				}
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

export default HypoDonation;
