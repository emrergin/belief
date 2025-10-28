import { useState, useCallback } from "react";

import { Button } from "@mantine/core";

import { Phase } from "@/utilities/types";

import { Carousel, Embla } from "@mantine/carousel";

import Slide1 from "./intro3Components/Slide1";
import Slide2 from "./intro3Components/Slide2";
import Slide3 from "./intro3Components/Slide3";
import Slide4QSR from "./intro3Components/Slide4QSR";
import Slide4BSR from "./intro3Components/Slide4BSR";
import Slide4PSR from "./intro3Components/Slide4PSR";
import PSRExplanation from "./intro2Components/PSRExplanation";

function IntroGuess({
	treatment,
	numberOfRounds,
	phaseFunction,
}: {
	treatment: "QSR2" | "BSR2" | "PSR2";
	numberOfRounds: number;
	phaseFunction: (p: Phase) => void;
}) {
	const [slideIndex, setSlideIndex] = useState(0);
	const [embla, setEmbla] = useState<Embla | null>(null);

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
				<Slide1 numberOfRounds={numberOfRounds} />
				<Slide2 />
				{treatment === "PSR2" && <PSRExplanation isBayesian={false} />}
				{treatment !== "PSR2" && <Slide3 treatment={treatment} />}
				{treatment === "QSR2" && <Slide4QSR />}
				{treatment === "BSR2" && <Slide4BSR />}
				{treatment === "PSR2" && <Slide4PSR />}
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
					disabled={slideIndex === 3}
					onClick={scrollNext}
				>
					<span>Sonraki</span>
				</Button>
				{slideIndex === 3 && (
					<Button size="lg" onClick={() => phaseFunction(Phase.Main)}>
						Deneye Başla!
					</Button>
				)}
			</Button.Group>
		</>
	);
}

export default IntroGuess;
