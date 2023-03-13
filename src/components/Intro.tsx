import customStyles from "@/styles/Custom.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { SetStateAction, useState } from "react";
// import { useStateValue, setPhase } from "@/state";
import { Phase } from "@/state/types";

function Intro({
	phaseFunction,
	nameFunction,
}: {
	phaseFunction: (a: Phase) => void;
	nameFunction: (a: string) => void;
}) {
	const [name, setName] = useState("");

	const onChange = (event: { target: { value: SetStateAction<string> } }) => {
		setName(event.target.value);
	};

	function assignName() {
		nameFunction(name);
		phaseFunction(Phase.Intro2);
		// console.log(Phase.Qsr)
		// dispatch(setPhase(Phase.Intro2));
	}

	// const [, dispatch] = useStateValue();
	return (
		<div className={customStyles.mainWrapper}>
			<ul className={customStyles.entryText}>
				<li className={inter.className}>
					Hoş geldiniz. Bu deneyde sizden bazı olasılıkları
					değerlendirmenizi isteyeceğiz.
				</li>
				<li className={inter.className}>
					Oyunlarda kazancınızı &quot;puan&quot; cinsinden
					hesaplayacağız. Toplam puanınızın parasal değerini ve ek
					olarak bir katılım ücretini size deney sonunda nakit olarak
					ödeyeceğiz.
				</li>
				<li className={inter.className}>
					Oyunları tamamladıktan sonra size dair bazı demografik
					bilgileri sorduğumuz bir anket olacak.
				</li>
				<li className={inter.className}>
					Deneyden erken ayrılabilirsiniz. Bulunduğunuz sayfayı
					değiştirmeniz ve yenilemeniz gibi durumlarda da deneyden
					erken ayrılmış sayılacaksınız. Erken ayrılmanız durumunda o
					zamana kadarki kararlarınız değerlendirilecek.
				</li>
			</ul>
			<div className={customStyles.nameEntry}>
				<p className={inter.className}>
					Çalışmaya katılmayı kabul ediyorum.
				</p>
				<input
					className={inter.className}
					type="text"
					placeholder="Ad Soyad"
					value={name}
					onChange={onChange}
				/>
				{name && <button onClick={assignName}>Deneye başla!</button>}
			</div>
		</div>
	);
}

export default Intro;
