import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Participant,Round } from "@prisma/client";

import { Container, Table } from "@mantine/core";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const rows = data.map((participant) => (
		<tr key={participant.id}>
			<td>{participant.name_surname}</td>
            <td>{
            participant.Round.reduce((acc,curr)=>
                acc + curr.reward
            ,0)}</td>
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

interface ParticipantWithRounds extends Participant{
    Round: Round[]
}

export const getServerSideProps: GetServerSideProps<{
	data: ParticipantWithRounds[];
}> = async ({ params }) => {
	let relatedParticipants = await prisma.participant.findMany({
        where: {
          sessionId: params?.id as string,
        },
        include: {
            Round: true
        }}) as ParticipantWithRounds[];

        console.log(relatedParticipants)
	return {
		props: {
			data: relatedParticipants as ParticipantWithRounds[],
		},
	};
};
