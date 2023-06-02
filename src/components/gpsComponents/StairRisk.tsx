import { Button, Container, Radio, Group } from "@mantine/core";

const inflationMultiplier = 10;
const stair1SureOutcome = 200;
const currentSure = 5;

function StairRisk({ setSubphase }: { setSubphase: (p: string) => void }) {
	return (
		<Container>
			<div>
				<p>Lütfen aşağıdaki durumu hayal edin: </p>
				<p>
					{150 * inflationMultiplier} TL kazanma ve hiçbir şey
					kazanamama arasında eşit şansa sahip olacağınız bir çekiliş
					yahut belirli bir miktar kesin ödeme arasında seçim
					yapabilirsiniz. Size böyle beş farklı durum sunacağız.
				</p>
			</div>
			<div>
				<p>Hangisini tercih ederdiniz:</p>
				<p id="stairStep">
					%50 şansla{" "}
					<strong>
						{inflationMultiplier * stair1SureOutcome} TL
					</strong>{" "}
					para kazandıran ve %50 şansla hiçbir şey kazandırmayan bir
					çekilişi mi yahut{" "}
					<strong>{currentSure * inflationMultiplier} TL</strong>’lik
					kesin bir nakit para ödemesini mi?{" "}
				</p>
				{/* <input type="radio" id="stairRiskA" name="stairRisk" v-model="currentStairValue" value="1" required/>
				<label htmlFor="stairRiskA"> 50/50 çekiliş</label>
				<input type="radio" id="stairRiskB" name="stairRisk" v-model="currentStairValue" value="0"/>
				<label htmlFor="stairRiskB"> Kesin ödeme</label> */}

				<Radio.Group
					name="stairRisk"
					// label="Cinsiyetiniz:"
					// {...form.getInputProps("sex")}
					withAsterisk
				>
					<Group mt="xs">
						<Radio value="1" label="50/50 çekiliş" />
						<Radio value="0" label=" Kesin ödeme" />
					</Group>
				</Radio.Group>
			</div>
			<Button
				onClick={() => setSubphase("gift")}
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

export default StairRisk;
