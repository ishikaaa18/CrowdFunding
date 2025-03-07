import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateCampaign.css";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isFeatured, setIsFeatured] = useState(false); // New state for "isFeatured"
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", goalAmount);
    formData.append("deadline", deadline);
    formData.append("isFeatured", isFeatured);
    if (image) formData.append("image", image);
  
    // Get the token from localStorage
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "";
  
    try {
      // Sending data to the backend to create a new campaign
      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
  
      alert("Campaign created successfully!");
      navigate("/dashboard"); // Redirect to dashboard after campaign is created
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="create-campaign-container">
      <h2>Create a New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Goal Amount:</label>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            min="1"
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Featured:</label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
          />
        </div>
        <div>
          <label>Image (Optional):</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
