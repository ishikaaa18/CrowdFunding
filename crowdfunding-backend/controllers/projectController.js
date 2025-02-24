const Project = require("../models/Project.js");

// Create a new campaign
const createProject = async (req, res) => {
  try {
    const { title, description, goalAmount, deadline, imageUrl } = req.body;

    const project = await Project.create({
      title,
      description,
      goalAmount,
      deadline,
      creator: req.user._id, // User creating the project
      imageUrl,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all campaigns
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("creator", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single campaign by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("creator", "name email");

    if (!project) return res.status(404).json({ message: "Campaign not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a campaign (Only creator can update)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Campaign not found" });

    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this campaign" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a campaign (Only creator can delete)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Campaign not found" });

    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this campaign" });
    }

    await project.deleteOne();
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export all functions
module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };
