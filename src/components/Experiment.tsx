import styles from "@/styles/Home.module.css";
import cStyles from "@/styles/Custom.module.css";

import Intro from "@/components/Intro";
import Circles from "@/components/Circles";
import Intro2 from "@/components/Intro2";

import { useStateValue } from "../state";
import { Session } from "@prisma/client";

function Experiment({ data }: { data: Session }) {
	console.log(data);
	const [{ phase }] = useStateValue();
	return (
		<main className={styles.main}>
			<p className={cStyles.debug}>
				{phase} - {data.treatment}
			</p>
			{phase === "INTRO" && <Intro />}
			{phase === "INTRO2" && (
				<Intro2
					aBlue={data.num_of_blue_a}
					bBlue={data.num_of_blue_b}
					treatment={data.treatment}
				/>
			)}
			{phase === "MAIN" && data.treatment === "QSR" && (
				<Circles bsr={false} />
			)}
			{phase === "MAIN" && data.treatment === "BSR" && (
				<Circles bsr={true} />
			)}
		</main>
	);
}

export default Experiment;
