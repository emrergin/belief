import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";

import { Container, Table } from "@mantine/core";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const rows = data.map((participant) => (
		<tr key={participant.id}>
			<td>{participant.name_surname}</td>
			<td>{participant.reward}</td>
		</tr>
	));
	return (
		<Container size="lg" px="md" style={{ marginTop: "5ch" }}>
			<Table>
				<thead>
					<tr>
						<th>Kişi adı</th>
						<th>Kazanç</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps<{
	data: {
		id: string;
		name_surname: string;
		reward: number;
	}[];
}> = async ({ params }) => {
	let relatedParticipants = await prisma.participant.findMany({
		where: {
			sessionId: params?.id as string,
		},
		include: {
			Round: true,
		},
	});

	// const actualParticipants = new Set<string>();

	const filtered = relatedParticipants.map((participant) => {
		const reward = participant.Round.reduce(
			(acc, curr) => acc + curr.reward,
			0,
		);
		// if (reward > 0) {
		// 	actualParticipants.add(participant.name_surname);
		// }
		return {
			id: participant.id,
			name_surname: participant.name_surname,
			reward,
		};
	});
	// .filter((a) => a.reward > 0 || !actualParticipants.has(a.name_surname));

	return {
		props: {
			data: filtered,
		},
	};
};
