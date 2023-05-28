import {
	Select,
	NumberInput,
	Radio,
	Group,
	TextInput,
	Grid,
	Flex,
	Button,
	Divider,
	Box,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";

interface DemographicData {
	age: number;
	gpa: number;
	pre_exp: number;
	sex: number;
	dep: string;
	num_of_econ: number;
	diff: number;
	sure: number;
}

function Demographics({ participantId }: { participantId: string }) {
	async function sendData(data: DemographicData) {
		console.log(data);
		await fetch(`./api/participant/${participantId}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	const form = useForm({
		initialValues: {
			age: null,
			gpa: null,
			pre_exp: null,
			sex: null,
			dep: "",
			num_of_econ: null,
			diff: null,
			sure: null,
		},

		validate: {
			age: isNotEmpty("Lütfen yaşınızı girin."),
			gpa: isNotEmpty("Lütfen ortalamanızı girin."),
			pre_exp: isNotEmpty("Lütfen tecrübenizi girin."),
			sex: isNotEmpty("Lütfen cinsiyetinizi girin."),
			dep: isNotEmpty("Lütfen bölümünüzü girin."),
			num_of_econ: isNotEmpty("Lütfen ders sayısını girin."),
			diff: isNotEmpty("Lütfen zorlanma miktarınızı girin."),
			sure: isNotEmpty("Lütfen kendinizden emin olma durumunuzu girin."),
		},
	});

	return (
		<Box
			component="form"
			onSubmit={form.onSubmit((data: any) => sendData(data))}
		>
			<Grid
				columns={4}
				justify="center"
				align="center"
				style={{ width: "1000px" }}
			>
				<Grid.Col span={1}>
					<NumberInput
						{...form.getInputProps("age")}
						placeholder="Yaşınız"
						label="Yaşınız:"
						max={120}
						min={0}
						required
					/>
					<Divider my="sm" />
					<Select
						label="Üniversite genel ortalamanız hangi aralıkta?"
						placeholder="Seçiniz"
						required
						{...form.getInputProps("gpa")}
						data={[
							{ value: "0.5", label: "0.5-1" },
							{ value: "1", label: "1-1.5" },
							{ value: "1.5", label: "1.5-2" },
							{ value: "2", label: "2-2.5" },
							{ value: "2.5", label: "2.5-3" },
							{ value: "3", label: "3-3.5" },
							{ value: "3.5", label: "3.5-4" },
						]}
					/>
					<Divider my="sm" />

					<Radio.Group
						name="cinsiyet"
						label="Cinsiyetiniz:"
						{...form.getInputProps("sex")}
						required
					>
						<Group mt="xs">
							<Radio value="0" label="Kadın" />
							<Radio value="1" label="Erkek" />
							<Radio value="2" label="Diğer" />
						</Group>
					</Radio.Group>
					<Divider my="sm" />
					<TextInput
						placeholder="Bölümünüz"
						label="Bölümünüz:"
						required
						{...form.getInputProps("dep")}
					/>
					<Divider my="sm" />
					<Select
						label="Bugüne kadar kaç ekonomi dersi aldınız?"
						style={{ maxWidth: "200px" }}
						placeholder="Seçiniz"
						required
						{...form.getInputProps("num_of_econ")}
						data={[
							{ value: "0", label: "0" },
							{ value: "1", label: "1" },
							{ value: "2", label: "2" },
							{ value: "3", label: "3" },
							{ value: "4", label: "4+" },
						]}
					/>
				</Grid.Col>
				<Grid.Col span={3}>
					<Flex direction="column" justify="center" gap="lg">
						<Radio.Group
							name="diff"
							label="Deneydeki kararların ne kadar zor olduğunu
							düşündünüz?"
							{...form.getInputProps("diff")}
							className="likert"
							required
						>
							<Group mt="xs">
								<Radio value="0" label="Çok kolay" />
								<Radio value="1" />
								<Radio value="2" />
								<Radio value="3" />
								<Radio value="4" />
								<Radio value="5" />
								<Radio value="6" />
								<Radio value="7" />
								<Radio value="8" />
								<Radio value="9" />
								<Radio value="10" label="Çok zor" />
							</Group>
						</Radio.Group>
						<Divider my="sm" />
						<Radio.Group
							name="sure"
							label="Deneydeki seçimleriniz hakkında ne kadar emindiniz?"
							{...form.getInputProps("sure")}
							className="likert"
							required
						>
							<Group mt="xs">
								<Radio value="0" label="Hiç emin değildim" />
								<Radio value="1" />
								<Radio value="2" />
								<Radio value="3" />
								<Radio value="4" />
								<Radio value="5" />
								<Radio value="6" />
								<Radio value="7" />
								<Radio value="8" />
								<Radio value="9" />
								<Radio value="10" label="Çok emindim" />
							</Group>
						</Radio.Group>
						<Divider my="sm" />
						<Radio.Group
							name="benzerDeney"
							label="Daha önce benzer bir deneye katıldınız mı?"
							style={{ maxWidth: "400px" }}
							// description="This is anonymous"
							// withAsterisk
							{...form.getInputProps("pre_exp")}
						>
							<Group mt="xs">
								<Radio value="1" label="Evet" />
								<Radio value="0" label="Hayır" />
							</Group>
						</Radio.Group>
					</Flex>
				</Grid.Col>
				<Button
					size="lg"
					// onClick={nextSubPhase}
					type="submit"
					style={{
						marginTop: "13ch",
						display: "block",
						margin: "auto",
					}}
				>
					Devam
				</Button>
			</Grid>
		</Box>
	);
}

export default Demographics;
