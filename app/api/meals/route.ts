import { prisma } from "@/lib/client"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const meals = await prisma.meal.findMany()
    return NextResponse.json(meals);
}

export async function POST(request: Request) {
    const json = await request.json()

    const created = await prisma.meal.create({
        data: json
    })

    return new NextResponse(JSON.stringify(created), {status: 201});
}

