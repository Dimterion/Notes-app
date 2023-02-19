const asyncHandler = require("express-async-handler");

const Note = require("../models/noteModel");

// @desc    Get user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
});

// @desc    Get user note
// @route   GET /api/notes/:id
// @access  Private
const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(note);
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

  const note = await Note.create({
    type,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(note);
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await note.remove();

  res.status(200).json({ success: true });
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
