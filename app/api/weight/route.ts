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
  const range = request.nextUrl.searchParams.get("range");
  const dateRange = new Date(today);
  if (range === "week") {
    dateRange.setDate(dateRange.getDate() - 6);
  } else if (range === "month") {
    dateRange.setDate(dateRange.getMonth() - 1);
  }
  const startDate = new Date(new Date(today).setUTCHours(23, 59, 59, 999));
  const endDate = new Date(new Date(dateRange).setUTCHours(0, 0, 0, 0));
  console.log(dateRange);
  console.log(startDate);
  console.log(endDate);

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
