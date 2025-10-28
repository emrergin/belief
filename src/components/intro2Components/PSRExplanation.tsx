import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const PSRExplanation = ({ isBayesian }: { isBayesian: boolean }) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Çubuk üzerinde {isBayesian ? "torbanın" : "bilyenin"}{" "}
					<b className={circleStyles.redText}>kırmızı</b> yahut{" "}
					<b className={circleStyles.blueText}>mavi</b> olma ihtimalini
					seçtikten sonra, deneyden elde edeceğiniz kazancı belirlemek için
					bilgisayar 0 ila 100 arasında, ondalıklı sayılar da dahil olmak üzere,
					rastgele iki tane sayı seçecek. Bu sayıların seçimi birbirinden
					tamamıyla bağımsız.
				</List.Item>
				<List.Item>
					Eğer {isBayesian ? "torbanın" : "bilyenin"} kırmızı olma olasılığı
					için belirlediğiniz yüzdelik, bilgisayarın rastgele seçtiği sayıların
					en az birinden <b>büyük</b>se ve{" "}
					{isBayesian ? "torbanın" : "bilyenin"} gerçek rengi{" "}
					<b className={circleStyles.redText}>kırmızı</b>
					ysa,
				</List.Item>
				<div style={{ textAlign: "center" }}>veya</div>
				<List.Item>
					Eğer {isBayesian ? "torbanın" : "bilyenin"} mavi olma olasılığı için
					belirlediğiniz yüzdelik, bilgisayarın rastgele seçtiği sayıların en az
					birinden <b>büyük</b>se ve {isBayesian ? "torbanın" : "bilyenin"}{" "}
					gerçek rengi <b className={circleStyles.blueText}>mavi</b>
					yse,
				</List.Item>
				<div style={{ textAlign: "center", marginTop: "5ch" }}>
					10000 puan, aksi takdirde sıfır puan kazanacaksınız.
				</div>
			</List>
		</Carousel.Slide>
	);
};

export default PSRExplanation;
