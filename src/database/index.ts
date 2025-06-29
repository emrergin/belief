import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;

	process.on("beforeExit", async () => {
		await prisma.$disconnect();
	});
}
