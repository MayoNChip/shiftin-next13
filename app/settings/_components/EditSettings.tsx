"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import WorkDays, { WorkDayType } from "./WorkDays";
import SettingsShiftsStep, { ShiftTypeT } from "../SettingsShiftsStep";

function EditSettings({
  workDays,
  shiftTypes,
}: {
  workDays: WorkDayType[];
  shiftTypes: ShiftTypeT[];
}) {
  const [edit, setEdit] = useState<"st" | "wd">();

  const handleEdit = (type: "wd" | "st") => {
    setEdit(type);
  };

  return (
    <div>
      <Button onClick={() => handleEdit("wd")}>Edit Work Days</Button>
      <Button onClick={() => handleEdit("st")}>Edit Shift Types</Button>
      {edit && edit === "wd" ? (
        <WorkDays workDays={workDays} />
      ) : (
        edit === "st" && <SettingsShiftsStep shiftTypes={shiftTypes} />
      )}
    </div>
  );
}

export default EditSettings;
