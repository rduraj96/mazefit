import { prisma } from "@/lib/client"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

// export async function GET(
//     request:Request, { params }: { params: { id: string } }
//     ) {
//     const id = params.id
//     const meals = await p
//     return NextResponse.json(meals)
// }

export async function POST(request:Request) {
    const json = await request.json()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string

    const created = await prisma.meal.create({
        data: {
            ...json,
            userId: parseInt(userId)
        }
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
}

