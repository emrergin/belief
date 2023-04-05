import styles from "@/styles/Circles.module.css";

interface sliderProps {
	updatingFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: number;
	disabled?: boolean;
}

function Slider({ updatingFunction, value, disabled }: sliderProps) {
	return (
		<div className={styles.center}>
			<div className={styles.wrap}>
				<input
					type="range"
					className={styles.range}
					min="0"
					max="100"
					step="1"
					value={value}
					onChange={(e) => updatingFunction(e)}
					disabled={disabled}
				/>
				<div className={styles.track}>
					<div
						className={styles.trackInner}
						style={{ width: `${value}%` }}
					></div>
				</div>
				<div
					className={styles.thumb}
					style={{
						left: `${value}%`,
						transform: `translate(-${value}%, -50%)`,
					}}
				></div>
			</div>
		</div>
	);
}

export default Slider;
