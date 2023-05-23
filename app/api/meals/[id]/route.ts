import { prisma } from "@/lib/client"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function PATCH(
    request: Request,
    { params }: { params: { id: string }}
) {
    const mealId = params.id
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const updatedMeal = await prisma.meal.update({
        where: {
            id: parseInt(mealId)
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

    const mealId = params.id
    const deleteMeal = await prisma.meal.delete({
        where: {
            id: parseInt(mealId),
        }
    })

    return NextResponse.json(deleteMeal)
}
