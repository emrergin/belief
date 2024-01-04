import { prisma } from "@/database";
import { Participant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Participant>,
) {
	if (req.method === "POST") {
		const { body } = req;
		const { name_surname, sessionId } = JSON.parse(body);
		const newParticipant = await prisma.participant.create({
			data: { name_surname, sessionId },
		});
		return res.status(200).json(newParticipant);
	}
	res.end();
}
