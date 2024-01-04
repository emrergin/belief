import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide1 = ({
	numberOfRounds,
	diceText,
	equal,
}: {
	numberOfRounds: number;
	diceText: [string, string];
	equal: boolean;
}) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					<b>Turlar:</b> Deneyimiz {numberOfRounds} &quot;tur&quot;dan oluşuyor.
				</List.Item>
				<List.Item>
					<b>Hangi Torbanın Kullanıldığını Tahmin Etme:</b> Her turda,
					bilgisayar bir &quot;torba&quot; seçecek ve içindeki renkli bilyelerin
					çekilişini simüle edecektir. İki farklı torba var, her biri farklı
					sayıda renkli bilye içeriyor. Bilgisayarın hangi torbayı seçtiğini
					tahmin etmeniz gerekecek.
				</List.Item>
				<List.Item>
					<b>Bilgisayar Kullanacağı Torbayı Nasıl Seçiyor:</b>
					Her turda, bilgisayar 1 ila 6 arasındaki bir sayıyı rastgele seçer.
					Bu, bir zar atışını simgeler.
					<List style={{ margin: "15px" }} size="xl">
						<List.Item>
							Zar sonucu {diceText[0]} gelirse, çekiliş{" "}
							<b className={circleStyles.blueText}>Mavi torba</b>
							dan yapılır. (Bu torba daha fazla mavi bilye içerir.)
						</List.Item>
						<List.Item>
							Zar sonucu {diceText[1]} gelirse, çekiliş{" "}
							<b className={circleStyles.redText}>Kırmızı torba</b>
							dan yapılır. (Bu torba daha fazla kırmızı bilye içerir.)
						</List.Item>
					</List>
					{equal && (
						<span>Bu nedenle, iki torbanın da seçilme şansı aynıdır.</span>
					)}
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide1;
