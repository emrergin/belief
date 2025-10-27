import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const Slide5PSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Çubuk üzerinde torbanın{" "}
					<b className={circleStyles.redText}>kırmızı</b> yahut{" "}
					<b className={circleStyles.blueText}>mavi</b> olma ihtimalini
					seçtikten sonra, deneyden elde edeceğiniz kazancı belirlemek için
					bilgisayar 0 ila 100 arasında, ondalıklı sayılar da dahil olmak üzere,
					rastgele iki tane sayı seçecek.
				</List.Item>
				<List.Item>
					Eğer torbanın kırmızı olma olasılığı için belirlediğiniz yüzdelik,
					bilgisayarın rastgele seçtiği her iki sayıdan da <b>büyük</b>se ve{" "}
					torbanın gerçek rengi <b className={circleStyles.redText}>kırmızı</b>
					ysa,
				</List.Item>
				<div style={{ textAlign: "center" }}>veya</div>
				<List.Item>
					Eğer torbanın kırmızı olma olasılığı için belirlediğiniz yüzdelik,
					bilgisayarın rastgele seçtiği her iki sayıdan da <b>küçük</b>se ve
					torbanın gerçek rengi <b className={circleStyles.blueText}>mavi</b>
					yse,
				</List.Item>
				<div style={{ textAlign: "center", marginTop: "5ch" }}>
					10000 puan, aksi takdirde sıfır puan kazanacaksınız.
				</div>
			</List>
		</Carousel.Slide>
	);
};

export default Slide5PSR;
