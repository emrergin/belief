import { useRef, useEffect } from "react";
import styles from "@/styles/Circles.module.css";

interface sliderProps {
	updatingFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: number;
	disabled?: boolean;
}

function Slider({ updatingFunction, value, disabled=false }: sliderProps) {
	const range = useRef<HTMLInputElement>(null);
	const thumb = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);

	useEffect(() => {
		thumb.current!.style.left = `${value}%`;
		thumb.current!.style.transform = `translate(-${value}%, -50%)`;
		track.current!.style.width = `${value}%`;
	}, [value]);

	return (
		<div className={styles.center}>
			<div className={styles.wrap}>
				<input
					type="range"
					className={styles.range}
					ref={range}
					min="0"
					max="100"
					step="1"
					value={value}
					onChange={(e) => updatingFunction(e)}
					disabled={disabled}
				/>
				<div className={styles.track}>
					<div className={styles.trackInner} ref={track}></div>
				</div>
				<div className={styles.thumb} ref={thumb}></div>				
			</div>
		</div>
	);
}

export default Slider;
