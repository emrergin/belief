import { Carousel } from "@mantine/carousel";
import { List } from "@mantine/core";
import customStyles from "@/styles/Custom.module.css";

const NITExplanation = ({ isBayesian }: { isBayesian: boolean }) => {
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
					Bu deneyde kullanılan ödeme kuralı, SİZCE en doğru tahmininizi
					bildirerek ödülü kazanma şansınızı en üst düzeye çıkarmanızı
					sağlayacak şekilde tasarlanmıştır. Deney sonunda talep edenlere, bu
					kuralın ayrıntıları yazılı olarak verilecek.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default NITExplanation;
