import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const CampaignForm = () => {
  const { user } = useContext(AuthContext); // Use context to get the user data
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

    // Check if the user is logged in (using AuthContext)
    if (!user || !user.id) {
      alert("User not logged in!");
      return;
    }

    // Prepare form data for campaign creation
    const campaignData = new FormData();
    campaignData.append("title", formData.title);
    campaignData.append("description", formData.description);
    campaignData.append("goalAmount", Number(formData.goalAmount)); // Ensure it's a number
    campaignData.append("deadline", formData.deadline);
    campaignData.append("status", "active"); // Default status as "active"
    campaignData.append("image", formData.image); // Append the image
    campaignData.append("creator", user.id); // Use user.id from context

    // Debugging: Log FormData values
    for (let [key, value] of campaignData.entries()) {
      console.log(`${key}:`, value);
    }

    // Make API call to create the campaign
    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", campaignData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success: Alert and reset the form
      alert("✅ Campaign Created Successfully!");
      console.log("Response:", response.data);

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        goalAmount: "",
        deadline: "",
        image: null,
      });
    } catch (error) {
      // Error: Handle failure to create campaign
      console.error("❌ Error creating campaign:", error.response?.data || error.message);
      alert("Failed to create campaign: " + (error.response?.data?.error || "Unknown error"));
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


