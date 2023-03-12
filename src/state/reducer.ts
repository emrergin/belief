import { Round } from "@prisma/client";
import { State } from "./state";
import { Phase } from "./types";

export type Action = {
	type: "SET_PHASE";
	payload: Phase;
}|{
	type: "UPDATE_ROUND";
	payload: Partial<Round>;
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PHASE":
			return {
				...state,
				phase: action.payload,
			};
		case "UPDATE_ROUND":
			// const newState = state;
			// newState. currentRound = {...newState.currentRound,...action.payload}
			// return newState;
			return {
				...state,
				currentRound: {...state.currentRound, ...action.payload},
			};
		default:
			return state;
	}
};

export const setPhase = (phase: Phase): Action => {
	return {
		type: "SET_PHASE",
		payload: phase,
	};
};

export const updateRound = (roundDetails: Partial<Round>): Action =>{
	return {
		type: "UPDATE_ROUND",
		payload: roundDetails
	};
}
