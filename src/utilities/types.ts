export enum Phase {
	Intro = "INTRO",
	Intro2 = "INTRO2",
	// Trial = "TRIAL",
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
