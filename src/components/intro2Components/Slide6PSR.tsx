import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { NumberInput } from "@mantine/core";
import { useState } from "react";
import PSR from "../experimentComponents/PSR";
const Slide6PSR = ({ isBayesian }: { isBayesian: boolean }) => {
	const [sliderValue, setSliderValue] = useState<"" | number>(50);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(-1);
	return (
		<Carousel.Slide>
			{/* <List
				className={customStyles.entryText}
				// style={{ marginTop: "0px", fontSize: "0.8rem" }}
			>
				<List.Item>
					Sonucu Gör&apos;e bastığınızda, eğer ödülü kazandıysanız, sayılar
					yeşille boyanacak. Seçtiğiniz ihtimalin etrafındaki renk,{" "}
					{isBayesian ? "torbanın" : "bilyenin"} asıl rengidir.
				</List.Item>{" "}
			</List> */}

			<div
				className={customStyles.entryText}
				style={{
					display: "flex",
					flexDirection: "column",
					alignContent: "center",
				}}
			>
				<NumberInput
					label="Kırmızı torbaya verdiğiniz ihtimal"
					description="Yüzdelik değer"
					placeholder="0-100"
					onChange={setSliderValue}
					value={sliderValue}
					style={{ width: "15ch", marginInline: "auto" }}
				/>
				<PSR
					value={Number(sliderValue)}
					showResult={showResult}
					chosenColor={Math.random() > 0.5 ? "blue" : "red"}
					setCurrentPoints={setScore}
					isBayesian={isBayesian}
				/>
				{showResult && (
					<b style={{ marginInline: "auto" }}>
						Bu, deneyde gerçek bir tur olsaydı, {score} kazanırdınız.
					</b>
				)}
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
					{showResult ? "Bir Daha Dene" : "Sonucu Gör"}
				</button>
			</div>
		</Carousel.Slide>
	);
};

export default Slide6PSR;
