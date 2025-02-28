import React, { useState } from "react";
import axios from "axios";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaignData = new FormData();
    campaignData.append("title", formData.title);
    campaignData.append("description", formData.description);
    campaignData.append("goalAmount", formData.goalAmount);
    campaignData.append("deadline", formData.deadline);
    campaignData.append("status", "active"); // Default status
    campaignData.append("image", formData.image); // Upload image

    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", campaignData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Campaign Created Successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign.");
    }
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <label>Campaign Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter campaign title"
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your campaign..."
        required
      />

      <label>Goal Amount (₹):</label>
      <input
        type="number"
        name="goalAmount"
        value={formData.goalAmount}
        onChange={handleChange}
        placeholder="Enter goal amount"
        required
      />

      <label>Deadline:</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <label>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} required />

      <button type="submit">Start Campaign</button>
    </form>
  );
};

export default CampaignForm;

