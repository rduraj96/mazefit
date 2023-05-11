import { hash } from "bcrypt"
import { prisma } from "../../../lib/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
        const {name, email, password} = await req.json()
        const hashed = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name, email, password: hashed
            }
        })

        return NextResponse.json({
            user: {
                email: user.email
            }
        })
        
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        })
    }
   
}