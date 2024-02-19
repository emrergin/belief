import { List } from "@mantine/core";
import Slider from "../experimentComponents/Slider";
import { Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { useState } from "react";
import Circles from "../experimentComponents/Circles";

const Slide4BSR = () => {
	const [showResult, setShowResult] = useState(false);
	const [sliderValue, setSliderValue] = useState(50);

	return (
		<Carousel.Slide>
			<List
				className={customStyles.entryText}
				style={{ marginTop: "0px", scale: "0.9" }}
			>
				<List.Item>
					{" "}
					Kararınızı belirttikten sonra, eğer bir{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye çekilmiş ise
					kırmızı simit, bir <b className={circleStyles.blueText}>mavi</b> bilye
					çekilmiş ise mavi simit ekranda kalacak, diğer simit kaybolacak.{" "}
				</List.Item>{" "}
				<List.Item>
					{" "}
					Kazancınızı belirlemek için, bilgisayar ekranda kalan simit üzerinde
					rastgele bir nokta seçecek.{" "}
				</List.Item>{" "}
				<List.Item>
					{" "}
					Eğer bu nokta, simitin renkli kısmına düşerse 10000 puan, aksi
					takdirde 0 puan kazanacaksınız.
				</List.Item>
			</List>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100vw",
					alignContent: "center",
					marginTop: "-4ch",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
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
					<Button
						style={{ marginBlock: "auto" }}
						onClick={() => {
							setShowResult((s) => !s);
						}}
					>
						{showResult ? "Tekrar dene" : "Sonucu Göster"}
					</Button>
				</div>
				<Circles
					value={sliderValue}
					bsr={true}
					showResult={showResult}
					chooseCircle={Math.random() > 0.5 ? "blue" : "red"}
				/>
			</div>
		</Carousel.Slide>
	);
};

export default Slide4BSR;
