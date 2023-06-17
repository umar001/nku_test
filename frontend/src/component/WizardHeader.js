import React from 'react';

const WizardHeader = ({ activeStep }) => {
    const steps = [
        { step: 1, heading: 'Step 1', subHeading: 'Login User' },
        { step: 2, heading: 'Step 2', subHeading: 'Add Item' },
        { step: 3, heading: 'Step 3', subHeading: 'Preview Item' },
        { step: 4, heading: 'Step 4', subHeading: 'Edit Item' }
    ];

    return (
        <div className="wizard-header">
            {steps.map((step) => (
                <div
                    key={step.step}
                    className={`wizard-step ${activeStep === step.step ? 'active' : ''}`}
                >
                    <div className="step-heading">{step.heading}</div>
                    <div className="step-subheading">{step.subHeading}</div>
                </div>
            ))}
        </div>
    );
};

export default WizardHeader;
