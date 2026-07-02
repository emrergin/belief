import { useState, useCallback } from "react";

import { Button } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";

import { Phase } from "@/utilities/types";

import Slide1 from "./QuestionIntroComponents/Slide1";
import Slide2 from "./QuestionIntroComponents/Slide2";
// import Slide2NSR from "./GuessIntroComponents/Slide2NSR";
// import Slide2PSR from "./BayesianIntroComponents/PSRExplanation";
import Slide3 from "./QuestionIntroComponents/Slide3";
// import Slide4QSR from "./GuessIntroComponents/Slide4QSR";
import Slide4BSR from "./QuestionIntroComponents/Slide4BSR";
// import Slide3PSR from "./GuessIntroComponents/Slide3PSR";
// import Slide3NSR from "./GuessIntroComponents/Slide3NSR";
// import Slide4NSR from "./GuessIntroComponents/Slide4NSR";
// import Slide5NSR from "./GuessIntroComponents/Slide5NSR";
// import Slide2NIT from "./GuessIntroComponents/Slide2NIT";
// import Slide3NIT from "./GuessIntroComponents/Slide3NIT";

function getCurrentSlides(treatment: "BSR3" | "PSR3" | "NSR3" | "NIT3") {
	const BSRSlides: JSX.Element[] = [
		<Slide2 key="2" />,
		<Slide3 treatment="BSR3" key="3" />,
		<Slide4BSR key="4" />,
	];
	const NSRSlides: JSX.Element[] = [
		// <Slide2NSR key="2" />,
		// <Slide3NSR key="3" />,
		// <Slide4NSR key="4" />,
		// <Slide5NSR key="5" />,
	];
	const PSRSlides: JSX.Element[] = [
		// <Slide2PSR key="2" isBayesian={false} />,
		// <Slide3PSR key="3" />,
	];
	const NITSlides: JSX.Element[] = [
		// <Slide2NIT key="2" isBayesian={false} />,
		// <Slide3NIT key="3" />,
	];

	if (treatment === "BSR3") {
		return BSRSlides;
	} else if (treatment === "PSR3") {
		return PSRSlides;
	} else if (treatment === "NSR3") {
		return NSRSlides;
	}
	return NITSlides;
}

function IntroQuestion({
	treatment,
	numberOfRounds,
	phaseFunction,
}: {
	treatment: "BSR3" | "PSR3" | "NSR3" | "NIT3";
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

	const isOurTreatment = treatment === "BSR3";
	const currentSlides = getCurrentSlides(treatment);

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
				{currentSlides}
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
					disabled={slideIndex === currentSlides.length}
					onClick={scrollNext}
				>
					<span>Sonraki</span>
				</Button>
				{slideIndex === currentSlides.length && (
					<Button size="lg" onClick={() => phaseFunction(Phase.Main)}>
						Deneye Başla!
					</Button>
				)}
			</Button.Group>
		</>
	);
}

export default IntroQuestion;
