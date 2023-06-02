import { prisma } from "@/database";
import { Session } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Session | null>
) {
	if (req.method === "POST") {
		if (req.headers?.authorization !== process.env.ADMIN_PASS) {
			return res.status(401).json(null);
		}
		const { body } = req;
		const data = JSON.parse(body);
		const newSession = await prisma.session.create({
			data,
		});
		return res.status(200).json(newSession);
	}
	res.end();
}
