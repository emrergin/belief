import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function BagHolder({ aBlue, bBlue }: { aBlue: number; bBlue: number }) {
	return (
		<div className={customStyles.bagHolder}>
			<div className={inter.className}>
				<div>
					<b className={circleStyles.blueText}>Mavi Torba:</b>{" "}
					<b>{bBlue}</b> adet{" "}
					<b className={circleStyles.blueText}> mavi</b> bilye,{" "}
					<b>{100 - bBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye
				</div>
				<div>
					{[...Array(bBlue)].map((e, i) => (
						<span key={i}>🔵 </span>
					))}
					{[...Array(100 - bBlue)].map((e, i) => (
						<span key={i}>🔴 </span>
					))}
				</div>
				<div>Zar sonucu 4,5 veya 6 ise kullanılır.</div>
			</div>
			<div className={inter.className}>
				<div>
					<b className={circleStyles.redText}>Kırmızı Torba:</b>{" "}
					<b>{aBlue}</b> adet{" "}
					<b className={circleStyles.blueText}> mavi</b> bilye,{" "}
					<b>{100 - aBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye
				</div>

				<div>
					{[...Array(aBlue)].map((e, i) => (
						<span key={i}>🔵 </span>
					))}
					{[...Array(100 - aBlue)].map((e, i) => (
						<span key={i}>🔴 </span>
					))}
				</div>

				<div>Zar sonucu 1, 2 veya 3 ise kullanılır.</div>
			</div>
		</div>
	);
}

export default BagHolder;
