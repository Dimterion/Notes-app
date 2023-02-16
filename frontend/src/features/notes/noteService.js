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

const noteService = {
  createNote,
};

export default noteService;
