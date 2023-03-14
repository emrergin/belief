import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { Text } from '@mantine/core';

function BagHolder({ aBlue, bBlue }: { aBlue: number; bBlue: number }) {
	return (
		<div className={customStyles.bagHolder}>
			<div>
				<Text  fz="xl">
					<b className={circleStyles.blueText}>Mavi Torba:</b>{" "}
					<b>{bBlue}</b> adet{" "}
					<b className={circleStyles.blueText}> mavi</b> bilye,{" "}
					<b>{100 - bBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye
				</Text>
				<div className={customStyles.ballHolder}>
					{[...Array(bBlue)].map((e, i) => (
						<div key={i}>🔵 </div>
					))}
					{[...Array(100 - bBlue)].map((e, i) => (
						<div key={i}>🔴 </div>
					))}
				</div>
				<Text  fz="xl">Zar sonucu 1,2 veya 3 ise kullanılır.</Text>
			</div>
			<div>
				<Text  fz="xl">
					<b className={circleStyles.redText}>Kırmızı Torba:</b>{" "}
					<b>{aBlue}</b> adet{" "}
					<b className={circleStyles.blueText}> mavi</b> bilye,{" "}
					<b>{100 - aBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye
				</Text>

				<div className={customStyles.ballHolder}>
					{[...Array(aBlue)].map((e, i) => (
						<div key={i}>🔵 </div>
					))}
					{[...Array(100 - aBlue)].map((e, i) => (
						<div key={i}>🔴 </div>
					))}
				</div>

				<Text  fz="xl">Zar sonucu 4,5 veya 6 ise kullanılır.</Text>
			</div>
		</div>
	);
}

export default BagHolder;
