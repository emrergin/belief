import Experiment2 from "@/components/Experiment2";
import { Session } from "@prisma/client";

const defaultSession: Omit<
	Session,
	"id" | "num_of_blue_a" | "num_of_blue_b" | "prior"
> = {
	start_time: new Date(),
	end_time: null,
	name: "alpha_1",
	location: null,
	treatment: "QSR2",
	round_parameters: [10, 25, 50, 75, 90, 10],
};

export default function Home() {
	return <Experiment2 />;
}
