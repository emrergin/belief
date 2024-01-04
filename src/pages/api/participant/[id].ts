import { prisma } from "@/database";
import { Participant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Participant | { message: string }>,
) {
	if (req.method === "PUT") {
		const { body } = req;
		const { id } = req.query;
		if (id === "no-id-given") {
			return res.status(200).json({ message: "test" });
		}
		try {
			if (typeof id === "string") {
				const updateUser = await prisma.participant.update({
					where: {
						id,
					},
					data: JSON.parse(body),
				});
				if (!updateUser) {
					return res.status(404);
				}
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
