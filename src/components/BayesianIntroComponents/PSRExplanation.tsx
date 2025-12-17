import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

const PSRExplanation = ({ isBayesian }: { isBayesian: boolean }) => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Her tur, 10000 yahut 0 puan kazanacaksınız. Kazancınız, hem
					tahmininize, hem de bilgisayarın rastgele{" "}
					{isBayesian ? "belirlediği torbanın" : "çektiği bilyenin"} rengine
					bağlıdır.
				</List.Item>{" "}
				<List.Item>
					10000 puanı kazanma ihtimaliniz şu şekilde hesaplanır:
				</List.Item>
				<List.Item>
					Tahmininizi yaptıktan sonra, bilgisayar 0 ila 100 arasında, ondalıklı
					sayılar da dahil olmak üzere, rastgele iki sayı seçecek. Bu sayıların
					seçimi birbirinden tamamıyla bağımsız.
				</List.Item>
				<List.Item>
					<p>
						<b className={circleStyles.redText}>
							Eğer {isBayesian ? "torba" : "bilye"} kırmızıysa,
						</b>
					</p>
					<p>
						ve <b>kırmızı</b> {isBayesian ? "torbaya" : "bilyeye"} verdiğiniz
						ihtimal, bu sayıların en az birinden <b>büyük</b>
						se 10000 puan, aksi takdirde sıfır puan kazanacaksınız.
					</p>
				</List.Item>
				<List.Item>
					<p>
						<b className={circleStyles.blueText}>
							Eğer {isBayesian ? "torba" : "bilye"} maviyse,
						</b>
					</p>
					<p>
						ve <b>kırmızı</b> {isBayesian ? "torbaya" : "bilyeye"} verdiğiniz
						ihtimal, bu sayıların en az birinden <b>küçük</b>se 10000 puan, aksi
						takdirde sıfır puan kazanacaksınız.
					</p>
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default PSRExplanation;
