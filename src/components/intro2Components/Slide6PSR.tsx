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
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignContent: "center",
				}}
			>
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
				<button
					onClick={() => {
						setShowResult(!showResult);
					}}
					style={{
						marginInline: "auto",
						padding: "1ch 2ch",
						marginTop: "2ch",
					}}
				>
					DENEMEK İÇİN BAS
				</button>
			</div>
		</Carousel.Slide>
	);
};

export default Slide6PSR;
