import axios from "axios";

const API_URL = "/api/notes/";

// Get note updates
const getUpdates = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + noteId + "/updates", config);

  return response.data;
};

// Create note update
const createUpdate = async (updateText, noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + noteId + "/updates",
    {
      text: updateText,
    },
    config
  );

  return response.data;
};

const updateService = {
  getUpdates,
  createUpdate,
};

export default updateService;
