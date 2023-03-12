import { useRef } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import customStyles from "@/styles/Custom.module.css";

import { useStateValue, updateRound } from "@/state";



interface drawingProps {
	numberofBlues: number;
	numberOfDraws: number;
    nextFunction: ()=> void;
}

// is_blue: boolean;
// first_draw_blue: boolean | null;
// second_draw_blue: boolean | null;
// third_draw_blue: boolean | null;
// fourth_draw_blue: boolean | null;
// fifth_draw_blue: boolean | null;
// sixth_draw_blue: boolean | null;

function Drawing({ numberofBlues, numberOfDraws, nextFunction }: drawingProps) {
    const [, dispatch] = useStateValue();

	let draws = useRef(
		Array.from({ length: numberOfDraws }, () =>
			Math.floor(Math.random() * 100)
		).map((num) => (num < numberofBlues ? 1: 0))
	);

    function nextSubPhase(){
        
        dispatch(updateRound({
            first_draw_blue: draws.current[0]===undefined ? null: Boolean(draws.current[0])
            ,second_draw_blue: draws.current[1] ===undefined ? null: Boolean(draws.current[1])
            ,third_draw_blue: draws.current[2] ===undefined ? null: Boolean(draws.current[2])
            ,fourth_draw_blue:draws.current[3]===undefined ? null: Boolean(draws.current[3])
            ,fifth_draw_blue: draws.current[4] ===undefined ? null: Boolean(draws.current[4])
            ,sixth_draw_blue: draws.current[5] ===undefined ? null: Boolean(draws.current[5])
        }));
        nextFunction();
    }

	return (
        <>
            <h2 className={inter.className} style={{textAlign:"center"}}>Çekilen toplar:</h2>
            <div style={{display:"flex", gap:"2ch", justifyContent:"center", marginTop:"3ch"}}>
                {draws.current.map(a=>a===1 ? "🔵" : "🔴").map((e, i) => (
                    <span key={i} style={{fontSize:"4rem"}}>{e}</span>
                ))}
            </div>
            <button
            style={{marginInline : "auto", display:"block", marginTop: "4ch"}}
                className={
                        inter.className + " " + customStyles.navButton
                    }
                    onClick={nextSubPhase}
                >
                    Tahmine hazırım!
			</button>
            </>
	);
}

export default Drawing;
