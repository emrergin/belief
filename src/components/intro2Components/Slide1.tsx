import { List } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide1 = ({
	numberOfRounds,
	aBlue,
	bBlue,
}: {
	numberOfRounds: number;
	aBlue: number;
	bBlue: number;
}) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Bu deney {numberOfRounds} &quot;tur&quot;dan oluşmaktadır.
				</List.Item>
				<List.Item>
					{" "}
					Her turda, bilgisayar size içinde 100 tane bilye bulunan iki torba
					sunacak. Torbadaki bilyeler{" "}
					<b className={circleStyles.redText}>kırmızı</b> ve{" "}
					<b className={circleStyles.blueText}>mavi</b> renkte olacak. Bu
					torbaları <b className={circleStyles.redText}>kırmızı torba</b> ve{" "}
					<b className={circleStyles.blueText}>mavi torba</b> olarak
					adlandıracağız.
				</List.Item>
				<List.Item>
					<b className={circleStyles.redText}>Kırmızı torba</b> içinde{" "}
					<b>{100 - aBlue}</b> tane kırmızı ve <b>{aBlue}</b> tane mavi bilye
					olacak. <b className={circleStyles.blueText}>Mavi torba</b> içinde ise{" "}
					<b>{bBlue}</b> tane mavi ve <b>{100 - bBlue}</b> tane kırmızı bilye
					olacak.
				</List.Item>
				<List.Item>
					Bir sonraki sayfada bu torbaların resimlerini görebilirsiniz.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide1;
