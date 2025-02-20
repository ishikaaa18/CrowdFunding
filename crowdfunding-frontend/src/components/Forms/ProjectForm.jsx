import { useState } from "react";
import TextInput from "../inputs/TextInput";  
import TextArea from "../inputs/TextArea";  
import SelectInput from "../inputs/SelectInput";  
import FileInput from "../inputs/FileInput";
import "../../styles/TextInput.css";  // Inside TextInput.jsx
import "../../styles/SelectInput.css"; // Inside SelectInput.jsx
import "../../styles/TextArea.css";  // Inside TextArea.jsx
import "../../styles/FileInput.css";  // Inside FileInput.jsx


const ProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "Technology",
    endDate: "",
    minContribution: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.goal || !formData.endDate || !formData.minContribution) {
      alert("All fields are required!");
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    onSubmit(submissionData);
  };

  return (
    <div className="project-form-container">
      
      <p className="form-subtitle">Fill in the details to create your crowdfunding campaign.</p>

      <form onSubmit={handleSubmit} className="project-form">
        <TextInput label="Project Title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter project title" required />
        
        <TextArea label="Project Description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe your project" required />

        <TextInput label="Funding Goal (₹)" type="number" name="goal" value={formData.goal} onChange={handleChange} placeholder="Enter goal amount" required />
        
        <SelectInput label="Category" name="category" value={formData.category} onChange={handleChange} options={["Technology", "Health", "Education", "Environment", "Community"]} />

        <TextInput label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <TextInput label="Minimum Contribution (₹)" type="number" name="minContribution" value={formData.minContribution} onChange={handleChange} placeholder="Set minimum amount" required />

        <FileInput label="Upload Project Image" onChange={handleImageUpload} />

        <button type="submit" className="submit-btn">Submit Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;

