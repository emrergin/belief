import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

import { useState, useCallback, useEffect } from "react";

import { Button, List } from "@mantine/core";

import { Phase } from "@/utilities/types";

import Circles from "./experimentComponents/Circles";

import { Carousel, Embla } from "@mantine/carousel";

import Slider from "./experimentComponents/Slider";
import BagHolder from "./experimentComponents/BagHolder";
import { getDiceText } from "@/utilities/functions";

function Intro2({
	aBlue,
	bBlue,
	priors,
	treatment,
	phaseFunction,
}: {
	aBlue: number;
	bBlue: number;
	priors: [number, number];
	treatment: string;
	phaseFunction: (p: Phase) => void;
}) {
	const [sliderValue, setSliderValue] = useState(50);
	const [slideIndex, setSlideIndex] = useState(0);
	const [showNextPhase, setShowNextPhase] = useState(false);

	const [embla, setEmbla] = useState<Embla | null>(null);
	const diceText = getDiceText(priors);

	const scrollPrev = useCallback(() => {
		if (!embla) {
			return;
		}
		embla.scrollPrev();
		setSlideIndex(embla.selectedScrollSnap() || 0);
	}, [embla]);

	const scrollNext = useCallback(() => {
		if (!embla) {
			return;
		}
		embla.scrollNext();
		setSlideIndex(embla.selectedScrollSnap() || 0);
	}, [embla]);

	useEffect(() => {
		if (slideIndex === 5) {
			setShowNextPhase(true);
		}
	}, [slideIndex]);

	return (
		<>
			<Carousel
				slideSize="100%"
				height="750px"
				slideGap="md"
				dragFree
				draggable={false}
				withControls={false}
				getEmblaApi={setEmbla}
				style={{
					maxWidth: "100vw",
					display: "flex",
					marginTop: "-3.6rem",
					// border:"2px solid red"
				}}
			>
				<Carousel.Slide className={customStyles.embla__slide}>
					<List className={customStyles.entryText}>
						<List.Item>
							<b>Turlar:</b> Deneyimiz otuz &quot;tur&quot;dan
							oluşuyor.
						</List.Item>
						<List.Item>
							<b>Hangi Torbanın Kullanıldığını Tahmin Etme:</b>{" "}
							Her turda, bilgisayarı bir &quot;torba&quot;dan, bir
							veya daha fazla renkli bilye çekilişini simüle etmek
							için kullanacağız. İçlerinde farklı adetlerde renkli
							bilye içeren iki tip torba var. Bilgisayarın hangi
							torbayı seçmiş olabileceğini düşünerek bir karar
							vermenizi istiyoruz.
						</List.Item>
						<List.Item>
							<b>Bilgisayar Kullanacağı Torbayı Nasıl Seçiyor:</b>{" "}
							Her turda bilgisayar ilk olarak, 1, 2, 3, 4, 5, 6
							sayılarından birini rastgele seçecek. Bunu, tavla
							zarı gibi altı yüzlü bir zar atışı olarak
							düşünebilirsiniz.
							<List style={{ margin: "15px" }} size="xl">
								<List.Item>
									Zar sonucu {diceText[0]} ise, çekiliş daha
									fazla mavi bilye içeren{" "}
									<b className={circleStyles.blueText}>
										Mavi torba
									</b>
									dan yapılır.
								</List.Item>
								<List.Item>
									Zar sonucu {diceText[1]} ise, çekiliş daha
									fazla kırmızı bilye içeren{" "}
									<b className={circleStyles.redText}>
										Kırmızı torba
									</b>
									dan yapılır.
								</List.Item>
							</List>
							Bu nedenle, iki torbanın da seçilme şansı aynıdır.
						</List.Item>
					</List>
				</Carousel.Slide>
				<Carousel.Slide className={customStyles.embla__slide}>
					<BagHolder
						aBlue={aBlue}
						bBlue={bBlue}
						diceText={diceText}
					/>
					<div className={customStyles.entryText}>
						<b>Renkli Bilyeler: </b> Her iki torbanın içindeki
						bilyeleri yukarıda görebilirsiniz.
					</div>
				</Carousel.Slide>
				<Carousel.Slide className={customStyles.embla__slide}>
					<List className={customStyles.entryText}>
						<List.Item>
							<b>Kullanılan Torba:</b> Zar atışının sonucu size
							önceden söylenmeyecek, bu nedenle çekiliş için hangi
							torbanın kullanıldığını bilemezsiniz. Zar, her turda
							her kişi için ayrı ayrı atılır.
						</List.Item>
						<List.Item>
							<b>Çekilişler kişiye özeldir:</b> Bilgisayar zar
							atışı sonrası kullanılacak torbayı belirlediğinde, o
							torbadan rastgele çekilecek bir veya daha fazla
							bilye gösterilebilir. Bu çekilişler size o turda
							hangi torbanın kullanıldığı hakkında bilgi
							verebilir.
						</List.Item>
						<List.Item>
							<b>Çekilişler birbirinden bağımsızdır:</b> Bazı
							turlarda aynı torbadan birden fazla çekiliş
							görebilirsiniz. Bunların sonucunu çekiliş sırasıyla
							göreceksiniz. Çekilişler bağımsız olarak yapılacak,
							yani sanki torbayı sallayacak, içinden rastgele bir
							bilye seçecek, bilyeyi size gösterecek, torbaya geri
							koyacak ve rastgele başka bir bilye çekmeden önce
							torbayı tekrar karıştıracakmışız gibi
							düşünebilirsiniz. Yani bir torbanın içindeki
							bilyelerin sayıları ve renkleri bütün çekilişlerden
							önce her zaman aynı olacak.
						</List.Item>
						<List.Item>
							<b>Her çekiliş sonrası bilye torbaya geri konur:</b>{" "}
							Çekilen bilye, her çekilişten sonra torbaya geri
							konmuş gibi olur.
						</List.Item>
					</List>
				</Carousel.Slide>

				<Carousel.Slide className={customStyles.embla__slide}>
					<List className={customStyles.entryText}>
						<List.Item>
							Çekiliş sonuçlarını gördükten sonra, kullanılan
							torbanın Kırmızı torba olma ihtimalinin{" "}
							<b>
								<em>100’de kaç olduğuna</em>
							</b>{" "}
							karar vermelisiniz.
						</List.Item>
						<List.Item>
							Torbaların içeriğini göz önünde bulundurarak, hem
							torbanın nasıl seçildiğine hem de alakalı çekiliş
							veya çekilişlerin sonucuna ilişkin bilgileri
							kullanabilirsiniz.
						</List.Item>
						<List.Item>
							Şayet kararınız 0 ise, bu Kırmızı torbanın
							kullanılma ihtimalinin olmadığını düşündüğünüz
							anlamına gelir. Kararınız 100 ise, Kırmızı torbanın
							kullanıldığından kesinlikle emin olduğunuz anlamına
							gelir. Kararınız 50 ise, her bir torbanın
							kullanılmış olma ihtimalinin eşit olduğunu
							düşündüğünüz anlamına gelir. Kırmızı torbanın
							kullanılma ihtimalinin daha yüksek olduğunu
							düşünüyorsanız, 50&apos;nin üzerinde bir sayı seçin.
							Mavi torbanın kullanılma ihtimalinin daha yüksek
							olduğunu düşünüyorsanız 50&apos;nin altında bir sayı
							seçin.
						</List.Item>
					</List>
				</Carousel.Slide>
				<Carousel.Slide className={customStyles.embla__slide}>
					{treatment === "QSR" ? (
						<div>
							<List
								className={customStyles.entryText}
								style={{ marginTop: "0px", scale: "0.9" }}
							>
								<List.Item>
									Kullanılan torbanın{" "}
									<b className={circleStyles.redText}>
										Kırmızı torba
									</b>{" "}
									olma ihtimalinin sizce{" "}
									<b>
										<i>100&apos;de kaç olduğunu</i>{" "}
									</b>{" "}
									bir kaydırıcıyı sağa ya da sola sürükleyerek
									bildireceksiniz. Bunu aşağıda gördüğünüz
									özel düzenek yoluyla yapacaksınız. Bu esnada
									kırmızı simidin ve mavi simidin
									büyüklüklerinin değiştiğini görebilirsiniz.
									Daha büyük bir simit daha çok puana karşılık
									gelir. Bu puan simidin tam altında yazar ve
									kaydırıcı hareket ettikçe nasıl değiştiği
									görülebilir.
								</List.Item>
								<List.Item>
									Karar verdikten sonra, gerçekte hangi
									torbanın kullanıldığı size bildirilecektir.
									Şayet o turda{" "}
									<b className={circleStyles.redText}>
										Kırmızı torba
									</b>{" "}
									kullanılmış ise, kazancınız kırmızı simidin
									karşılık geldiği miktar olacak. Şayet o
									turda{" "}
									<b className={circleStyles.blueText}>
										Mavi torba
									</b>{" "}
									kullanılmış ise, kazancınız mavi simidin
									karşılık geldiği miktar olacak.
								</List.Item>
							</List>
							<div
								style={{
									display: "flex",
									scale: "0.8",
									justifyContent: "center",
									gap: "250px",
									marginLeft: "125px",
								}}
							>
								<div>
									<Slider
										value={sliderValue}
										updatingFunction={(event) => {
											setSliderValue(
												Number(event.target.value)
											);
										}}
									/>
									<div
										style={{
											textAlign: "center",
											scale: "1.5",
										}}
									>
										Sizce, seçilen torbanın{" "}
										<b className={circleStyles.redText}>
											kırmızı torba
										</b>{" "}
										olma ihtimali: Yüzde {sliderValue}.
									</div>
									<div
										style={{
											textAlign: "center",
											scale: "1.5",
										}}
									>
										Sizce, seçilen torbanın{" "}
										<b className={circleStyles.blueText}>
											mavi torba
										</b>{" "}
										olma ihtimali: Yüzde {100 - sliderValue}
										.
									</div>
								</div>
								<Circles
									value={sliderValue}
									bsr={false}
									showResult={false}
									chooseCircle={"blue"}
								/>
							</div>
						</div>
					) : (
						<div>
							<List
								className={customStyles.entryText}
								style={{ marginTop: "0px", scale: "0.9" }}
							>
								<List.Item>
									Kullanılan torbanın{" "}
									<b className={circleStyles.redText}>
										Kırmızı torba
									</b>{" "}
									olma ihtimalinin sizce{" "}
									<b>
										<i>100&apos;de kaç olduğunu</i>{" "}
									</b>{" "}
									bir kaydırıcıyı sağa ya da sola sürükleyerek
									bildireceksiniz. Bunu aşağıda gördüğünüz
									özel düzenek yoluyla yapacaksınız. Bu esnada
									kırmızı simidin ve mavi simidin
									büyüklüklerinin değiştiğini görebilirsiniz.
								</List.Item>
								<List.Item>
									Karar verdikten sonra, gerçekte hangi
									torbanın kullanıldığı size bildirilecektir.
									Karar verdikten sonra, gerçekte hangi
									torbanın kullanıldığı size bildirilecektir.
									Ardından, seçilen torbanın rengindeki simit
									ve içindeki alanın teşkil ettiği daireden
									rastgele bir nokta seçilecek.
									{/* Şayet o turda{" "}
									<b className={circleStyles.redText}>
										Kırmızı torba
									</b>{" "}
									kullanılmış ise, kazancınız kırmızı simidin
									karşılık geldiği miktar olacak. Şayet o
									turda{" "}
									<b className={circleStyles.blueText}>
										Mavi torba
									</b>{" "}
									kullanılmış ise, kazancınız mavi simidin
									karşılık geldiği miktar olacak. */}
								</List.Item>
								<List.Item>
									Eğer bu nokta ilgili simite, yani tam
									dairenin renkli kısmına denk düşerse,
									kazancınız 1000 puan, aksi takdirde 0 puan
									olacak.
								</List.Item>
							</List>
							<div
								style={{
									display: "flex",
									scale: "0.8",
									justifyContent: "center",
									gap: "250px",
									marginLeft: "125px",
								}}
							>
								<div>
									<Slider
										value={sliderValue}
										updatingFunction={(event) => {
											setSliderValue(
												Number(event.target.value)
											);
										}}
									/>
									<div
										style={{
											textAlign: "center",
											scale: "1.5",
										}}
									>
										Sizce, seçilen torbanın{" "}
										<b className={circleStyles.redText}>
											kırmızı torba
										</b>{" "}
										olma ihtimali: Yüzde {sliderValue}.
									</div>
									<div
										style={{
											textAlign: "center",
											scale: "1.5",
										}}
									>
										Sizce, seçilen torbanın{" "}
										<b className={circleStyles.blueText}>
											mavi torba
										</b>{" "}
										olma ihtimali: Yüzde {100 - sliderValue}
										.
									</div>
								</div>
								<Circles
									value={sliderValue}
									bsr={false}
									showResult={false}
									chooseCircle={"blue"}
								/>
							</div>
						</div>
					)}
				</Carousel.Slide>
			</Carousel>

			{/* {slideIndex + 1} */}
			<Button.Group>
				<Button
					variant="light"
					size="lg"
					disabled={slideIndex === 0}
					onClick={scrollPrev}
				>
					Önceki
				</Button>
				<Button
					variant="light"
					size="lg"
					disabled={slideIndex === 5}
					onClick={scrollNext}
				>
					Sonraki
				</Button>
				{showNextPhase && (
					<Button size="lg" onClick={() => phaseFunction(Phase.Main)}>
						Deneye Başla!
					</Button>
				)}
			</Button.Group>
		</>
	);
}

export default Intro2;
