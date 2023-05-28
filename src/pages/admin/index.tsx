import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";

import { useState, useEffect, useRef } from "react";

import { Container, Button, Center, Modal, TextInput } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useRouter } from "next/router";
import { downloadDataAsCsv } from "@/utilities/functions";

import { useDisclosure, useLocalStorage } from "@mantine/hooks";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
	const router = useRouter();
	const passRef = useRef<HTMLInputElement | null>(null);

	const [pass, setPass] = useLocalStorage({ key: "pass", defaultValue: "" });
	const [opened, { open, close }] = useDisclosure(false);

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
				columns={[
					{ accessor: "name", title: "Oturum adı" },
					{
						accessor: "time",
						title: "Oturum zamanı",
						render: (session) => {
							const d = new Date(session.start_time);
							d.setHours(d.getHours() + 3);
							return d.toLocaleString("tr-TR", {
								year: "numeric",
								month: "long",
								day: "numeric",
								weekday: "long",
								hour: "2-digit",
								minute: "2-digit",
							});
						},
					},
				]}
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
