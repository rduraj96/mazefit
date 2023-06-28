import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";
import { formatISO } from "date-fns";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const user = await prisma.userDetails.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  // const res = {
  //   ...user,
  //   currentWeight: user?.weight,
  // };
  return new NextResponse(JSON.stringify(user), { status: 201 });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const json = await request.json();
  const userId = session?.user.id as string;

  const userDetails = await prisma.userDetails.create({
    data: {
      ...json,
      userId: Number(userId),
    },
  });

  const addWeight = await prisma.weight.create({
    data: {
      day: formatISO(new Date().setHours(0, 0, 0, 0)),
      weight: json.weight,
      userId: parseInt(userId),
    },
  });

  console.log(addWeight);

  return new NextResponse(JSON.stringify(userDetails), { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const json = await request.json();
  const userId = session?.user.id as string;

  const updatedDetails = await prisma.userDetails.update({
    where: {
      userId: Number(userId),
    },
    data: {
      ...json,
    },
  });

  return new NextResponse(JSON.stringify(updatedDetails), { status: 201 });
}
