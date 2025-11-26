import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide3 = ({
	diceText,
	equal,
	isOurTreatment,
}: {
	diceText: [string, string];
	equal: boolean;
	isOurTreatment: boolean;
}) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Her turun başında, bilgisayar rastgele bir torba seçecek
					{equal && (
						<span>
							{" "}
							ve bilgisayarın kırmızı veya mavi torbayı seçme olasılığı eşit
							olacak
						</span>
					)}
					.
				</List.Item>
				<List.Item>
					Bilgisayarın bir zar atışı yaptığını ve {diceText[1]} gelirse{" "}
					<b className={circleStyles.redText}>kırmızı</b>, {diceText[0]} gelirse{" "}
					<b className={circleStyles.blueText}>mavi</b> torbayı seçtiğini
					düşünebilirsiniz.
				</List.Item>
				<List.Item>
					Bilgisayarın hangi torbayı seçtiğini bilmeyeceksiniz.
				</List.Item>
				<List.Item>
					Bilgisayar torbayı seçtikten sonra, bu torbadan rastgele bir veya
					birden fazla bilye çekecek. Her bilye çekildikten sonra torbaya geri
					konulacak.
				</List.Item>
				<List.Item>
					Çekiliş sonuçlarını gördükten sonra sizden bilgisayarın seçtiği
					torbanın <b className={circleStyles.redText}>kırmızı</b>{" "}
					{isOurTreatment && (
						<span>
							yahut <b className={circleStyles.blueText}>mavi</b>
						</span>
					)}{" "}
					olma ihtimalini belirlemenizi isteyeceğiz.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide3;
