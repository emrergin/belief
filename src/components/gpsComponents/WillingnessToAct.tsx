import { Button, Container, Radio, Divider } from "@mantine/core";

function WillingnessToAct({
	setSubphase,
}: {
	setSubphase: (p: string) => void;
}) {
	return (
		<Container>
			<p>
				{" "}
				Şimdi size belirli bir şekilde hareket etmeye istekli olup
				olmadığınızı soruyoruz.
			</p>
			<p>
				Lütfen cevabınızı 0&apos;dan 10&apos;a kadar bir ölçekte tekrar
				belirtin. 0, “hiçbir şekilde yapmak istemiyor” ve 10, “yapmaya
				çok istekli” anlamına gelir. Ölçekte nereye düştüğünüzü
				belirtmek için 0 ile 10 arasında herhangi bir sayı
				kullanabilirsiniz.
			</p>

			<Divider my="sm" />
			<Radio.Group
				name="risk_willingness"
				label="Gelecekte daha fazla faydasını görebilmek adına bugün sizin için faydalı olan bir şeyden vazgeçmeye ne kadar isteklisiniz?"
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Hiçbir şekilde yapmak istemiyor"
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
					<Radio value="10" label="10 - Bunu yapmaya çok istekli" />
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="risk_willingness"
				label="Size maliyetleri olsa bile, size karşı haksız davranışları cezalandırmaya ne kadar isteklisiniz?"
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Hiçbir şekilde yapmak istemiyor"
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
					<Radio value="10" label="10 - Bunu yapmaya çok istekli" />
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="risk_willingness"
				label="Size maliyetleri olsa bile, başkalarına haksızlık yapan birini cezalandırmaya ne kadar isteklisiniz?"
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Hiçbir şekilde yapmak istemiyor"
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
					<Radio value="10" label="10 - Bunu yapmaya çok istekli" />
				</div>
			</Radio.Group>
			<Divider my="sm" />
			<Radio.Group
				name="risk_willingness"
				label="Karşılığında hiçbir geri dönüş beklemeden hayır işlerine bir şeyler vermeye ne kadar isteklisiniz?"
				withAsterisk
			>
				<div className="likertDiv shortLikert">
					<Radio
						value="0"
						label="0 - Hiçbir şekilde yapmak istemiyor"
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
					<Radio value="10" label="10 - Bunu yapmaya çok istekli" />
				</div>
			</Radio.Group>
			<Button
				onClick={() => setSubphase("describe")}
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

export default WillingnessToAct;
