import { List } from "@mantine/core";
import Slider from "../experimentComponents/Slider";
import { Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import customStyles from "@/styles/Custom.module.css";
import { useState } from "react";
import Circles from "../experimentComponents/Circles";

const Slide6BSR = () => {
	const [showResult, setShowResult] = useState(false);
	const [sliderValue, setSliderValue] = useState(50);

	return (
		<Carousel.Slide>
			<List
				className={customStyles.entryText}
				style={{ marginTop: "0px", scale: "0.9" }}
			>
				<List.Item>
					Karar ekranında, bahsettiğimiz kaydırıcının tam altında kırmızı ve
					mavi birer simit olacak. Kaydırıcıyı sağa ya da sola sürükledikçe
					kırmızı simidin ve mavi simidin büyüklüklerinin değiştiğini
					görebilirsiniz.
				</List.Item>
				<List.Item>
					Karar verdikten sonra, çekiliş için gerçekte hangi torba kullanıldıya
					yalnızca o renkteki simit kalacak, diğer simit kaybolacak. Ardından,
					bu simit ve içindeki alanın teşkil ettiği daireden rastgele bir nokta
					seçilecek.
				</List.Item>
				<List.Item>
					Eğer bu nokta ilgili simite, yani tam dairenin renkli kısmına denk
					düşerse, kazancınız 10000 puan, aksi takdirde 0 puan olacak.
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

export default Slide6BSR;
