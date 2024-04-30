import { ShiftTypeT } from "@/app/settings/SettingsShiftsStep";

export default function useSchedule() {
  const getShiftById = (shifts: ShiftTypeT[], shiftId: string) => {
    return shifts.filter((s) => s.id === shiftId)[0];
  };
  return { getShiftById };
}
