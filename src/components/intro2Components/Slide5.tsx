import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import Slider from "../experimentComponents/Slider";
import { useState } from "react";

const Slide5 = () => {
	const [sliderValue, setSliderValue] = useState(50);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Kullanılan torbanın <b className={circleStyles.redText}>kırmızı</b>{" "}
					veya <b className={circleStyles.blueText}>mavi</b> olma ihtimalinin{" "}
					<b>
						<i>100&apos;de kaç olduğunu</i>
					</b>{" "}
					ekrandaki bir kaydırıcıyı sağa ya da sola sürükleyerek
					bildireceksiniz. Aşağıda bu kaydırıcıyı görebilirsiniz.
				</List.Item>
				<List.Item>
					Şimdi dilerseniz bunu sağa ya da sola sürüklemeyi deneyin. Soldaki ve
					sağdaki rakamların değiştiğini göreceksiniz. Solda kırmızı renkle
					yazılan rakam, sizce kullanılan torbanın{" "}
					<b className={circleStyles.redText}>Kırmızı torba</b> olma ihtimalinin
					100’de kaç olduğunu gösterir. Sağda mavi renkle yazılan rakam sizce
					kullanılan torbanın <b className={circleStyles.blueText}>Mavi</b> olma
					ihtimalinin 100&apos;de kaç olduğunu gösterir.
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

export default Slide5;
