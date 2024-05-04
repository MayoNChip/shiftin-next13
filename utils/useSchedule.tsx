import { prisma } from "@/lib/prisma";

type Props = {
  shiftTypesIds: number[];
  workDaysIds: number[];
};

export default function useSchedule({ shiftTypesIds, workDaysIds }: Props) {
  // const getShiftNames = async () => {
  //   try {
  //     const shiftNames = shiftTypesIds.map(async (id) => {
  //       const shiftType = await prisma.shiftType.findUnique({
  //         where: { id },
  //         select: { shiftType: true },
  //       });
  //       return { shiftTypeId: id, shiftType: shiftType?.shiftType };
  //     });
  //     return shiftNames;
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
}
// return {  };
// }
