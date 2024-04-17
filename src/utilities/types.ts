import { Session } from "@prisma/client";

export interface SessionType
	extends Omit<
		Session,
		"prior" | "treatment" | "num_of_blue_a" | "num_of_blue_b"
	> {
	prior: [number, number];
	treatment: "QSR" | "BSR";
	num_of_blue_a: number;
	num_of_blue_b: number;
}

export interface SessionType2
	extends Omit<
		Session,
		"prior" | "treatment" | "num_of_blue_a" | "num_of_blue_b"
	> {
	treatment: "QSR2" | "BSR2";
}

export enum Phase {
	Intro = "INTRO",
	Intro2 = "INTRO2",
	Main = "MAIN",
	Demographics = "DEMO",
	Gps = "GPS",
	End = "END",
}

export interface DrawingT {
	first_draw_blue: boolean | null;
	second_draw_blue: boolean | null;
	third_draw_blue: boolean | null;
	fourth_draw_blue: boolean | null;
	fifth_draw_blue: boolean | null;
	sixth_draw_blue: boolean | null;
}

export type GpsQuestion =
	| `generalrisk`
	| `willingnesstoact`
	| `describe`
	| `stairrisk`
	| `gift`
	| `hypodonation`
	| `stairpatience`;

export interface GpsData {
	gps_risk_willingness: number;
	gps_future_benefit: number;
	gps_punish_self: number;
	gps_punish_other: number;
	gps_charity: number;
	gps_d1: number;
	gps_d2: number;
	gps_d3: number;
	gps_d4: number;
	gps_d5: number;
	diff: number;
	sure: number;
	gps_stair_risk: number;
	gps_gift: number;
	gps_donation: number;
	gps_stair_patience: number;
}

export interface SubTypeRound extends DrawingT {
	is_blue: boolean;
	decision_time: number;
}
