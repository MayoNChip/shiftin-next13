"use server";

import { SignUpUser } from "@/commonTypes";
import { prisma } from "@/lib/prisma";

export const signUpUser = async (user: SignUpUser) => {
  "use server";
  const { email, password, name } = user;
  const emailLowerCase = email.toLowerCase();

  let daysArrayToCreate: {
    workDayId: number;
    active: boolean;
  }[] = [];

  for (let i = 1; i <= 7; i++) {
    daysArrayToCreate.push({
      workDayId: i,
      active: false,
    });
  }

  const res = await prisma.user.create({
    data: {
      ...user,
      email: emailLowerCase,
      userToWorkDay: {
        createMany: { data: daysArrayToCreate },
      },
    },
  });

  return res.id;
};
