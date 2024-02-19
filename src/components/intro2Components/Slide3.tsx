import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide3 = ({
	diceText,
	equal,
}: {
	diceText: [string, string];
	equal: boolean;
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
					Bilgisayarın bir zar atışı yaptığını ve {diceText[0]} gelirse mavi,{" "}
					{diceText[1]} gelirse kırmızı torbayı seçtiğini düşünebilirsiniz.
				</List.Item>
				<List.Item>
					Bilgisayarın hangi torbayı seçtiğini bilmeyeceksiniz.
				</List.Item>
				<List.Item>
					Bilgisayar torbayı belirledikten sonra, seçtiği torbanın içinden
					rastgele bir veya birden fazla bilye çekecek. Her bilye çekildikten
					sonra torbaya geri konulacak.
				</List.Item>
				<List.Item>
					Çekiliş sonuçlarını gördükten sonra sizden bilgisayarın seçtiği
					torbanın <b className={circleStyles.redText}>kırmızı</b> olma
					ihtimalini <b>yüzde</b> olarak belirlemenizi isteyeceğiz.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide3;
