import { Button, Container, Radio, Divider } from "@mantine/core";
import type { GpsData } from "../Gps";

function Describe({ setSubphase }: { setSubphase: (subsetOfGps: Partial<GpsData>, lastSubphase: boolean, p: string) => void  }) {
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
				name="risk_willingness"
				label="Bana iyilikte bulunan birisine karşılık vermeye hazırım."
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio value="0" label="0 - Beni hiç ifade etmiyor" />
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
				name="risk_willingness"
				label="Eğer çok haksız bir muamele görürsem, bunu yapmak için bir bedel olsa bile ilk fırsatta bunun intikamını alırım."
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio value="0" label="0 - Beni hiç ifade etmiyor" />
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
				name="risk_willingness"
				label="Ben insanların sadece en iyi niyetlerle davrandıklarını varsayarım."
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio value="0" label="0 - Beni hiç ifade etmiyor" />
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
				name="risk_willingness"
				label="Matematikte iyiyim."
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio value="0" label="0 - Beni hiç ifade etmiyor" />
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
				name="risk_willingness"
				label="Görevleri hemen yapmanın daha iyi olacağını bilsem bile erteleme eğilimindeyim."
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio value="0" label="0 - Beni hiç ifade etmiyor" />
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
				onClick={() => setSubphase({}, false, "stairrisk")}
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
