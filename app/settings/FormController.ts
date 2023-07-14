"use server";
import { ShiftTypeInterface } from "@/commonTypes";
import { ShiftType } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const handleAddShiftType = async (shiftType: ShiftTypeInterface) => {
  //   try {
  const res = await axios.post(
    "http://localhost:3000/api/shifts/add",
    shiftType
  );
  console.log("res", res.data);
  revalidatePath("/settings");
  return res.data;
  //   } catch (error) {
  // console.log("error", error);
  //   }
};
