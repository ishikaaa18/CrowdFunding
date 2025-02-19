import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const { projectId } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null); // Store project details
  const [raised, setRaised] = useState(0); // Initialize raised amount

  useEffect(() => {
    // Simulated API fetch (Replace with actual API call)
    const projectData = {
      id: projectId,
      title: "Support Medical Research for Cancer",
      description: "Join us in supporting groundbreaking cancer research. Every donation will bring us closer to a cure.",
      goal: 10000,
      initialRaised: 3200,
    };

    setProject(projectData);
    setRaised(projectData.initialRaised);
  }, [projectId]);

  if (!project) return <p>Loading project details...</p>;

  // Handle donation logic
  const handleDonation = () => {
    if (raised < project.goal) {
      setRaised((prev) => Math.min(prev + 100, project.goal));
    }
  };

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="container">
      <h2 className="text-center my-4">{project.title}</h2>
      <p>{project.description}</p>
      <div className="row my-4">
        <div className="col-md-6">
          <h4>Funding Information</h4>
          <p>
            <strong>Goal:</strong> {formatCurrency(project.goal)}
          </p>
          <p>
            <strong>Raised:</strong> {formatCurrency(raised)}
          </p>
          <p>
            <strong>Remaining:</strong> {formatCurrency(
              Math.max(project.goal - raised, 0)
            )}
          </p>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-success w-100"
            onClick={handleDonation}
            disabled={raised >= project.goal}
          >
            {raised >= project.goal ? "Goal Reached 🎉" : "Donate $100"}
          </button>
          {raised >= project.goal && (
            <p className="text-success mt-2">Thank you! This project has been fully funded! 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;

