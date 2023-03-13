export const enum Phase {
	Intro = "INTRO",
	Intro2 = "INTRO2",
	Main = "MAIN",
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
