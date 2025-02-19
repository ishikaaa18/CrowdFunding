import ProjectForm from "../components/Forms/ProjectForm";
<link rel="stylesheet" href="StartProject.css" />

const StartProject = () => {
  const handleProjectSubmit = (formData) => {
    alert(`Project "${formData.get("title")}" has been submitted!`);
    // Here, integrate API call to store project details
  };

  return (
    <div className="start-project-container">
      <h2>Start a New Project</h2>
      <ProjectForm onSubmit={handleProjectSubmit} />
    </div>
  );
};

export default StartProject;


  