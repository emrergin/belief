import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

import { Inter } from "next/font/google";
import { useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

function Intro2({
	aBlue,
	bBlue,
	treatment,
}: {
	aBlue: number;
	bBlue: number;
	treatment: string;
}) {
	const [instruction, setInstruction] = useState(1);
	const isButtonActive = useRef(true);

    function nextInstruction(){
        setInstruction(instruction+1);
        isButtonActive.current=false;
        setTimeout(()=>{
            isButtonActive.current=true;
        },1000)
    }
	return (
		<>
			<ul className={customStyles.entryText}>
				<li className={inter.className}>
					Kırmızı torbada <b>{aBlue}</b> adet{" "}
					<b className={circleStyles.blueText}>mavi</b> top,{" "}
					<b>{100 - aBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> top var.
				</li>
				<li className={inter.className}>
					Mavi torbada <b>{bBlue}</b> adet{" "}
					<b className={circleStyles.blueText}>mavi</b> top,{" "}
					<b>{100 - bBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> top var.
				</li>
				<li className={inter.className}>
					Her turda, bilgisayar ilk olarak bu iki torbadan birisini
					rastgele seçecek. İki bardağın seçilme şansı da aynıdır.
					Hangi torbanın seçildiği size gösterilmeyecek.
				</li>
				<li className={inter.className}>
					Ardından, ilgili torba kullanılarak, o torbadan 0 ila 6 tane
					top çekilecek ve bu çekilişin sonucu size gösterilecek.
				</li>
				<li className={inter.className}>
					Siz sadece bu çekilişlerin sonucunu göreceksiniz. Ardından
					size, sizce o tur için A torbasının seçilmiş olma
					ihtimalinin yüzde kaç olduğunu soracağız.
				</li>
				<li className={inter.className}>
					Burada kaydırıcıyı sağa ya da sola sürükleyerek size göre
					Kırmızı torbanın kullanılmış olma ihtimalini
					bildireceksiniz. Bu esnada aşağıdaki kırmızı simidin ve mavi
					simidin büyüklüklerinin değiştiğini görebilirsiniz. Daha
					büyük bir simit daha çok kazanca karşılık gelir ve bu
					miktarın nasıl değiştiği de kaydırıcı hareket ettikçe
					görülebilir.
				</li>

				<li className={inter.className}>
					Karar verdikten sonra, gerçekte hangi bardağın kullanıldığı
					size bildirilecektir. Şayet o turda Kırmızı torba
					kullanılmış ise, kazancınız kırmızı simidin karşılık geldiği
					miktar olacak. Şayet o turda Mavi torba kullanılmış ise,
					kazancınız mavi simidin karşılık geldiği miktar olacak.
				</li>

				{/* </ul> */}
			</ul>
            <button disabled={!isButtonActive} onClick={nextInstruction}>Devam</button>
		</>
	);
}

export default Intro2;
