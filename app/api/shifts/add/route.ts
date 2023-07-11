import { ShiftTypeInterface } from "@/commonTypes";
import prisma from "@/utils/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

type reqWithShiftType = NextRequest & {
  body: ShiftTypeInterface;
};

export async function POST(req: reqWithShiftType) {
  if (!req.body)
    return NextResponse.json({ message: "No shift provided in body" });

  console.log(req.body);
  const shiftToAdd: ShiftTypeInterface = await req.json();

  const res = await prisma.shiftType.create({
    data: {
      ...shiftToAdd,
    },
  });

  console.log(res);
  return NextResponse.json(res);
}
