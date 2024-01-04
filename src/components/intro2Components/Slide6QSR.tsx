import Circles from "../experimentComponents/Circles";
import Slider from "../experimentComponents/Slider";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";

const Slide6QSR = () => {
	const [sliderValue, setSliderValue] = useState(50);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText} style={{ marginTop: "0px" }}>
				<List.Item>
					Karar ekranında, bahsettiğimiz kaydırıcının tam altında kırmızı ve
					mavi birer simit olacak. Kaydırıcıyı sağa yahut sola sürükledikçe
					kırmızı simidin ve mavi simidin büyüklüklerinin değiştiğini
					görebilirsiniz. Daha büyük bir simit daha çok puana karşılık gelir. Bu
					puan simidin ortasında yazar.
				</List.Item>
				<List.Item>
					Karar verdikten sonra, gerçekte hangi torbanın kullanıldığı size
					bildirilecektir. Şayet o turda{" "}
					<b className={circleStyles.redText}>Kırmızı torba</b> kullanılmış ise,
					kazancınız kırmızı simidin karşılık geldiği miktar olacak. Şayet o
					turda <b className={circleStyles.blueText}>Mavi torba</b> kullanılmış
					ise, kazancınız mavi simidin karşılık geldiği miktar olacak.
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

export default Slide6QSR;
