import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "@/styles/globals.css";
import buildDate from "../../buildDate";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	const isProd = process.env.NODE_ENV === "production";

	return (
		<>
			<Head>
				<title>Ekonomi Deneyi</title>
				<meta name="description" content="Olasılıklarla alakalı bir deney" />
				<meta name="revised" content={buildDate} />
				<meta
					name="viewport"
					content="minimum-scale=1,width=device-width, initial-scale=1"
				/>
				<link rel="icon" href={(isProd ? "/belief/" : "") + "/favicon.ico"} />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}
