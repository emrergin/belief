import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";

import { useState, useEffect, useRef } from "react";

import {
	Container,
	Button,
	Center,
	Modal,
	TextInput,
	NumberInput,
	Radio,
	Group,
	Box,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { DataTable } from "mantine-datatable";
import { useRouter } from "next/router";
import { downloadDataAsCsv, getDateText } from "@/utilities/functions";

import { useDisclosure, useLocalStorage } from "@mantine/hooks";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
	const router = useRouter();
	const passRef = useRef<HTMLInputElement | null>(null);

	const [pass, setPass] = useLocalStorage({ key: "pass", defaultValue: "" });
	const [opened, { open, close }] = useDisclosure(false);
	const [newSession, { open: sessionOpen, close: sessionClose }] =
		useDisclosure(false);

	async function downloadData(
		listOfSessions: string[] = selectedSessions.map((a) => a.id)
	) {
		let res = "";
		if (data.length > selectedSessions.length) {
			res =
				"?" +
				Object.entries(listOfSessions)
					.map(([k, v]) => `sessionId=${v}`)
					.join("&");
		}
		console.log(pass);
		const respond = await fetch(
			process.env.NODE_ENV === "production"
				? `./api/round`
				: "../api/round" + res,
			{
				method: "GET",
				headers: { Authorization: pass },
			}
		);

		const columnNames = [
			"id",
			"name_surname",
			"sessionId",
			"age",
			"gpa",
			"pre_exp",
			"sex",
			"dep",
			"num_of_econ",
			"diff",
			"sure",
			"gps_risk_willingness",
			"gps_future_benefit",
			"gps_punish_self",
			"gps_punish_other",
			"gps_charity",
			"gps_d1",
			"gps_d2",
			"gps_d3",
			"gps_d4",
			"gps_d5",
			"gps_stair_risk",
			"gps_gift",
			"gps_donation",
			"gps_stair_patience",
			"start_time",
			"end_time",
			"name",
			"location",
			"num_of_blue_a",
			"num_of_blue_b",
			"treatment",
			"drawn_balls",
			"prior",
			"decision_time",
			"chosen_probability",
			"is_blue",
			"first_draw_blue",
			"second_draw_blue",
			"third_draw_blue",
			"fourth_draw_blue",
			"fifth_draw_blue",
			"sixth_draw_blue",
			"round",
			"reward",
			"participantId",
		];

		downloadDataAsCsv(await respond.json(), columnNames);
	}

	useEffect(() => {
		if (pass === null || pass === "") {
			open();
		} else {
			close();
		}
	}, [open, close, pass]);

	function isInDesiredForm(str: string) {
		var n = Math.floor(Number(str));
		return n !== Infinity && String(n) === str && n >= 0;
	}

	const form = useForm({
		initialValues: {
			name: "",
			num_of_blue_a: 30,
			num_of_blue_b: 70,
			treatment: null,
			drawn_balls: "",
			prior: "3,3",
		},
		validate: {
			name: isNotEmpty("Lütfen bir oturum ismi girin."),
			num_of_blue_a: isNotEmpty("Lütfen mavi bilyelerin sayısını girin."),
			num_of_blue_b: isNotEmpty("Lütfen mavi bilyelerin sayısını girin."),
			treatment: isNotEmpty("Lütfen bir deney tipi girin."),
			drawn_balls: (value) => {
				let array = value.split(",").map((a) => a.trim());
				for (let line of array) {
					if (!isInDesiredForm(line)) {
						return "Negatif olmayan tam sayılar girmeniz bekleniyor.";
					}
				}
				return null;
			},
			prior: (value) => {
				let array = value.split(",").map((a) => a.trim());
				if (array.length !== 2) {
					return "Toplamı altı olan iki pozitif tamsayı girmeniz bekleniyor.";
				}
				for (let line of array) {
					if (
						!isInDesiredForm(line) ||
						Number(line) > 5 ||
						Number(line) < 1
					) {
						return "Toplamı altı olan iki pozitif tamsayı girmeniz bekleniyor.";
					}
				}
				if (Number(array[0]) + Number(array[1]) !== 6) {
					return "Toplamı altı olan iki pozitif tamsayı girmeniz bekleniyor.";
				}
				return null;
			},
		},
	});

	useEffect(
		() => {
			form.setValues({ name: getDateText() });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	async function sendData(data: {
		name: string;
		num_of_blue_a: number;
		num_of_blue_b: number;
		treatment: null;
		drawn_balls: string;
	}) {
		const parsedData = {
			...data,
			drawn_balls: data.drawn_balls.split(",").map(Number),
			prior: data.drawn_balls.split(",").map(Number),
		};
		await fetch(
			process.env.NODE_ENV === "production"
				? `./api/admin`
				: "../api/admin",
			{
				method: "POST",
				body: JSON.stringify(parsedData),
				headers: { Authorization: pass },
			}
		);
		router.reload();
	}

	return (
		<Container size="lg" px="md" style={{ marginTop: "5ch" }}>
			<Modal opened={opened} onClose={close} title="Admin Pass">
				<TextInput
					placeholder="Admin password"
					label="password"
					withAsterisk
					ref={passRef}
				/>
				<Button
					style={{
						marginTop: "6ch",
						marginInline: "auto",
						display: "block",
					}}
					onClick={() => {
						setPass(passRef?.current?.value || "");
						if (passRef?.current?.value !== "") {
							close();
						}
					}}
				>
					Save Password
				</Button>
			</Modal>
			<Modal
				opened={newSession}
				onClose={sessionClose}
				title="Yeni Oturum"
			>
				<Box
					component="form"
					onSubmit={form.onSubmit((data) => sendData(data))}
				>
					<TextInput
						label="Oturum adı"
						withAsterisk
						{...form.getInputProps("name")}
					/>
					<NumberInput
						label="Kırmızı torbadaki mavi sayısı"
						withAsterisk
						{...form.getInputProps("num_of_blue_a")}
					/>
					<NumberInput
						label="Mavi torbadaki mavi sayısı"
						withAsterisk
						{...form.getInputProps("num_of_blue_b")}
					/>
					<Radio.Group
						name="treatment"
						label="Deney tipini seç."
						withAsterisk
						{...form.getInputProps("treatment")}
					>
						<Group mt="xs">
							<Radio value="QSR" label="QSR" />
							<Radio value="BSR" label="BSR" />
						</Group>
					</Radio.Group>
					<TextInput
						label="Çekiliş sayıları"
						withAsterisk
						placeholder="1,2,3,1,2,3"
						{...form.getInputProps("drawn_balls")}
					/>
					<TextInput
						label="Öncüller"
						withAsterisk
						{...form.getInputProps("prior")}
					/>

					<Button
						style={{
							marginTop: "6ch",
							marginInline: "auto",
							display: "block",
						}}
						type="submit"
					>
						Oluştur
					</Button>
				</Box>
			</Modal>
			<Center>
				<Button
					style={{ marginBottom: "6ch" }}
					variant="outline"
					onClick={() => sessionOpen()}
				>
					Yeni Oturum Ekle
				</Button>
			</Center>
			<Center>
				<Button
					style={{ marginBottom: "6ch" }}
					disabled={!selectedSessions.length}
					onClick={() => downloadData()}
				>
					{!selectedSessions.length &&
						`Verisi indirilecek oturumları seçin.`}
					{selectedSessions.length > 0 &&
						`Seçili oturumların verisini indirin.`}
				</Button>
			</Center>
			<DataTable
				withBorder
				shadow="sm"
				withColumnBorders
				highlightOnHover
				textSelectionDisabled
				columns={[{ accessor: "name", title: "Oturum adı" }]}
				records={data}
				selectedRecords={selectedSessions}
				onSelectedRecordsChange={setSelectedSessions}
				onRowClick={(session) => {
					router.push(
						process.env.NODE_ENV === "production"
							? `./belief/admin/${session.id}`
							: `./admin/${session.id}`
					);
				}}
			/>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps<{
	data: Session[];
}> = async () => {
	let allSessions = (await prisma.session.findMany()) as Session[];
	allSessions = allSessions.map((a) => ({
		...a,
		start_time: JSON.parse(JSON.stringify(a?.start_time)),
		end_time: JSON.parse(JSON.stringify(a?.end_time)),
	}));

	return {
		props: {
			data: allSessions as Session[],
		},
	};
};
