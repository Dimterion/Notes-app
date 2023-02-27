const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Please select a type"],
      enum: ["Task", "Thought", "Quote", "Event"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the note"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "in-progress", "complete"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
