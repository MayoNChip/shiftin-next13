import { useDroppable } from "@dnd-kit/core";
import { UserShiftType, UserWorkDay } from "../ScheduleGrid";
import { cn } from "@/utils";
import { Employee, ShiftTypeToEmployee } from "@prisma/client";
import { Button } from "@/components/ui/button";

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

  console.log("shifts", shiftEmployees);

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
        {shiftEmployees?.map((employee) => (
          <Button
            // className={`bg-${generateRandomeColor()}-500`}
            key={employee.employeeId}
          >
            {userEmployees
              ?.filter((emp) => {
                return emp.id === employee.employeeId;
              })
              .map((emp) => emp.firstName + " " + emp.lastName)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ShiftDroppable;
