import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const workDays = await prisma.workDay.findMany({});

  if (workDays.length > 0) {
    return;
  }
  await prisma.workDay.createMany({
    data: [
      {
        id: 1,
        day: "sunday",
      },
      {
        id: 2,
        day: "monday",
      },
      {
        id: 3,
        day: "tuesday",
      },
      {
        id: 4,
        day: "wednesday",
      },
      {
        id: 5,
        day: "thursday",
      },
      {
        id: 6,
        day: "friday",
      },
      {
        id: 7,
        day: "saturday",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("error seeding", e);
    await prisma.$disconnect();
    process.exit(1);
  });
