const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

// @desc    Get user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user with the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
});

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { type, description } = req.body;

  if (!type || !description) {
    res.status(400);
    throw new Error("Please add a type and description");
  }

  // Get user with the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const note = await Note.create({
    type,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
