import Experiment from "@/components/Experiment";

import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";
import { SessionType } from "@/utilities/types";
export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <Experiment data={data} />;
}

const defaultSession: Omit<Session, "id"> = {
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
	let sessionData = await prisma.session.findFirst({
		orderBy: {
			start_time: "desc",
		},
	});

	if (sessionData === null) {
		sessionData = await prisma.session.create({
			data: { ...defaultSession },
		});
	}
	sessionData.start_time = JSON.parse(JSON.stringify(sessionData?.start_time));
	sessionData.end_time = JSON.parse(JSON.stringify(sessionData?.end_time));
	sessionData.drawn_balls = shuffle(sessionData.drawn_balls);

	return {
		props: {
			data: sessionData as SessionType,
		},
	};
};

function shuffle(array: number[]) {
	let resArray = array;
	for (let i = resArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[resArray[i], resArray[j]] = [resArray[j], resArray[i]];
	}
	return resArray;
}
