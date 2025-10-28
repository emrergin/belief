import { RoundToDownload } from "@/pages/api/round";

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
	console.log(prior);
	return [
		formatter.format(allDice.slice(0, prior[0])),
		formatter.format(allDice.slice(-prior[1])),
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
