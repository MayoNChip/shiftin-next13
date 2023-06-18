"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useForkRef } from "@mui/material";
import React from "react";

function SettingsFrom() {
  const { currentStepIndex, next } = useMultiStepForm([
    <div>hello</div>,
    <div>world</div>,
  ]);
  return (
    <div>
      {currentStepIndex}
      <Button onClick={next}>Next</Button>
    </div>
  );
}

export default SettingsFrom;
