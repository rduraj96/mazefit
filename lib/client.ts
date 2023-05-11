import { PrismaClient } from "@prisma/client";

let prismaInnit: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prismaInnit = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prismaInnit = (global as any).prisma
}

export const prisma = prismaInnit;