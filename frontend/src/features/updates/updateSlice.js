import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updateService from "./updateService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get note updates
export const getUpdates = createAsyncThunk(
  "updates/getAll",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await updateService.getUpdates(noteId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUpdates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUpdates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updates = action.payload;
      })
      .addCase(getUpdates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updates.push(action.payload);
      })
      .addCase(createUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = updateSlice.actions;
export default updateSlice.reducer;
