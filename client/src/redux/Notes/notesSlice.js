import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

export const getNotesAsync = createAsyncThunk("notes/getNotesAsync", async () => {
	const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`);
	return res.data;
});

export const addNoteAsync = createAsyncThunk("notes/addNoteAsync", async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`, data);
	return res.data;
});

export const notesSlice = createSlice({
	name: "notes",
	initialState: {
		items: [],
		itemsOrg: [],
		isLoading: false,
		error: null,
		filterColor: "",
		filterText: "",
	},
	reducers: {
		filterNoteList: (state, action) => {
			state.items = state.itemsOrg;
			if (action.payload.filterNoteText === "" && action.payload.filterNoteColor === "") state.items = state.itemsOrg;
			else {
				const filteredList = [];
				if (action.payload.filterNoteText !== "") {
					state.filterText = action.payload.filterNoteText;
					state.items.forEach((item) => {
						if (item.noteTitle.toLowerCase().indexOf(state.filterText.toLowerCase()) > -1) {
							filteredList.push(item);
						}
					});
				}
				if (action.payload.filterNoteColor !== "") {
					state.filterColor = action.payload.filterNoteColor;
					state.items.forEach((item) => {
						if (item.noteColor === state.filterColor) {
							filteredList.push(item);
						}
					});
				}
				state.items = filteredList;
			}
		},
	},
	extraReducers: {
		//get notes
		[getNotesAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getNotesAsync.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.itemsOrg = action.payload;
			state.isLoading = false;
		},
		[getNotesAsync.rejected]: (state, action) => {
			state.error = action.error.message;
			state.isLoading = false;
		},
		[addNoteAsync.fulfilled]: (state, action) => {
			state.items.push(action.payload);
		},
	},
});

export const selectNotes = (state) => {
	return state.notes.items;
};

export const { filterNoteList } = notesSlice.actions;
export default notesSlice.reducer;
