import { prisma } from "@/lib/client"
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request:Request) {
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const created = await prisma.supplement.create({
        data: {
            ...json,
            userId: parseInt(userId)
        }
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
}

export async function GET(request:NextRequest) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string
    const day = new Date(request.nextUrl.search.split("=")[1])
    const startDate = new Date(new Date(day).setUTCHours(0, 0, 0, 0));
    const endDate = new Date(new Date(day).setUTCHours(23, 59, 59, 999))

    const supplements = await prisma.supplement.findMany({
        where: {
          userId: 1,
        },
        include: {
            supplementLogs: {
                where: {
                    day: {
                        lte: endDate,
                        gte: startDate
                    }
                }
            },
        }
      });
    return new NextResponse(JSON.stringify(supplements), {status: 201})
}

