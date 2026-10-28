import customStyles from "@/styles/Custom.module.css";
import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import NSRExpression from "../experimentComponents/NSRExpression";

const Slide3NSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Diyelim ki, cümlenin yanlış olmasına yüksek bir ihtimal verdiniz. Az
					önceki formüller, 10000 kazanmanızın ihtimalinin cümle yanlışsa
					yüksek, doğruysa düşük olduğunu gösterir. Bu yüzden, cümlenin yanlış
					mı yoksa doğru mu olduğunu dikkate almalısınız.
				</List.Item>
				<List.Item>
					Bir örnek olarak, cümlenin yanlış olması ihtimalini 100 olarak
					belirlediğinizi düşünelim. O zaman, cümle gerçekten yanlışsa 10000
					puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="100-100" inline={true} /> = 100 olur. Eğer
					cümle aslında doğruysa, 10000 puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="100" inline={true} /> = 0 olur. Dolayısıyla,
					tahmininiz cümlenin doğruluğu hakkındaki düşündüğünüz olasılıkla
					alakalı olmalıdır.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide3NSR;
