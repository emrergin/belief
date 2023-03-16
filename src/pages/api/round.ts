import { prisma } from "@/database";
import { Round } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Round>
) {
	if (req.method === "POST") {
		const { body } = req;
		const newRoundData = JSON.parse(body);
		const newRound = await prisma.round.create({
			data: newRoundData,
		});
		return res.status(200).json(newRound);
	}
	res.end();
}
