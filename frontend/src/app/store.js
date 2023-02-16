import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import noteReducer from "../features/notes/noteSlice";
import updateReducer from "../features/updates/updateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    updates: updateReducer,
  },
});
