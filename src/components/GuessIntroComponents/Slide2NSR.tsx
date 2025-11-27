import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import NSRExpression from "../experimentComponents/NSRExpression";

const Slide2NSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Her tur, 10000 yahut 0 puan kazanacaksınız. Kazancınız, hem
					tahmininize, hem de bilgisayarın rastgele çektiği bilyenin rengine
					bağlıdır.
				</List.Item>
				<List.Item>
					10000 puanı kazanma ihtimaliniz şu şekilde hesaplanır:
					<List className={customStyles.subList}>
						<List.Item>
							Bilye <b className={circleStyles.redText}>kırmızı</b>ysa 10000
							puan kazanma ihtimaliniz:
							<NSRExpression nominator={"100 - tahmininiz"} />
						</List.Item>
						<List.Item>
							Bilye <b className={circleStyles.blueText}>mavi</b>yse 10000 puan
							kazanma ihtimaliniz: <NSRExpression nominator={"tahmininiz"} />
						</List.Item>
					</List>
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide2NSR;
