import Circles from "../experimentComponents/Circles";
import Slider from "../experimentComponents/Slider";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";

const Slide4QSR = () => {
	const [sliderValue, setSliderValue] = useState(50);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText} style={{ scale: "0.9" }}>
				<List.Item>
					Eğer bir <b className={circleStyles.redText}>kırmızı</b> bilye
					çekilmiş ise, kazancınız kırmızı simidin karşılık geldiği miktar
					olacak.
				</List.Item>
				<List.Item>
					Eğer bir <b className={circleStyles.blueText}>mavi</b> bilye
					çekilmişse, kazancınız mavi simidin karşılık geldiği miktar olacak.
				</List.Item>
			</List>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignContent: "center",
				}}
			>
				<div>
					<Slider
						value={sliderValue}
						updatingFunction={(event) => {
							setSliderValue(Number(event.target.value));
						}}
					/>
				</div>
				<Circles
					value={sliderValue}
					bsr={false}
					showResult={false}
					chooseCircle={"blue"}
				/>
			</div>
		</Carousel.Slide>
	);
};

export default Slide4QSR;
