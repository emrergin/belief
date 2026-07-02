import { Carousel } from "@mantine/carousel";
import { List, NumberInput } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import { useState } from "react";
import PSR from "../experimentComponents/PSR";

const Slide3NIT = () => {
	const [sliderValue, setSliderValue] = useState<"" | number>(50);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(-1);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Aşağıda temsilî bir tur ekranını görüp, deneyebilirsiniz.
				</List.Item>
			</List>
			<div
				style={{
					display: "flex",
					maxWidth: "90ch",
					marginInline: "auto",
					justifyContent: "flex-start",
				}}
			>
				<NumberInput
					label="Kırmızı bilyeye verdiğiniz ihtimal"
					description="Yüzdelik değer"
					placeholder="0-100"
					onChange={setSliderValue}
					value={sliderValue}
					style={{ width: "15ch", marginInline: "auto" }}
					disabled={showResult}
				/>
				<button
					onClick={() => {
						setShowResult(!showResult);
					}}
					style={{
						marginInline: "auto",
						padding: "1ch 2ch",
						marginTop: "2ch",
						height: "3em",
					}}
				>
					{showResult ? "Bir Daha Dene" : "Sonucu Gör"}
				</button>
				<div
					style={{
						width: "55ch",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<PSR
						value={Number(sliderValue)}
						showResult={showResult}
						chosenColor={Math.random() > 0.5 ? "blue" : "red"}
						setCurrentPoints={setScore}
						isBayesian={false}
						information={false}
					/>
					{showResult && (
						<b
							style={{
								display: "block",
							}}
						>
							Bu, deneyde gerçek bir tur olsaydı, {score} kazanırdınız.
						</b>
					)}
				</div>
			</div>
		</Carousel.Slide>
	);
};

export default Slide3NIT;
