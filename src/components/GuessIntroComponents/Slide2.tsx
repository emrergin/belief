import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import Slider from "../experimentComponents/Slider";
import { useState } from "react";

const Slide2 = () => {
	const [sliderValue, setSliderValue] = useState(50);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Ekranda bir kaydırma çubuğu göreceksiniz. Çekilen bilyenin{" "}
					<b className={circleStyles.redText}>kırmızı</b> yahut{" "}
					<b className={circleStyles.blueText}>mavi</b> olmasına verdiğiniz
					ihtimali, çubuk üzerindeki gri yuvarlağı sağa veya sola sürükleyerek
					belirteceksiniz.
				</List.Item>
				<List.Item>
					Soldaki <b className={circleStyles.redText}>kırmızı</b> renkle yazılan
					rakam, çekilen bilyenin{" "}
					<b className={circleStyles.redText}>kırmızı</b> olmsına verdiğiniz
					ihtimali, mavi renkle yazılan rakam ise yine çekilen bilyenin{" "}
					<b className={circleStyles.blueText}>mavi</b> olmasına verdiğiniz
					ihtimali gösterir.
				</List.Item>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Slider
						value={sliderValue}
						updatingFunction={(event) => {
							setSliderValue(Number(event.target.value));
						}}
					/>
				</div>
			</List>
		</Carousel.Slide>
	);
};

export default Slide2;
