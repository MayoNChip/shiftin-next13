import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams.getAll("id"));
  const shiftTypes = await prisma.shiftType.findMany();
  return NextResponse.json(shiftTypes);

  // return NextResponse.json({ data: "hello" });
}
