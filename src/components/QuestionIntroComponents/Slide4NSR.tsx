import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";
import NSRExpression from "../experimentComponents/NSRExpression";

const Slide4NSR = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					İşte, 10000 puan kazanmanızın nasıl hem tahmininize hem de cümlenin
					doğru ya da yanlış olmasıyla alakalı olduğuna dair iki örnek daha.
				</List.Item>
				<List.Item>
					<b>Örnek 1.</b> Varsayalım ki, cümlenin yanlış olmasına olmasına %70
					ihtimal verdiniz. Turun sonunda, cümlenin yanlış olduğu açıklandı. O
					zaman, 10000 puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="100-70" inline={true} /> = 91 olur.
				</List.Item>
				<List.Item>
					<b>Örnek 2.</b> Bir önceki örnekte, cümlenin aslında doğru olduğunu
					varsayalım. O zaman, 10000 puan kazanma ihtimaliniz,{" "}
					<NSRExpression nominator="70" inline={true} /> = 51 olur.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide4NSR;
