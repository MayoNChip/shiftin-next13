import { useDroppable } from "@dnd-kit/core";
import { UserShiftType, UserWorkDay } from "../ScheduleGrid";
import { cn } from "@/utils";
import { Employee, ShiftTypeToEmployee } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ScheduleShifts, ScheduleType } from "@/actions/scheduleActions";
import EmployeeDraggable from "./EmployeeDraggable";

type Props = {
  workDay: UserWorkDay;
  shiftType: UserShiftType;
  rowIndex: number;
  colIndex: number;
  isDropped: boolean;
  userEmployees:
    | ({ shiftTypeToEmployee: ShiftTypeToEmployee[] } & Employee)[]
    | undefined;
  shiftEmployees: {
    shiftTypeId: string;
    workDayId: string;
    employeeId: string;
  }[];
  schedule: ScheduleType | null | undefined;
  scheduleShifts: ScheduleShifts;
};

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const generateRandomeColor = () => {
  return colors[Math.floor(Math.random() * colors.length - 1)];
};

function ShiftDroppable({
  scheduleShifts,
  schedule,
  workDay,
  shiftType,
  rowIndex,
  colIndex,
  isDropped,
  shiftEmployees,
  userEmployees,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${workDay.id}-${shiftType.id}`,
    data: { workDay, shiftType },
  });

  return (
    <div
      ref={setNodeRef}
      id={`${workDay.id}-${shiftType.id}`}
      key={`${workDay.id}-${shiftType.id}`}
      className={cn(
        isOver && "bg-secondary",
        "border-2 border-secondary rounded flex flex-col items-center py-2 h-48 min-w-[150px]"
      )}
      style={{
        gridColumnStart: colIndex + 2,
        gridRowStart: rowIndex + 2,
      }}
    >
      <div className="flex items-center flex-col gap-2">
        {scheduleShifts
          ?.filter(
            (s) => s.shiftTypeId === shiftType.id && s.workDayId === workDay.id
          )
          .map((shift) => {
            console.log(
              "workday from shift",
              shift.workDayId,
              "shiftTypeid",
              shift.shiftTypeId
            );
            console.log("workday", workDay.id, "shiftTypeid", shiftType.id);
            return shift.employees.map((e) => (
              <EmployeeDraggable
                key={`{${e.employeeId}}${e.employee?.userId}`}
                {...e}
              />
            ));
          })}
        {shiftEmployees
          ?.filter((s) => {
            return s.shiftTypeId === shiftType.id && s.workDayId === workDay.id;
          })
          .map((employee) => (
            <Button key={employee.employeeId}>
              {userEmployees
                ?.filter((emp) => {
                  return emp.id === employee.employeeId;
                })
                .map((emp) => emp.firstName + " " + emp.lastName)}
            </Button>
            // <EmployeeDraggable   key={employee.employeeId} />
          ))}
      </div>
    </div>
  );
}

export default ShiftDroppable;
