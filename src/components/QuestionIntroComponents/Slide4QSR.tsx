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
					Daha büyük bir simit daha yüksek bir puana denk gelmektedir. Puanlar
					simidin ortasında belirtilmiştir.
				</List.Item>
				<List.Item>
					Eğer gösterilen cümle <b className={circleStyles.redText}>yanlış</b>
					tıysa, kazancınız kırmızı simidin karşılık geldiği miktar olacak.
				</List.Item>
				<List.Item>
					Eğer cümle <b className={circleStyles.blueText}>doğru</b>yduysa,
					kazancınız mavi simidin karşılık geldiği miktar olacak.
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
