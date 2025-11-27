import { useState, useCallback } from "react";

import { Button } from "@mantine/core";

import { Phase } from "@/utilities/types";

import { Carousel, Embla } from "@mantine/carousel";

import Slide1 from "./GuessIntroComponents/Slide1";
import Slide2 from "./GuessIntroComponents/Slide2";
import Slide3 from "./GuessIntroComponents/Slide3";
import Slide4QSR from "./GuessIntroComponents/Slide4QSR";
import Slide4BSR from "./GuessIntroComponents/Slide4BSR";
import Slide4PSR from "./GuessIntroComponents/Slide4PSR";
import PSRExplanation from "./BayesianIntroComponents/PSRExplanation";
import Slide2NSR from "./GuessIntroComponents/Slide2NSR";
import Slide3NSR from "./GuessIntroComponents/Slide3NSR";

function IntroGuess({
	treatment,
	numberOfRounds,
	phaseFunction,
}: {
	treatment: "QSR2" | "BSR2" | "PSR2" | "NSR2";
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

	const isOurTreatment = treatment == "QSR2" || treatment == "BSR2";

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
				<Slide1
					numberOfRounds={numberOfRounds}
					isOurTreatment={isOurTreatment}
				/>
				{/* 2 */}
				{isOurTreatment && <Slide2 />}
				{treatment === "NSR2" && <Slide2NSR />}
				{treatment === "PSR2" && <PSRExplanation isBayesian={false} />}
				{/* 3 */}
				{isOurTreatment && <Slide3 treatment={treatment} />}
				{treatment === "NSR2" && <Slide3NSR />}
				{/* 4 */}
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
