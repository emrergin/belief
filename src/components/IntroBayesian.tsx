import { useState, useCallback } from "react";

import { Button } from "@mantine/core";

import { Phase } from "@/utilities/types";

import { Carousel, Embla } from "@mantine/carousel";

import { getDiceText } from "@/utilities/functions";
import Slide1 from "./intro2Components/Slide1";
import Slide2 from "./intro2Components/Slide2";
import Slide3 from "./intro2Components/Slide3";
import Slide4 from "./intro2Components/Slide4";
import Slide6QSR from "./intro2Components/Slide6QSR";
import Slide6BSR from "./intro2Components/Slide6BSR";
import Slide5 from "./intro2Components/Slide5";

function IntroBayesian({
	aBlue,
	bBlue,
	priors,
	treatment,
	numberOfRounds,
	phaseFunction,
}: {
	aBlue: number;
	bBlue: number;
	priors: [number, number];
	treatment: "QSR" | "BSR";
	numberOfRounds: number;
	phaseFunction: (p: Phase) => void;
}) {
	const [slideIndex, setSlideIndex] = useState(0);
	const [embla, setEmbla] = useState<Embla | null>(null);
	const diceText = getDiceText(priors);

	const scrollPrev = useCallback(() => {
		if (!embla) {
			return;
		}
		embla.scrollPrev();
		setSlideIndex(embla.selectedScrollSnap() || 0);
	}, [embla]);

	const scrollNext = useCallback(() => {
		if (!embla) {
			return;
		}
		embla.scrollNext();
		setSlideIndex(embla.selectedScrollSnap() || 0);
	}, [embla]);

	return (
		<>
			<Carousel
				slideSize="100%"
				slideGap="md"
				dragFree
				draggable={false}
				withControls={false}
				getEmblaApi={setEmbla}
				style={{
					maxWidth: "100vw",
					display: "flex",
					marginBottom: "2rem",
				}}
			>
				<Slide1 numberOfRounds={numberOfRounds} aBlue={aBlue} bBlue={bBlue} />
				<Slide2 aBlue={aBlue} bBlue={bBlue} diceText={diceText} />
				<Slide3 diceText={diceText} equal={priors[0] === 0} />
				<Slide4 />
				<Slide5 treatment={treatment} />
				{treatment === "QSR" ? <Slide6QSR /> : <Slide6BSR />}
			</Carousel>
			<Button.Group>
				<Button
					variant="light"
					size="lg"
					disabled={slideIndex === 0}
					onClick={scrollPrev}
				>
					<span>Önceki</span>
				</Button>
				<Button
					variant="light"
					size="lg"
					disabled={slideIndex === 5}
					onClick={scrollNext}
				>
					<span>Sonraki</span>
				</Button>
				{slideIndex === 5 && (
					<Button size="lg" onClick={() => phaseFunction(Phase.Main)}>
						Deneye Başla!
					</Button>
				)}
			</Button.Group>
		</>
	);
}

export default IntroBayesian;
