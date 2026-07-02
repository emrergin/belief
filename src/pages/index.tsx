import Experiment from "@/components/Experiment";

import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { Session } from "@prisma/client";
import {
	Question,
	SessionType,
	SessionType2,
	SessionType3,
} from "@/utilities/types";
import { useRouter } from "next/router";
import {
	questions1,
	questions2,
	questions3,
	questions4,
	questions5,
} from "@/utilities/constants";

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
	data: SessionType | SessionType2 | (SessionType3 & { questions: Question[] });
}> = async () => {
	let sessionData = (await prisma.session.findFirst({
		orderBy: {
			start_time: "desc",
		},
	})) as SessionType | SessionType2 | SessionType3 | null;

	if (sessionData === null) {
		sessionData = (await prisma.session.create({
			data: { ...defaultSession },
		})) as SessionType;
	}
	sessionData.start_time = JSON.parse(JSON.stringify(sessionData?.start_time));
	sessionData.end_time = JSON.parse(JSON.stringify(sessionData?.end_time));
	sessionData.round_parameters = shuffle(sessionData.round_parameters);
	const shuffled1 = [...shuffle(questions1)];
	const shuffled2 = [...shuffle(questions2)];
	const shuffled3 = [...shuffle(questions3)];
	const shuffled4 = [...shuffle(questions4)];
	const shuffled5 = [...shuffle(questions5)];

	const questions: Question[] = [];

	const isQuestions =
		sessionData.treatment === "BSR3" ||
		sessionData.treatment === "NSR3" ||
		sessionData.treatment === "NIT3" ||
		sessionData.treatment === "PSR3";

	if (isQuestions) {
		for (let i = 0; i < sessionData.round_parameters.length; i++) {
			const currentDifficulty = sessionData.round_parameters[i];
			let newQuestion: Question | undefined;
			if (currentDifficulty === 1) {
				newQuestion = shuffled1.pop();
			} else if (currentDifficulty === 2) {
				newQuestion = shuffled2.pop();
			} else if (currentDifficulty === 3) {
				newQuestion = shuffled3.pop();
			} else if (currentDifficulty === 4) {
				newQuestion = shuffled4.pop();
			} else {
				newQuestion = shuffled5.pop();
			}
			if (newQuestion) {
				questions.push(newQuestion);
			}
		}
	}

	const data = (isQuestions ? { ...sessionData, questions } : sessionData) as
		| SessionType
		| SessionType2
		| (SessionType3 & { questions: Question[] });

	return {
		props: {
			data,
		},
	};
};

function shuffle<T>(array: T[]): T[] {
	let resArray = array;
	for (let i = resArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[resArray[i], resArray[j]] = [resArray[j], resArray[i]];
	}
	return resArray;
}
