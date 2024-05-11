"use client";

import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { Employee } from "@prisma/client";

function EmployeeDraggable({ id, firstName, lastName, userId }: Employee) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      firstName,
      lastName,
      userId,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      id={id}
      className={`p-2 m-2 cursor-grab`}
    >
      <h1>
        {firstName} {lastName}
      </h1>
    </Button>
  );
}

export default EmployeeDraggable;
