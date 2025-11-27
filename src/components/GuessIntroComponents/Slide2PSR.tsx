import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const Slide2BSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Ardından, bilgisayar 0 ila 100 arasında, ondalıklı sayılar da dahil
					olmak üzere, rastgele iki sayı seçecek. Bu sayıların seçimi
					birbirinden tamamıyla bağımsız.
				</List.Item>
				<List.Item>
					Eğer bilye <b className={circleStyles.redText}>kırmızı</b>ysa ve
					tahmininiz bu sayıların en az birinden <b>büyükse</b> 10000 puan, aksi
					takdirde sıfır puan kazanacaksınız.
				</List.Item>
				<List.Item>
					Eğer bilye <b className={circleStyles.blueText}>mavi</b>yse ve
					tahmininiz bu sayıların en az birinden <b>küçükse</b> 10000 puan, aksi
					takdirde sıfır puan kazanacaksınız.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide2BSR;
