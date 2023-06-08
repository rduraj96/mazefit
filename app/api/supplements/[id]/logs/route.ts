import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../../auth/[...nextauth]/route"

export async function POST(request:Request, {params}: {params: {id: string}}) {
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const created = await prisma.supplementLog.create({
        data: {
            ...json,
            userId: parseInt(userId),
            supplementId: Number(params.id),
            isTaken: false,
        }
    })

    return new NextResponse(JSON.stringify(created), {status: 201})
}