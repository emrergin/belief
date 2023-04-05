import { DrawingT } from "@/utilities/types";

import { Button } from "@mantine/core";
import { useEffect, useState,useRef } from "react";
import { useInterval } from "@mantine/hooks";
import autoAnimate from '@formkit/auto-animate';


interface drawingProps {
	numberofBlues: number;
	numberOfDraws: number;
	nextFunction: (d: DrawingT) => void;
}

function Drawing({ numberofBlues, numberOfDraws, nextFunction }: drawingProps) {

	const [numberOfShownBalls,setNumberOfShownBalls]=useState(0);
	console.log('rerender');

	const interval = useInterval(() => {
		if(numberOfShownBalls<numberOfDraws){
			setNumberOfShownBalls((b) => b + 1);
		}}, 1000);

	useEffect(() => {
		interval.start();
		return interval.stop;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current)
	}, [parent]);



	const draws = useRef(
		Array.from({ length: numberOfDraws }, () =>
			Math.floor(Math.random() * 100)
		).map((num) => (num < numberofBlues ? 'blue' : 'red')));

	function nextSubPhase() {
		nextFunction({
			first_draw_blue:
				draws.current[0] === undefined
					? null
					: Boolean(draws.current[0]),
			second_draw_blue:
				draws.current[1] === undefined
					? null
					: Boolean(draws.current[1]),
			third_draw_blue:
				draws.current[2] === undefined
					? null
					: Boolean(draws.current[2]),
			fourth_draw_blue:
				draws.current[3] === undefined
					? null
					: Boolean(draws.current[3]),
			fifth_draw_blue:
				draws.current[4] === undefined
					? null
					: Boolean(draws.current[4]),
			sixth_draw_blue:
				draws.current[5] === undefined
					? null
					: Boolean(draws.current[5]),
		});
	}

	return (
		<>
		{/* {numberOfShownBalls}-{numberOfDraws} */}
			<h2 style={{ textAlign: "center" }}>Çekilen toplar:</h2>
			<div
				style={{
					display: "flex",
					gap: "2ch",
					justifyContent: "center",
					marginTop: "3ch",
					minHeight: "12ch"
				}}
				ref={parent}
			>
				{draws.current.slice(0,numberOfShownBalls)
					.map((a) => (a === 'blue' ? "🔵" : "🔴"))
					.map((e, i) => (
						<span key={i} style={{ fontSize: "4rem" }}>
							{e}
						</span>
					))}
			</div>
			<Button
				size="lg"
				onClick={nextSubPhase}
				style={{display: "block",margin:"auto"}}
				disabled={numberOfDraws>numberOfShownBalls-1}
			>
				Tahmine hazırım!
			</Button>
		</>
	);
}

export default Drawing;
