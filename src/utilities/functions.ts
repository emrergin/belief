import { RoundToDownload } from "@/pages/api/round";
import { Round } from "@prisma/client";
import { Phase, SubTypeRound } from "./types";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

function arrayToCsv(data: RoundToDownload[], columnNames: string[]): string {
	let data2: (string[] | RoundToDownload)[] = [columnNames, ...data];
	return data2
		.map(
			(row) =>
				Object.values(row)
					.map(String) // convert every value to String
					.map((v) => v.replaceAll('"', '""')) // escape double colons
					.map((v) => `"${v}"`) // quote it
					.join(","), // comma-separated
		)
		.join("\r\n"); // rows starting on new lines
}

function downloadBlob(content: string, filename: string, contentType: string) {
	// Create a blob
	var blob = new Blob([content], { type: contentType });
	var url = URL.createObjectURL(blob);

	// Create a link to download it
	var pom = document.createElement("a");
	pom.href = url;
	pom.setAttribute("download", filename);
	pom.click();
}

export function downloadDataAsCsv(
	data: RoundToDownload[],
	columnNames: string[],
) {
	downloadBlob(
		arrayToCsv(data, columnNames),
		`${new Date()}.csv`,
		"text/csv;charset=utf-8;",
	);
}

export function getDiceText(prior: [number, number]): [string, string] {
	const formatter = new Intl.ListFormat("tr", {
		style: "long",
		type: "disjunction",
	});
	const allDice = ["1", "2", "3", "4", "5", "6"];
	return [
		formatter.format(allDice.slice(0, prior[0])),
		formatter.format(allDice.slice(prior[1])),
	];
}

export function getDateText() {
	function roundToHour(date: Date) {
		const p = 60 * 60 * 1000; // milliseconds in an hour
		return new Date(Math.ceil(date.getTime() / p) * p);
	}

	return (
		roundToHour(new Date()).toLocaleString("tr-TR", {
			month: "long",
			day: "numeric",
			hour: "2-digit",
			timeZone: "Africa/Nairobi",
		}) + ":00"
	);
}

async function generateNewRound(lastRound: Omit<Round, "id">) {
	await fetch("./api/round", {
		method: "POST",
		body: JSON.stringify(lastRound),
	});
}

export function nextRound(
	roundData: MutableRefObject<Partial<Round>>,
	participantId: string,
	redRatio: number,
	pointsForCurrentRound: number,
	currentRound: number,
	pointFunction: Dispatch<SetStateAction<number>>,
	numberOfRounds: number,
	priors: number[],
	type: "bayesian" | "guess",
	time: MutableRefObject<Date>,
	setCurrentColor: Dispatch<SetStateAction<"blue" | "red">>,
	setSubPhase: Dispatch<SetStateAction<"input" | "result" | "drawing">>,
	arrayOfNumbers: number[],
	roundFunction: (r: number) => void,
	setRedRatio: Dispatch<SetStateAction<number>>,
	phaseFunction: (p: Phase) => void,
) {
	const lastRound: Omit<Round, "id"> = {
		...(roundData.current as SubTypeRound),
		participantId,
		chosen_probability: 100 - redRatio,
		reward: pointsForCurrentRound,
		round: currentRound + 1,
		round_parameter: arrayOfNumbers[currentRound],
	};
	console.log(lastRound);
	generateNewRound(lastRound);
	pointFunction((p: number) => p + pointsForCurrentRound);

	if (currentRound < numberOfRounds - 1) {
		if (type === "bayesian") {
			const newBag =
				Math.random() < priors[0] / (priors[0] + priors[1]) ? "blue" : "red";
			setCurrentColor(newBag);
			setSubPhase("drawing");
			roundData.current = {
				...roundData.current,
				is_blue: newBag === "blue" ? true : false,
			};
		} else {
			const newBall =
				Math.random() < arrayOfNumbers[currentRound] / 100 ? "blue" : "red";
			setCurrentColor(newBall);
			setSubPhase("drawing");
			roundData.current = {
				...roundData.current,
			};
		}
		roundFunction(currentRound + 1);
		setRedRatio(50);
		time.current = new Date();
	} else {
		phaseFunction(Phase.Demographics);
	}
}
