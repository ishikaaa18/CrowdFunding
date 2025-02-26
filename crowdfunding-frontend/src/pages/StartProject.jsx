import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ensure correct path
import ProjectForm from "../components/Forms/ProjectForm";
import "../styles/StartProject.css";

const StartProject = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user info

  // Redirect if not logged in
  if (!user || !user.token) {
    navigate("/register"); // Redirect to login/register
    return null; // Prevent rendering before redirect
  }

  // Handle form submission
  const handleProjectSubmit = async (formData) => {
    try {
      const projectData = Object.fromEntries(formData.entries()); // Convert FormData to an object

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Ensure user has a token
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit project");
      }

      const responseData = await response.json();
      alert(`Project "${responseData.title}" has been submitted!`);
      navigate("/dashboard"); // Redirect to dashboard or project list
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Error submitting project. Please try again.");
    }
  };

  return (
    <div className="start-project-container">
      <h2>Start a New Project</h2>
      <ProjectForm onSubmit={handleProjectSubmit} />
    </div>
  );
};

export default StartProject;





  