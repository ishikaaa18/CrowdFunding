import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/StartCampaign.css";

const StartCampaign = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored
      if (!token) {
        alert("You must be logged in to create a campaign!");
        setLoading(false);
        return;
      }

      const campaignData = new FormData();
      campaignData.append("title", formData.title);
      campaignData.append("description", formData.description);
      campaignData.append("goalAmount", formData.goalAmount);
      campaignData.append("deadline", formData.deadline);
      campaignData.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        campaignData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Campaign Created Successfully!");
      navigate("/campaigns"); // Redirect after success
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data || error);
      alert("Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="campaign-container">
      <h2>Start a Campaign</h2>
      <form className="campaign-form" onSubmit={handleSubmit}>
        <label>Campaign Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Goal Amount (₹):</label>
        <input type="number" name="goalAmount" value={formData.goalAmount} onChange={handleChange} required />

        <label>Deadline:</label>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Start Campaign"}</button>
      </form>
    </div>
  );
};

export default StartCampaign;
