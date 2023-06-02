import { Radio, Button, Divider, Container } from "@mantine/core";

function GeneralRisk({ setSubphase }: { setSubphase: (p: string) => void }) {
	return (
		<Container>
			<h4>
				Genel olarak, risk almaya istekli bir kişi mi yoksa risk
				almaktan sakınan biri misiniz?
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
			>
				<div className="likertDiv">
					<Radio value="0" label="0- Risk almaya tamamen isteksiz" />
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
				onClick={() => setSubphase("willingnesstoact")}
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

export default GeneralRisk;
