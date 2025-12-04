import customStyles from "@/styles/Custom.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import NSRExpression from "../experimentComponents/NSRExpression";

const Slide3NSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Bilyenin kırmızı olması için yüksek bir rakam belirlediğinizi
					varsayalım. Az önceki formüller, 10000 kazanmanızın ihtimalinin
					bilgisayar kırmızı bir bilye çekerse yüksek, mavi bir bilye çekerse
					ise düşük olduğunu gösterir. Bu yüzden, bilgisayarın kırmızı mı yoksa
					mavi bir bilye mi çekmesinin daha olası olduğunu dikkate almalısınız.
				</List.Item>
				<List.Item>
					Bir örnek olarak, bilgisayarın kırmızı bir bilye çekme ihtimalini 100
					olarak belirlediğinizi düşünelim. O zaman, bilgisayar kırmızı bir
					bilye çekerse 10000 puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="100-100" inline={true} /> = 100 olur. Eğer
					bilgisayar mavi bir bilye çekerse, 10000 puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="100" inline={true} /> = 0 olur. Bu yüzden,
					tahmininiz bu iki durumun hangisinin daha olası olduğu konusundaki
					fikrinize bağlı olmalıdır.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide3NSR;
