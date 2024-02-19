import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide1 = ({ numberOfRounds }: { numberOfRounds: number }) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Bu deney {numberOfRounds} &quot;tur&quot;dan oluşmaktadır.
				</List.Item>
				<List.Item>
					{" "}
					Her turda, bilgisayar size içinde 100 tane bilye bulunan bir torba
					sunacak. Topların bazıları{" "}
					<b className={circleStyles.redText}>kırmızı</b>, bazıları ise{" "}
					<b className={circleStyles.blueText}>mavi</b>dir. Her turun başında
					size yeni bir torba verilecek. Bu nedenle, torbanın bileşimi her turda
					farklı olacak.
				</List.Item>
				<List.Item>
					Her turun başında bilgisayar size bilyenin tam bileşimini gösterecek.
					Yani torbada kaç tane <b className={circleStyles.redText}>kırmızı</b>{" "}
					bilye ve kaç tane <b className={circleStyles.blueText}>mavi</b> bilye
					olduğunu göreceksiniz. Bilgisayar daha sonra torbadan rastgele bir
					bilye çekecek.
				</List.Item>
				<List.Item>
					Göreviniz bilgisayar tarafından rastgele çekilen bilyenin{" "}
					<b className={circleStyles.redText}>kırmızı</b> olma olasılığını
					tahmin etmek. Tahmininizi yapmak için 0 ile 100 arasında bir sayı
					seçmeniz gerekecek. Daha yüksek bir sayı, bilyenin kırmızı olma
					ihtimalinin daha yüksek olduğunu düşündüğünüz anlamına gelir.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide1;
