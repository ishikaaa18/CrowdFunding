import React from 'react';
import '../../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { title: 'Create a Campaign', description: 'Start your campaign by providing details about your cause.' },
    { title: 'Raise Funds', description: 'Promote your campaign to gather donations from generous people.' },
    { title: 'Make a Difference', description: 'Use the funds raised to support the cause and make a lasting impact.' },
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="row justify-content-center">
        {steps.map((step, index) => (
          <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>
            <div className="step">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;


