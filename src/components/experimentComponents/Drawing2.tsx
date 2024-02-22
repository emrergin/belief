import { Drawing2T } from "@/utilities/types";

import { Button } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { useInterval } from "@mantine/hooks";
import autoAnimate from "@formkit/auto-animate";
import { QuestionMarkCircled } from "./QuestionBall";

interface drawingProps {
	nextFunction: (d: Drawing2T) => void;
	fullView?: boolean;
	result?: boolean;
	isBlue: boolean;
}

function Drawing2({
	nextFunction,
	isBlue,
	fullView = true,
	result = false,
}: drawingProps) {
	const [numberOfShownBalls, setNumberOfShownBalls] = useState(-1);

	const interval = useInterval(() => {
		if (numberOfShownBalls < 1) {
			setNumberOfShownBalls((b) => b + 1);
		}
	}, 1000);

	useEffect(() => {
		interval.start();
		return interval.stop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	function nextSubPhase() {
		nextFunction({
			is_blue: isBlue,
		});
	}

	return (
		<>
			{fullView && (
				<>
					<h2 style={{ textAlign: "center" }}>Çekilen bilye:</h2>
				</>
			)}
			<div
				style={{
					display: "flex",
					gap: "2ch",
					justifyContent: "center",
					marginBottom: fullView || result ? "2ch" : "-2ch",
					minHeight: "12ch",
				}}
				ref={parent}
			>
				{[""]
					.slice(0, numberOfShownBalls + 1)
					.map((a, i) =>
						!result ? <QuestionMarkCircled key={i} /> : isBlue ? "🔵" : "🔴",
					)
					.map((e, i) => (
						<span key={i} style={{ fontSize: "4rem" }}>
							{e}
						</span>
					))}
			</div>
			{fullView && (
				<Button
					size="lg"
					onClick={nextSubPhase}
					style={{ display: "block", margin: "auto" }}
					disabled={1 > numberOfShownBalls}
				>
					Tahmine hazırım!
				</Button>
			)}
		</>
	);
}

export default Drawing2;
