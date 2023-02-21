import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updateService from "./updateService";
import { errorMessage } from "../../utils";

const initialState = {
  notes: null,
};

// Get note updates
export const getUpdates = createAsyncThunk(
  "updates/getAll",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updateService.getUpdates(noteId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Create note update
export const createUpdate = createAsyncThunk(
  "updates/create",
  async ({ updateText, noteId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updateService.createUpdate(updateText, noteId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

export const updateSlice = createSlice({
  name: "update",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUpdates.pending, (state) => {
        state.updates = null;
      })
      .addCase(getUpdates.fulfilled, (state, action) => {
        state.updates = action.payload;
      })
      .addCase(createUpdate.fulfilled, (state, action) => {
        state.updates.push(action.payload);
      });
  },
});

export default updateSlice.reducer;
