import { prisma } from "@/lib/client"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../../../auth/[...nextauth]/route"
import { useGlobalContext } from "@/app/Context/store"
import { dateToString } from "@/lib/utils"

export async function POST(request:Request, {params}: {params: {id: string, logId: string}}) {
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string
    const day = new Date(params.logId)


    const created = await prisma.supplementLog.create({
        data: {
            ...json,
            day: new Date(dateToString(day)),
            userId: 1,
            supplementId: Number(params.id)
            // isTaken: true,
            // user: { connect: { id: userId } },
            // supplement: { connect: { id: 5 } },
        }
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
}

export async function GET(request:Request, {params}: {params: {date: string}}) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string
    const day = params.date

    const supplements = await prisma.supplementLog.findMany({
        where: {
        //   userId: 1,
          id: Number(day)
        },
      });
    return new NextResponse(JSON.stringify(supplements), {status: 201})
}

