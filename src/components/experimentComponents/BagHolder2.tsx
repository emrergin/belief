import customStyles from "@/styles/Custom.module.css";
import circleStyles from "@/styles/Circles.module.css";
import { Text } from "@mantine/core";

function BagHolder2({
	aBlue,
	showBalls = true,
}: {
	aBlue: number;
	showBalls?: boolean;
}) {
	return (
		<div className={customStyles.bagHolder}>
			<div style={{ borderColor: "black" }}>
				<Text fz="xl">
					<b>{aBlue}</b> adet <b className={circleStyles.blueText}> mavi</b>{" "}
					bilye, <b>{100 - aBlue}</b> adet{" "}
					<b className={circleStyles.redText}>kırmızı</b> bilye
				</Text>

				{showBalls && (
					<div className={customStyles.ballHolder}>
						{[...Array(aBlue)].map((e, i) => (
							<div key={i}>🔵 </div>
						))}
						{[...Array(100 - aBlue)].map((e, i) => (
							<div key={i}>🔴 </div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default BagHolder2;
