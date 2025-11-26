import { Carousel } from "@mantine/carousel";
import BagHolder from "../experimentComponents/BagHolder";
import customStyles from "@/styles/Custom.module.css";

const Slide2 = ({
	aBlue,
	bBlue,
	diceText,
}: {
	aBlue: number;
	bBlue: number;
	diceText: [string, string];
}) => {
	return (
		<Carousel.Slide>
			<BagHolder aBlue={aBlue} bBlue={bBlue} diceText={diceText} />
		</Carousel.Slide>
	);
};

export default Slide2;
