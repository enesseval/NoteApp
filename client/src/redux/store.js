import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./Notes/notesSlice";

export const store = configureStore({
	reducer: {
		notes: notesSlice,
	},
});
