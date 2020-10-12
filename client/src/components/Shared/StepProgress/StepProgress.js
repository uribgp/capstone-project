import React from 'react';
import './step-progress.style.scss'
export default function StepRrogress({ currentStep, text, numberOfSteps }) {
  return (
    <div className="step-progress">
      <div className="step-progress-text">{text} - </div> 
      <div className="step-progress-current step-progress-number">{currentStep}</div>
      /
      <div className="step-progress numberOf step-progress-number">{numberOfSteps}</div>
    </div>
  );
}
