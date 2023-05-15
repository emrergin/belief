// import Head from "next/head";

// import { reducer, StateProvider } from "../state";
import Experiment from "@/components/Experiment";

import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// console.log(data)
	return <Experiment data={data} />;
}

export interface SessionType extends Omit<Session, 'prior'> {
	prior: [number,number]
}

const defaultSession: Omit<Session, "id"> = {
	// id: 'placeholderSession',
	start_time: new Date(),
	end_time: null,
	name: "alpha_1",
	location: null,
	num_of_blue_a: 30,
	num_of_blue_b: 70,
	treatment: "QSR",
	drawn_balls: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
	prior: [3, 3],
};

export const getServerSideProps: GetServerSideProps<{
	data: SessionType;
}> = async () => {
	let sessionData = await prisma.session.findFirst();

	if (sessionData === null) {
		sessionData = await prisma.session.create({
			data: { ...defaultSession },
		});
	}
	sessionData.start_time = JSON.parse(
		JSON.stringify(sessionData?.start_time)
	);
	sessionData.end_time = JSON.parse(JSON.stringify(sessionData?.end_time));

	return {
		props: {
			data: sessionData as SessionType,
		},
	};
};
