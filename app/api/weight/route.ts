import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const json = await request.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const created = await prisma.weight.create({
    data: {
      ...json,
      userId: parseInt(userId),
    },
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;
  const today = new Date().toLocaleDateString();
  const range = request.nextUrl.searchParams.get("range") === "week" ? 7 : 30;
  const dateRange = new Date(today);
  dateRange.setDate(dateRange.getDate() - range);
  const startDate = new Date(new Date(today).setUTCHours(23, 59, 59, 999));
  const endDate = new Date(new Date(dateRange).setUTCHours(0, 0, 0, 0));

  const weights = await prisma.weight.findMany({
    where: {
      userId: Number(userId),
      day: {
        lte: startDate,
        gte: endDate,
      },
    },
  });
  const data = weights.map((weight) => {
    return {
      day: Math.round(new Date(weight.day).getTime()),
      weight: weight.weight,
    };
  });

  data.sort((a, b) => a.day - b.day);

  return new NextResponse(JSON.stringify(data), { status: 201 });
}
