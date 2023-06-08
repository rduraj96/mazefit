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

export async function PATCH(
    request: Request,
    { params }: { params: { id: string }}
) {
    const supplementId = params.id
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const updatedMeal = await prisma.supplement.update({
        where: {
            id: parseInt(supplementId)
        },
        data: {
            ...json,
            userId: parseInt(userId)
        }
    })

    return NextResponse.json(updatedMeal)
}

export async function DELETE(
    request: Request, 
    {params} : { params : { id: string }}
    ) {

    const supplementId = params.id
    const deleteMeal = await prisma.supplement.delete({
        where: {
            id: parseInt(supplementId),
        }
    })

    return NextResponse.json(deleteMeal)
}