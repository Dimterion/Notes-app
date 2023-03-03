import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";
import { errorMessage } from "../../utils";

const initialState = {
  notes: null,
  note: null,
};

// Create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Get user notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Get user note
export const getNote = createAsyncThunk(
  "notes/get",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNote(noteId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Mark note as complete
export const completeNote = createAsyncThunk(
  "notes/complete",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.completeNote(noteId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Mark note as in progress
export const inProgressNote = createAsyncThunk(
  "notes/in-progress",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.inProgressNote(noteId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.note = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.note = action.payload;
      })
      .addCase(completeNote.fulfilled, (state, action) => {
        state.note = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        );
      })
      .addCase(inProgressNote.fulfilled, (state, action) => {
        state.note = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        );
      });
  },
});

export default noteSlice.reducer;
