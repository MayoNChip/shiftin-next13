"use client";

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
    <div
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      id={id}
      className={`bg-primary text-white p-2 m-2 rounded cursor-grab`}
    >
      <h1>
        {firstName} {lastName}
      </h1>
    </div>
  );
}

export default EmployeeDraggable;
