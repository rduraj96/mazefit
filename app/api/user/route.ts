import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
      });
    return new NextResponse(JSON.stringify(user), {status: 201})
}