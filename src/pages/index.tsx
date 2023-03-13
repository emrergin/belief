import Head from "next/head";

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
	return (
		<>
			<Head>
				<title>Ekonomi Deneyi</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				{/* <StateProvider reducer={reducer}> */}
				<Experiment data={data} />
				{/* </StateProvider> */}

			</>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<{
	data: Session;
}> = async () => {
	const sessionData = (await prisma.session.findFirst()) as Session;
	sessionData.start_time = JSON.parse(
		JSON.stringify(sessionData?.start_time)
	);
	sessionData.end_time = JSON.parse(JSON.stringify(sessionData?.end_time));
	// console.log(sessionData)

	return {
		props: {
			data: sessionData as Session,
		},
	};
};
