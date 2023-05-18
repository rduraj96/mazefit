import { prisma } from "@/lib/client"
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server"

export async function GET(request:Request) {
    const { data: session } = useSession();
    const userId = session?.user?.id

    const meals = await prisma.meal.findMany({
        where: {
            userId: userId,
        }
    })
    return NextResponse.json(meals)
}

export async function POST(request:Request) {
    const json = await request.json()

    const created = await prisma.meal.create({
        data: json
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
    
}