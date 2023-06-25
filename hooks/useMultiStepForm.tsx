"use client";
import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const back = () => {
		setCurrentStepIndex((prevIndex) => {
			if (currentStepIndex <= 0) {
				console.log("first step");
				return prevIndex;
			} else return prevIndex - 1;
		});
	};

	const next = () => {
		setCurrentStepIndex((prevIndex) => {
			if (prevIndex >= steps.length - 1) {
				console.log("last step");
				return prevIndex;
			} else {
				return prevIndex + 1;
			}
		});
	};

	const goToStep = (index: number) => {
		setCurrentStepIndex(index);
	};

	return {
		currentStepIndex,
		setCurrentStepIndex,
		steps,
		step: steps[currentStepIndex],
		isLastStep: currentStepIndex === steps.length - 1,
		next,
		back,
		goToStep,
	};
}
