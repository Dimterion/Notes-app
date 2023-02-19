const express = require("express");

const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

// Re-route into update router
const updateRouter = require("./updateRoutes");
router.use("/:noteId/updates", updateRouter);

router.route("/").get(protect, getNotes).post(protect, createNote);

router
  .route("/:id")
  .get(protect, getNote)
  .delete(protect, deleteNote)
  .put(protect, updateNote);

module.exports = router;
