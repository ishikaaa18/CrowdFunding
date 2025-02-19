import { useState } from "react";
import "../../styles/StartProject.css"; // Importing styles

const ProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("Technology");
  const [endDate, setEndDate] = useState("");
  const [minContribution, setMinContribution] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !goal || !endDate || !minContribution) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goal", goal);
    formData.append("category", category);
    formData.append("endDate", endDate);
    formData.append("minContribution", minContribution);
    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData); // Pass data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <label>Project Title:</label>
      <input
        type="text"
        placeholder="Enter project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Project Description:</label>
      <textarea
        placeholder="Describe your project"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <label>Funding Goal (₹):</label>
      <input
        type="number"
        placeholder="Enter goal amount"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Environment">Environment</option>
        <option value="Community">Community</option>
      </select>

      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />

      <label>Minimum Contribution (₹):</label>
      <input
        type="number"
        placeholder="Set minimum amount"
        value={minContribution}
        onChange={(e) => setMinContribution(e.target.value)}
        required
      />

      <label>Upload Project Image:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <button type="submit">Submit Project</button>
    </form>
  );
};

export default ProjectForm;
