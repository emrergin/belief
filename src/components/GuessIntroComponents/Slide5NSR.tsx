import { Carousel } from "@mantine/carousel";
import { List, NumberInput } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import NSR from "../experimentComponents/NSR";
import { useState } from "react";

const Slide5NSR = () => {
	const [sliderValue, setSliderValue] = useState<"" | number>(70);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(-1);
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					10000 puan kazanıp kazanmadığınıza karar vermek için bilgisayar 0 ila
					100 arasında bir sayı seçecek. Bütün sayıların seçilme ihtimalleri
					aynıdır. Eğer bilgisayarın seçtiği sayı sizin 10000 puan kazanma
					ihtimalinizden küçükse veya bu ihtimale eşitse, o zaman 10000 puanı
					kazanırsınız. Aksi takdirde, 0 puan kazanırsınız.
				</List.Item>
				<List.Item>
					Bir önceki ekrandaki birinci örnekte, bilgisayarın rastgele seçtiği
					sayı 91&apos;e eşit veya 91&apos;den küçükse, 10000 puan kazanırsınız,
					aksi takdirde 0 puan kazanırsınız.
				</List.Item>
			</List>
			<div style={{ display: "flex", maxWidth: "90ch", marginInline: "auto" }}>
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
				<div>
					<NSR
						value={Number(sliderValue)}
						showResult={showResult}
						chosenColor={Math.random() > 0.5 ? "blue" : "red"}
						setCurrentPoints={setScore}
						isBayesian={false}
					/>
					{showResult && (
						<b style={{ marginInline: "auto" }}>
							Bu, deneyde gerçek bir tur olsaydı, {score} kazanırdınız.
						</b>
					)}
				</div>
			</div>
		</Carousel.Slide>
	);
};

export default Slide5NSR;
