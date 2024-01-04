import { List } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import customStyles from "@/styles/Custom.module.css";

const Slide3 = () => {
	return (
		<Carousel.Slide>
			<List className={customStyles.entryText}>
				<List.Item>
					<b>Kullanılan Torba:</b> Zar atışının sonucu size önceden
					söylenmeyecek, bu nedenle çekiliş için hangi torbanın kullanıldığını
					bilemezsiniz. Her turda, her katılımcı için ayrı bir zar atılır.
				</List.Item>
				<List.Item>
					<b>Çekilişler kişiye özeldir:</b> Bilgisayar zar atışı sonrası
					kullanılacak torbayı belirler. Sonra o torbadan bir veya daha fazla
					bilye çekilir. Bu çekilişler, hangi torbanın kullanıldığını tahmin
					etmek için size ipucu sağlayabilir.
				</List.Item>
				<List.Item>
					<b>Çekilişler birbirinden bağımsızdır:</b> Bazı turlarda aynı torbadan
					birden fazla çekiliş görebilirsiniz. Bunların sonucunu çekiliş
					sırasıyla göreceksiniz. Çekilişler bağımsız olarak yapılacak, yani
					sanki torbayı sallayacak, içinden rastgele bir bilye seçecek, bilyeyi
					size gösterecek, torbaya geri koyacak ve rastgele başka bir bilye
					çekmeden önce torbayı tekrar karıştıracakmışız gibi düşünebilirsiniz.
					Yani bir torbanın içindeki bilyelerin sayıları ve renkleri bütün
					çekilişlerden önce her zaman aynı olacak.
				</List.Item>
				<List.Item>
					<b>Her çekiliş sonrası bilye torbaya geri konur:</b> Çekilen bilye,
					her çekilişten sonra torbaya geri konmuş gibi olur.
				</List.Item>
			</List>
		</Carousel.Slide>
	);
};

export default Slide3;
