import { prisma } from "@/lib/client"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request:Request, {params}: {params: { id:string}}) {
    const supplementId = params.id
    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    const supplement = await prisma.supplement.findUnique({
        where: {
            // userId: Number(userId),
            id: parseInt(supplementId)
        },
        include: {
            supplementLogs: true,
        }
    })

    return NextResponse.json(supplement)
}

export async function DELETE(
    request: Request, 
    {params} : { params : { id: string }}
    ) {

    const supplementId = params.id

    await prisma.supplementLog.deleteMany({
        where: {
            supplementId: Number(supplementId)
        }
    })

    const deleteMeal = await prisma.supplement.delete({
        where: {
            id: Number(supplementId),
        }
    })

    return NextResponse.json(deleteMeal)
}