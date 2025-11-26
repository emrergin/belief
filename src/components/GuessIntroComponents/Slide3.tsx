import Circles from "../experimentComponents/Circles";
import Slider from "../experimentComponents/Slider";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";

const Slide3 = ({ treatment }: { treatment: "QSR2" | "BSR2" }) => {
	const [sliderValue, setSliderValue] = useState(50);
	return (
		<Carousel.Slide>
			<List
				className={customStyles.entryText}
				// style={{ marginTop: "0px", fontSize: "0.8rem" }}
				style={{ marginTop: "0px", scale: "0.9" }}
			>
				<List.Item>
					Tahminlerinizi yaptıktan sonra seçtikten sonra, deneyden elde
					edeceğiniz kazancı belirlemek için{" "}
					<b className={circleStyles.redText}>kırmızı</b> ve{" "}
					<b className={circleStyles.blueText}>mavi</b> renkte iki simit
					kullanacağız.
				</List.Item>
				<List.Item>
					Kaydırma çubuğunu hareket ettirdiğinizde simitlerin boyutlarının
					değiştiğini göreceksiniz.
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
					bsr={treatment === "BSR2"}
					showResult={false}
					chooseCircle={"blue"}
				/>
			</div>
		</Carousel.Slide>
	);
};

export default Slide3;
