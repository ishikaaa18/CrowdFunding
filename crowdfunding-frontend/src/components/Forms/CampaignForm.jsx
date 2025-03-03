import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createCampaign } from "../../services/campaignService";

const CampaignForm = () => {
  const { user } = useContext(AuthContext);

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

    if (!user) {
      alert("❌ User not logged in!");
      return;
    }

    const { title, description, goalAmount, deadline, image } = formData;

    console.log("📝 Form Data Before Submission:", formData);

    if (!title.trim() || !description.trim()) {
      alert("❌ Title and Description are required!");
      return;
    }

    if (!goalAmount || isNaN(Number(goalAmount)) || Number(goalAmount) <= 0) {
      alert("❌ Goal Amount must be a valid positive number!");
      return;
    }

    const parsedDeadline = new Date(deadline);
    if (!deadline || isNaN(parsedDeadline.getTime())) {
      alert("❌ Please select a valid deadline!");
      return;
    }

    try {
      const campaignData = new FormData();
      campaignData.append("title", title);
      campaignData.append("description", description);
      campaignData.append("goalAmount", goalAmount.toString());
      campaignData.append("deadline", parsedDeadline.toISOString());

      if (image) {
        campaignData.append("image", image);
      }

      console.log("📤 Sending Campaign Data:");
      for (let pair of campaignData.entries()) {
        console.log(pair[0] + ": " + pair[1]); // Shows values being sent
      }

      await createCampaign(campaignData);
      alert("✅ Campaign Created Successfully!");

      setFormData({ title: "", description: "", goalAmount: "", deadline: "", image: null });

      document.querySelector("input[type='file']").value = ""; // Reset file input manually
    } catch (error) {
      console.error("❌ Error creating campaign:", error.response?.data || error.message);
      alert("Failed to create campaign: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <label>Campaign Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <label>Goal Amount (₹):</label>
      <input type="number" name="goalAmount" value={formData.goalAmount} onChange={handleChange} required min="1" />

      <label>Deadline:</label>
      <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />

      <label>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button type="submit">Start Campaign</button>
    </form>
  );
};

export default CampaignForm;
