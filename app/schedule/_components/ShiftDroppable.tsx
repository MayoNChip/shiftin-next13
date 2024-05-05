import { useDroppable } from "@dnd-kit/core";
import { UserShiftType, UserWorkDay } from "../ScheduleGrid";
import { cn } from "@/utils";

type Props = {
  workDay: UserWorkDay;
  shiftType: UserShiftType;
  rowIndex: number;
  colIndex: number;
  isDropped: boolean;
};

function ShiftDroppable({
  workDay,
  shiftType,
  rowIndex,
  colIndex,
  isDropped,
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
        "border-2 border-secondary rounded flex flex-col items-center py-2"
      )}
      style={{
        gridColumnStart: colIndex + 2,
        gridRowStart: rowIndex + 2,
      }}
    >
      <div>{`${shiftType.shiftType.shiftType}`}</div>
    </div>
  );
}

export default ShiftDroppable;
