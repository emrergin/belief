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
				<List.Item> Her turda, size bir cümle göstereceğiz.</List.Item>
				<List.Item>
					Bu cümle, <b className={circleStyles.blueText}>doğru</b> veya{" "}
					<b className={circleStyles.redText}>yanlış</b> olabilir.
				</List.Item>
				<List.Item>
					Göreviniz size gösterilen cümlenin doğru yahut yanlış olma ihtimalini
					tahmin etmek. Tahmininizi yapmak için 0 ile 100 arasında bir sayı
					seçmeniz gerekecek. {/* {!isOurTreatment && ( */}
					<span>
						Daha yüksek bir sayı, cümlenin doğru olma ihtimalinin daha yüksek
						olduğunu düşündüğünüz anlamına gelir.
					</span>
					{/* )}{" "} */}
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide1;
