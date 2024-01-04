import styles from "@/styles/Circles.module.css";
import clsx from "clsx";
import { XIcon } from "./XIcon";

const Circle = ({
	value,
	color,
	bsr,
	crossCoordinates,
	showResult,
}: {
	value: number;
	color: "red" | "blue";
	bsr: boolean;
	crossCoordinates: {
		x: number;
		y: number;
	} | null;
	showResult: boolean;
}) => {
	const bigCircleClasses = clsx(
		styles.bigCircle,
		styles.circle,
		value === 0 && styles.invis,
		color === "red" && styles.red,
		color === "blue" && styles.blue,
	);

	const smallCircleClasses = clsx(
		styles.circle,
		styles.white,
		styles.smallCircle,
	);

	return (
		<div className={bigCircleClasses}>
			<div
				className={smallCircleClasses}
				style={{
					width: `${300 - Number(value) * 3}px`,
					height: `${300 - Number(value) * 3}px`,
				}}
			></div>
			{bsr && crossCoordinates !== null && showResult && (
				<div
					className={styles.smallestCircle}
					style={{
						top: `${crossCoordinates.y - 9}px`,
						left: `${crossCoordinates.x - 9}px`,
						transform: `translate(-${crossCoordinates.y}}px,-${crossCoordinates.x}}px)`,
					}}
				>
					<XIcon width={18} height={18} />
				</div>
			)}
			{!bsr && <p className={styles.valueBox}>{10000 - (100 - value) ** 2}</p>}
			{/* {bsr && <p className={styles.valueBox}>{value / 10000}</p>} */}
		</div>
	);
};

export default Circle;
