import customStyles from "@/styles/Custom.module.css";
import { SetStateAction, useState } from "react";

import { Button, TextInput, List } from "@mantine/core";

function Intro({ nameFunction }: { nameFunction: (a: string) => void }) {
	const [name, setName] = useState("");

	const onChange = (event: { target: { value: SetStateAction<string> } }) => {
		setName(event.target.value);
	};

	async function assignName() {
		nameFunction(name);
		let elem = document.querySelector("html");

		if (elem) {
			elem.requestFullscreen();
		}
	}

	return (
		<div className={customStyles.mainWrapper}>
			<List className={customStyles.entryText}>
				<List.Item>
					Hoş geldiniz. Bu deneyde sizden bazı olasılıkları değerlendirmenizi
					isteyeceğiz.
				</List.Item>
				<List.Item>
					Kazancınız &quot;puan&quot; cinsinden hesaplanacak ve deney sonunda
					nakit olarak ödenecek. Her 1000 puan, 1 TL’ye eşittir. Bu ödemenin
					yanında ayrıca 30 TL’lik bir katılım ücretini size ödeyeceğiz.
				</List.Item>
				<List.Item>
					Oyunları tamamladıktan sonra size dair bazı demografik bilgileri
					sorduğumuz bir anket olacak.
				</List.Item>
				<List.Item>
					Deneyden erken ayrılabilirsiniz. Bulunduğunuz sayfayı değiştirmeniz ve
					yenilemeniz gibi durumlarda da deneyden erken ayrılmış sayılacaksınız.
					Erken ayrılmanız durumunda yalnızca katılım ücreti ödenir.
				</List.Item>
			</List>
			<div className={customStyles.nameEntry}>
				<p>Çalışmaya katılmayı kabul ediyorum.</p>
				<TextInput
					type="text"
					placeholder="Ad Soyad"
					value={name}
					onChange={onChange}
					style={{ width: "350px" }}
				/>

				{name && (
					<Button size="lg" onClick={assignName}>
						Deneye başla!
					</Button>
				)}
			</div>
		</div>
	);
}

export default Intro;
