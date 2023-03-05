import axios from "axios";

const API_URL = "/api/notes/";

// Create new note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

// Delete note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteId, config);

  return response.data;
};

// Get user notes
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user note
const getNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + noteId, config);

  return response.data;
};

// Mark note as complete
const completeNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + noteId,
    { status: "complete" },
    config
  );

  return response.data;
};

// Mark note as in progress
const inProgressNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + noteId,
    { status: "in-progress" },
    config
  );

  return response.data;
};

const noteService = {
  createNote,
  deleteNote,
  getNotes,
  getNote,
  completeNote,
  inProgressNote,
};

export default noteService;
