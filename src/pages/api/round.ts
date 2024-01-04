import { prisma } from "@/database";
import { Round, Session, Participant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export interface RoundToDownload extends Round, Session, Participant {}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		null | Round | Omit<RoundToDownload, "Participant" | "Session">[]
	>,
) {
	if (req.method === "POST") {
		const { body } = req;
		const newRoundData = JSON.parse(body);
		const newRound = await prisma.round.create({
			data: newRoundData,
		});
		return res.status(200).json(newRound);
	}
	if (req.method === "GET") {
		if (req.headers?.authorization !== process.env.ADMIN_PASS) {
			return res.status(401).json([]);
		}
		let relatedSessions: string[] = [];
		if (req.query !== undefined) {
			if (typeof req.query.sessionId === "string") {
				relatedSessions = [req.query.sessionId];
			} else if (typeof req.query.sessionId === "object") {
				relatedSessions = req.query.sessionId;
			}
		}
		let allRounds: (Round & {
			Participant: Participant & {
				Session: Session;
			};
		})[];
		if (relatedSessions.length === 0) {
			allRounds = await prisma.round.findMany({
				include: {
					Participant: {
						include: {
							Session: true,
						},
					},
				},
			});
		} else {
			allRounds = await prisma.round.findMany({
				where: {
					Participant: {
						sessionId: {
							in: relatedSessions,
						},
					},
				},
				include: {
					Participant: {
						include: {
							Session: true,
						},
					},
				},
			});
		}
		return res.status(200).json(allRounds.map(flattenRound));
	}
	res.end();
}

function flattenRound(
	round: Round & {
		Participant: Participant & {
			Session: Session;
		};
	},
) {
	const { Participant, Session, ...rest } = {
		...round.Participant,
		...round.Participant.Session,
		...round,
	};
	return rest;
}
