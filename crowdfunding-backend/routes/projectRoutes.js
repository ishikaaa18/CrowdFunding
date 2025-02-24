const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, createProject); // Create a campaign (Authenticated)
router.get("/", getAllProjects); // Get all campaigns
router.get("/:id", getProjectById); // Get a single campaign by ID
router.put("/:id", protect, updateProject); // Update campaign (Only creator)
router.delete("/:id", protect, deleteProject); // Delete campaign (Only creator)

module.exports = router; // Use `module.exports` instead of `export default`
