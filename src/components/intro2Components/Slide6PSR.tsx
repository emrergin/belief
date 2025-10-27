import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { useState } from "react";
import Slider from "../experimentComponents/Slider";
import PSR from "../experimentComponents/PSR";
const Slide6PSR = () => {
	const [sliderValue, setSliderValue] = useState(50);
	const [showResult, setShowResult] = useState(false);
	return (
		<Carousel.Slide>
			<div>
				<Slider
					value={sliderValue}
					updatingFunction={(event) => {
						setSliderValue(Number(event.target.value));
					}}
					disabled={showResult}
				/>
				<PSR
					value={sliderValue}
					showResult={showResult}
					chosenColor={Math.random() > 0.5 ? "blue" : "red"}
				/>
			</div>
			<button
				onClick={() => {
					setShowResult(!showResult);
				}}
			>
				BAS
			</button>
		</Carousel.Slide>
	);
};

export default Slide6PSR;
