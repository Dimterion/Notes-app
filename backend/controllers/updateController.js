const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Update = require("../models/updateModel");
const Note = require("../models/noteModel");

// @desc    Get updates for a note
// @route   GET /api/notes/:noteId/updates
// @access  Private
const getUpdates = asyncHandler(async (req, res) => {
  // Get user with the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const note = await Note.findById(req.params.noteId);

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updates = await Update.find({ note: req.params.noteId });

  res.status(200).json(updates);
});

// @desc    Create note update
// @route   POST /api/notes/:noteId/updates
// @access  Private
const addUpdate = asyncHandler(async (req, res) => {
  // Get user with the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const note = await Note.findById(req.params.noteId);

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const update = await Update.create({
    text: req.body.text,
    isStaff: false,
    note: req.params.noteId,
    user: req.user.id,
  });

  res.status(200).json(update);
});

module.exports = {
  getUpdates,
  addUpdate,
};
