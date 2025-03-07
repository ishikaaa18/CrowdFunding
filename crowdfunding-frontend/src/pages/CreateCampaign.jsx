import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CreateCampaign.css";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", goalAmount);
    formData.append("deadline", deadline);
    formData.append("isFeatured", isFeatured);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "";

    try {
      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Campaign created successfully!");
      navigate("/dashboard");
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
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="goalAmount">Goal Amount:</label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isFeatured">Featured:</label>
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (Optional):</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
