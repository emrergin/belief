import { prisma } from "@/database";
import { Participant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Participant>
) {
	if (req.method === "PUT") {
		const { body } = req;
		const { id } = req.query;
		try {
			if (typeof id === "string") {
				const updateUser = await prisma.participant.update({
					where: {
						id,
					},
					data: JSON.parse(body),
				});
				return res.status(200).json(updateUser);
			}

			return res.status(422);
		} catch (e) {
			console.log(e);
			return res.status(422);
		}
	}
	res.end();
}
