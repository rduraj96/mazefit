import { NextRequest, NextResponse } from "next/server";
import axios from "axios"

export async function GET(request: NextRequest) {
    console.log(request.nextUrl.searchParams.get("food"))
    const searchFood = request.nextUrl.searchParams.get("food")
    const nextPage = request.nextUrl.searchParams.get("session") || ""

    const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?${nextPage ? "session="+nextPage+"&" : ""}app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&ingr=${encodeURIComponent(searchFood as string)}&nutrition-type=logging`)

    return new NextResponse(JSON.stringify(response.data), {status: 201})
};

export async function POST(request: Request) {
    const json = await request.json();

    const response = await axios.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`, json)
    const data = {
        calories: response.data.calories,
        protein: Math.round(response.data.totalNutrients.PROCNT.quantity),
        carbs: Math.round(response.data.totalNutrients.CHOCDF.quantity),
        fat: Math.round(response.data.totalNutrients.FAT.quantity)
    }
    return new NextResponse(JSON.stringify(data), {status: 201})
};



