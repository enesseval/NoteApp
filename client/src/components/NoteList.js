import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotesAsync, selectNotes } from "../redux/Notes/notesSlice";

function NoteList() {
	const notes = useSelector(selectNotes);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getNotesAsync());
	}, [dispatch]);

	return (
		<div className="noteList">
			{notes.length == 0 && (
				<>
					<div></div>
					<div style={{ display: "flex", textAlign: "center" }}>
						<h1>Not Found a Note</h1>
					</div>
				</>
			)}
			{notes &&
				notes.map((item) => (
					<div style={{ backgroundColor: item.noteColor }} className="noteCard" key={item.noteId}>
						<div className="noteTitle">{item.noteTitle}</div>
						<div className="noteContent">{item.noteContent}</div>
					</div>
				))}
		</div>
	);
}

export default NoteList;
