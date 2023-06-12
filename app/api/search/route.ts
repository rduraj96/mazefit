import { NextRequest, NextResponse } from "next/server";
import axios from "axios"

export async function GET(request: NextRequest) {
    console.log(request.nextUrl.searchParams.get("food"))
    const searchFood = request.nextUrl.searchParams.get("food")
    const nextPage = request.nextUrl.searchParams.get("session") || ""

    const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?${nextPage}app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&ingr=${encodeURIComponent(searchFood as string)}&nutrition-type=logging&`)

    return new NextResponse(JSON.stringify(response.data), {status: 201})
};

