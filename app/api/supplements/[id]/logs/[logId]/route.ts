import { prisma } from "@/lib/client"
import { NextResponse } from "next/server"

export async function PATCH(request:Request, {params}: {params: {id: string, logId: string}}) {
    const json = await request.json()

    const updatedSupplement = await prisma.supplementLog.update({
        where: {
            id: Number(params.logId)
        },
        data: {
            ...json,
        }
    })

    return new NextResponse(JSON.stringify(updatedSupplement), {status: 201})
}

