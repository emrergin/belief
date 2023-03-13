import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

import { Inter } from "next/font/google";
import { useRef, useState, useCallback, useEffect } from "react";

// import { SetStateAction } from "react";
// import { useStateValue, setPhase } from "@/state";
import { Phase } from "@/state/types";

const inter = Inter({ subsets: ["latin"] });

import Circles from "./Treatment";

import useEmblaCarousel from "embla-carousel-react";
import Slider from "./experimentComponents/Slider";
import BagHolder from "./experimentComponents/BagHolder";

function Intro2({
	aBlue,
	bBlue,
	treatment,
	phaseFunction
}: {
	aBlue: number;
	bBlue: number;
	treatment: string;
	phaseFunction: (p:Phase)=>void;
}) {
	// const [instruction, setInstruction] = useState(1);
	// const isButtonActive = useRef(true);
	const [sliderValue, setSliderValue] = useState(50);
	const [slideIndex, setSlideIndex] = useState(0);
	const [showNextPhase, setShowNextPhase] = useState(false);

	// const [, dispatch] = useStateValue();

	const [emblaRef, emblaApi] = useEmblaCarousel({ draggable: false });

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
		setSlideIndex(emblaApi?.selectedScrollSnap() || 0);
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
		setSlideIndex(emblaApi?.selectedScrollSnap() || 0);
	}, [emblaApi]);

	useEffect(() => {
		if (slideIndex === 4) {
			setShowNextPhase(true);
		}
	}, [slideIndex]);

	// function startExperiment() {
	// 	// console.log(Phase.Qsr)
	// 	dispatch(setPhase(Phase.Main));
	// }

	// function nextInstruction() {
	// 	// setInstruction(instruction + 1);
	// 	emblaApi?.slideNodes();
	// 	isButtonActive.current = false;
	// 	setTimeout(() => {
	// 		isButtonActive.current = true;
	// 	}, 1000);
	// }
	return (
		<>
			<div
				className={customStyles.embla + " " + customStyles.entryText}
				ref={emblaRef}
			>
				<div className={customStyles.embla__container}>
					<div className={customStyles.embla__slide}>
						<ul className={customStyles.entryText}>
							<li className={inter.className}>
								<b>Turlar:</b> Deneyimiz otuz &quot;tur&quot;dan
								oluşuyor.
							</li>
							<li className={inter.className}>
								<b>
									Hangi Torbanın Kullanıldığını Tahmin Etme:
								</b>{" "}
								Her turda, bilgisayarı bir &quot;torba&quot;dan,
								bir veya daha fazla renkli bilye çekilişini
								simüle etmek için kullanacağız. İçlerinde farklı
								adetlerde renkli bilye içeren iki tip torba var.
								Bilgisayarın hangi torbayı seçmiş olabileceğini
								düşünerek bir karar vermenizi istiyoruz.
							</li>
							<li className={inter.className}>
								<b>
									Bilgisayar Kullanacağı Torbayı Nasıl
									Seçiyor:
								</b>{" "}
								Her turda bilgisayar ilk olarak, 1, 2, 3, 4, 5,
								6 sayılarından birini rastgele seçecek. Bunu,
								tavla zarı gibi altı yüzlü bir zar atışı olarak
								düşünebilirsiniz.
								<ul style={{ margin: "15px" }}>
									<li>
										Zar sonucu 1, 2 veya 3 ise, çekiliş daha
										fazla mavi bilye içeren Mavi torbadan
										yapılır.
									</li>
									<li>
										Zar sonucu 4, 5 veya 6 ise, çekiliş daha
										fazla kırmızı bilye içeren Kırmızı
										torbadan yapılır.
									</li>
								</ul>
								Bu nedenle, iki torbanın da seçilme şansı
								aynıdır.
							</li>
						</ul>
					</div>
					<div className={customStyles.embla__slide}>
						<BagHolder aBlue={aBlue} bBlue={bBlue} />
					</div>
					<div className={customStyles.embla__slide}>
						<ul className={customStyles.entryText}>
							<li className={inter.className}>
								<b>Kullanılan Torba:</b> Zar atışının sonucu
								size önceden söylenmeyecek, bu nedenle çekiliş
								için hangi torbanın kullanıldığını bilemezsiniz.
								Zar, her turda her kişi için ayrı ayrı atılır,
								bu nedenle sizin için kullanılan torba deneye
								katılan başka bir kişi için kullanılan torbayla
								aynı olabilir veya olmayabilir.
							</li>
							<li className={inter.className}>
								<b>Çekilişler kişiye özeldir:</b> Bilgisayar zar
								atışı sonrası kullanılacak torbayı
								belirlediğinde, o torbadan rastgele çekilecek
								bir veya daha fazla bilye gösterilebilir. Bu
								çekilişler size sizin gördüğünüz değerler için
								hangi torbanın kullanıldığı hakkında bilgi
								verebilse de, kullanılan torba kişiden kişiye
								değişebileceğinden, başkaları için kullanılan
								torba hakkında herhangi bir bilgi sağlamaz.
							</li>
							<li className={inter.className}>
								<b>Çekilişler birbirinden bağımsızdır:</b> Bazı
								turlarda aynı torbadan birden fazla çekiliş
								görebilirsiniz. Bunların sonucunu çekiliş
								sırasıyla göreceksiniz. Çekilişler bağımsız
								olarak yapılacak, yani sanki torbayı sallayacak,
								içinden rastgele bir bilye seçecek, bilyeyi size
								gösterecek, torbaya geri koyacak ve rastgele
								başka bir bilye çekmeden önce torbayı tekrar
								karıştıracakmışız gibi düşünebilirsiniz. Yani
								bir torbanın içindeki bilyelerin sayıları ve
								renkleri bütün çekilişlerden önce her zaman aynı
								olacak.
							</li>
						</ul>
					</div>

					<div className={customStyles.embla__slide}>
						<ul className={customStyles.entryText}>
							<li className={inter.className}>
								<b>Çekilişler birbirinden bağımsızdır:</b> Bazı
								turlarda aynı torbadan birden fazla çekiliş
								görebilirsiniz. Bunların sonucunu çekiliş
								sırasıyla göreceksiniz. Çekilişler bağımsız
								olarak yapılacak, yani sanki torbayı sallayacak,
								içinden rastgele bir bilye seçecek, bilyeyi size
								gösterecek, torbaya geri koyacak ve rastgele
								başka bir bilye çekmeden önce torbayı tekrar
								karıştıracakmışız gibi düşünebilirsiniz.
							</li>
							<li className={inter.className}>
								<b>
									Her çekiliş sonrası bilye torbaya geri
									konur:
								</b>{" "}
								Çekilen bilye, her çekilişten sonra torbaya geri
								konmuş gibi olur. Yani bir torbanın içindeki
								bilyelerin sayıları ve renkleri bütün
								çekilişlerden önce her zaman aynı olacak.
							</li>
							<li className={inter.className}>
								Çekiliş sonuçlarını gördükten sonra, kullanılan
								torbanın Kırmızı torba olma ihtimalinin{" "}
								<b>
									<em>100’de kaç olduğuna</em>
								</b>{" "}
								karar vermelisiniz.
							</li>
							<li className={inter.className}>
								O tur, hiç çekiliş yapılmayan bir tursa,
								kararınızı tamamen zar atışının kullanılan
								torbayı nasıl belirlendiğine dayandırmanız
								gerekir. Aksi takdirde, torbaların içeriğini göz
								önünde bulundurarak hem torbanın nasıl
								seçildiğine hem de alakalı çekiliş veya
								çekilişlerin sonucuna ilişkin bilgileri
								kullanabilirsiniz.
							</li>
						</ul>
					</div>

					<div className={customStyles.embla__slide}>
						<ul className={customStyles.entryText}>
							<li className={inter.className}>
								Şayet kararınız 0 ise, bu Kırmızı torbanın
								kullanılma ihtimalinin olmadığını düşündüğünüz
								anlamına gelir. Kararınız 100 ise, Kırmızı
								torbanın kullanıldığından kesinlikle emin
								olduğunuz anlamına gelir. Kararınız 50 ise, her
								bir torbanın kullanılmış olma ihtimalinin eşit
								olduğunu düşündüğünüz anlamına gelir. Kırmızı
								torbanın kullanılma ihtimalinin daha yüksek
								olduğunu düşünüyorsanız, 50&apos;nin üzerinde
								bir sayı seçin. Mavi torbanın kullanılma
								ihtimalinin daha yüksek olduğunu düşünüyorsanız
								50&apos;nin altında bir sayı seçin.
							</li>

							<Slider
								value={sliderValue}
								updatingFunction={(event) => {
									setSliderValue(Number(event.target.value));
								}}
							/>
							<div
								style={{ textAlign: "center" }}
								className={inter.className}
							>
								Sizce, seçilen torbanın{" "}
								<b className={circleStyles.redText}>
									kırmızı torba
								</b>{" "}
								olma ihtimali: Yüzde {sliderValue}.
							</div>
							<div
								style={{ textAlign: "center" }}
								className={inter.className}
							>
								Sizce, seçilen torbanın{" "}
								<b className={circleStyles.blueText}>
									mavi torba
								</b>{" "}
								olma ihtimali: Yüzde {100 - sliderValue}.
							</div>
						</ul>
					</div>
				</div>
			</div>

			{/* </ul> */}
			{/* </ul> */}
			{/* <button disabled={!isButtonActive} onClick={nextInstruction}>
				Devam
			</button> */}
			{slideIndex + 1}
			<div style={{ display: "flex" }}>
				<button
					className={inter.className + " " + customStyles.navButton}
					onClick={scrollPrev}
				>
					Önceki
				</button>
				<button
					className={inter.className + " " + customStyles.navButton}
					onClick={scrollNext}
				>
					Sonraki
				</button>
				{showNextPhase && (
					<button
						className={
							inter.className + " " + customStyles.navButton
						}
						onClick={()=>phaseFunction(Phase.Main)}
					>
						Deneye Başla!
					</button>
				)}
			</div>
		</>
	);
}

export default Intro2;
