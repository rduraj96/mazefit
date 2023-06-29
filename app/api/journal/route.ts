import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const json = await request.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const created = await prisma.journalLog.create({
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
  const day = new Date(request.nextUrl.searchParams.get("date")!);
  const startDate = new Date(new Date(day).setUTCHours(0, 0, 0, 0));
  const endDate = new Date(new Date(day).setUTCHours(23, 59, 59, 999));

  const logs = await prisma.journalLog.findMany({
    where: {
      userId: Number(userId),
      day: {
        lte: endDate,
        gte: startDate,
      },
    },
  });

  return new NextResponse(JSON.stringify(logs), { status: 201 });
}
