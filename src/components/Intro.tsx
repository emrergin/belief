import customStyles from "@/styles/Custom.module.css";
import { SetStateAction, useState } from "react";
import { Phase } from "@/state/types";

import { Button,TextInput, List  } from '@mantine/core';

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
	}

	return (
		<div className={customStyles.mainWrapper}>
			{/* <ul className={customStyles.entryText}>
				<li>
					Hoş geldiniz. Bu deneyde sizden bazı olasılıkları
					değerlendirmenizi isteyeceğiz.
				</li>
				<li>
					Oyunlarda kazancınızı &quot;puan&quot; cinsinden
					hesaplayacağız. Toplam puanınızın parasal değerini ve ek
					olarak bir katılım ücretini size deney sonunda nakit olarak
					ödeyeceğiz.
				</li>
				<li>
					Oyunları tamamladıktan sonra size dair bazı demografik
					bilgileri sorduğumuz bir anket olacak.
				</li>
				<li>
					Deneyden erken ayrılabilirsiniz. Bulunduğunuz sayfayı
					değiştirmeniz ve yenilemeniz gibi durumlarda da deneyden
					erken ayrılmış sayılacaksınız. Erken ayrılmanız durumunda o
					zamana kadarki kararlarınız değerlendirilecek.
				</li>
			</ul> */}
			<List className={customStyles.entryText}>
			<List.Item>Hoş geldiniz. Bu deneyde sizden bazı olasılıkları
					değerlendirmenizi isteyeceğiz.</List.Item>
			<List.Item>Oyunlarda kazancınızı &quot;puan&quot; cinsinden
					hesaplayacağız. Toplam puanınızın parasal değerini ve ek
					olarak bir katılım ücretini size deney sonunda nakit olarak
					ödeyeceğiz.</List.Item>
			<List.Item>Oyunları tamamladıktan sonra size dair bazı demografik
					bilgileri sorduğumuz bir anket olacak.</List.Item>
			<List.Item>Deneyden erken ayrılabilirsiniz. Bulunduğunuz sayfayı
					değiştirmeniz ve yenilemeniz gibi durumlarda da deneyden
					erken ayrılmış sayılacaksınız. Erken ayrılmanız durumunda o
					zamana kadarki kararlarınız değerlendirilecek.</List.Item>
			</List>
			<div className={customStyles.nameEntry}>
				<p >
					Çalışmaya katılmayı kabul ediyorum.
				</p>
				<TextInput 
					type="text"
					placeholder="Ad Soyad"
					value={name}
					onChange={onChange}
					style={{width:"350px"}}
				/>
				
				{name && <Button size="lg" onClick={assignName}>Deneye başla!</Button>}
			</div>
		</div>
	);
}

export default Intro;
