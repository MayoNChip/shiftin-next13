"use client";
import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const back = () => {
		if (currentStepIndex === 0) {
			return;
		}
		setCurrentStepIndex(currentStepIndex - 1);
	};

	const next = () => {
		if (currentStepIndex == steps.length - 1) return currentStepIndex;
		setCurrentStepIndex(currentStepIndex + 1);
	};
	const goToStep = (index: number) => {
		setCurrentStepIndex(index);
	};

	return {
		currentStepIndex,
		setCurrentStepIndex,
		steps,
		step: steps[currentStepIndex],
		next,
		back,
		goToStep,
	};
}
