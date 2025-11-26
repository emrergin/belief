import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide1 = ({
	numberOfRounds,
	isOurTreatment,
}: {
	numberOfRounds: number;
	isOurTreatment: boolean;
}) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Bu deney {numberOfRounds} &quot;tur&quot;dan oluşmaktadır.
				</List.Item>
				<List.Item>
					{" "}
					Her turda, bilgisayar size içinde 100 tane bilye bulunan bir torba
					sunacak. Torbadaki bilyeler{" "}
					<b className={circleStyles.redText}>kırmızı</b> ve{" "}
					<b className={circleStyles.blueText}>mavi</b> renkte olacak. Torbanın
					içeriği her tur değişir.
				</List.Item>
				<List.Item>
					Tur başlarında torbada kaç tane{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye ve kaç tane{" "}
					<b className={circleStyles.blueText}>mavi</b> bilye olduğunu
					göreceksiniz. Bilgisayar daha sonra torbadan rastgele bir bilye
					çekecek.
				</List.Item>
				<List.Item>
					Göreviniz bilgisayar tarafından rastgele çekilen bilyenin{" "}
					<b className={circleStyles.redText}>kırmızı</b>{" "}
					{isOurTreatment && (
						<span>
							yahut <b className={circleStyles.blueText}>mavi</b>
						</span>
					)}{" "}
					olma ihtimalini tahmin etmek. Tahmininizi yapmak için 0 ile 100
					arasında bir sayı seçmeniz gerekecek.{" "}
					{!isOurTreatment && (
						<span>
							Daha yüksek bir sayı, bilyenin kırmızı olma ihtimalinin daha
							yüksek olduğunu düşündüğünüz anlamına gelir.
						</span>
					)}{" "}
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide1;
