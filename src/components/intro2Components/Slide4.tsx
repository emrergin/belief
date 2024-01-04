import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import customStyles from "@/styles/Custom.module.css";

const Slide4 = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					Çekiliş sonuçlarını gördükten sonra, kullanılan torbanın Kırmızı torba
					olma ihtimalini
					<b>
						<em> yüzde olarak</em>
					</b>{" "}
					belirlemelisiniz.
				</List.Item>
				<List.Item>
					Torbaların içeriğini göz önünde bulundurarak, hem torbanın nasıl
					seçildiğine hem de alakalı çekiliş veya çekilişlerin sonucuna ilişkin
					bilgileri kullanabilirsiniz.
				</List.Item>
				<List.Item>
					Şayet kararınız 0 ise, bu Kırmızı torbanın kullanılma ihtimalinin
					olmadığını düşündüğünüz anlamına gelir. Kararınız 100 ise, Kırmızı
					torbanın kullanıldığından kesinlikle emin olduğunuz anlamına gelir.
					Kararınız 50 ise, her bir torbanın kullanılmış olma ihtimalinin eşit
					olduğunu düşündüğünüz anlamına gelir. Kırmızı torbanın kullanılma
					ihtimalinin daha yüksek olduğunu düşünüyorsanız, 50&apos;nin üzerinde
					bir sayı seçin. Mavi torbanın kullanılma ihtimalinin daha yüksek
					olduğunu düşünüyorsanız 50&apos;nin altında bir sayı seçin.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide4;
