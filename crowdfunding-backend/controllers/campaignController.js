import Campaign from "../models/Campaign.js"; // Ensure you import the model

const createCampaign = async (req, res) => {
  try {
    console.log("📝 Received Request Body:", req.body); // Debugging log

    const { title, description, goalAmount, deadline, image } = req.body;

    if (!title || !description || !goalAmount || !deadline || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Create and save the campaign
    const newCampaign = await Campaign.create({
      title,
      description,
      goalAmount: Number(goalAmount),
      raisedAmount: 0, // Default value
      deadline: new Date(deadline), // Ensure Date format
      creator: req.user._id, // Get user ID from auth middleware
      image,
    });

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (error) {
    console.error("❌ Error creating campaign:", error);
    res.status(500).json({ message: "Server error creating campaign" });
  }
};

export default createCampaign;
