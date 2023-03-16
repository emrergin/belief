import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";

import { useState } from "react";

import { Container, Button, Center } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useRouter } from "next/router";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
	const router = useRouter();

	function downloadData() {
		console.log("placeholder data download");
	}

	return (
		<Container size="lg" px="md" style={{ marginTop: "5ch" }}>
			<Center>
				<Button
					style={{ marginBottom: "6ch" }}
					disabled={!selectedSessions.length}
					onClick={() => downloadData()}
				>
					Verisi indirilecek oturumları seçin.
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
					router.push(`./admin/${session.id}`);
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
