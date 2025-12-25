import Experiment from "@/components/Experiment";

import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";
import { SessionType, SessionType2 } from "@/utilities/types";
import { useRouter } from "next/router";

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();
	const { experiment } = router.query;
	if (experiment === "bsr2" || experiment === "gbsr") {
		return <Experiment data={defaultSessionForBsr2} />;
	} else {
		return <Experiment data={data} />;
	}
}

const defaultSession: Omit<Session, "id"> = {
	start_time: new Date(),
	end_time: null,
	name: "alpha_1",
	location: null,
	num_of_blue_a: 30,
	num_of_blue_b: 70,
	treatment: "QSR",
	round_parameters: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
	prior: [3, 3],
};

const defaultSessionForBsr2: SessionType2 = {
	start_time: new Date(),
	end_time: null,
	name: "BSR2_demo",
	location: null,
	treatment: "BSR2",
	round_parameters: [10, 25, 50, 75, 90, 10, 25, 50, 75, 90],
	id: "demo",
};

export const getServerSideProps: GetServerSideProps<{
	data: SessionType | SessionType2;
}> = async () => {
	let sessionData = (await prisma.session.findFirst({
		orderBy: {
			start_time: "desc",
		},
	})) as SessionType | SessionType2 | null;

	if (sessionData === null) {
		sessionData = (await prisma.session.create({
			data: { ...defaultSession },
		})) as SessionType;
	}
	sessionData.start_time = JSON.parse(JSON.stringify(sessionData?.start_time));
	sessionData.end_time = JSON.parse(JSON.stringify(sessionData?.end_time));
	sessionData.round_parameters = shuffle(sessionData.round_parameters);

	return {
		props: {
			data: sessionData,
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
