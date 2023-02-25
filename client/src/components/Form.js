import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addNoteAsync, getNotesAsync } from "../redux/Notes/notesSlice";

const colors = [
	{ id: 1, color: "#B71C1C" },
	{ id: 2, color: "#1A237E" },
	{ id: 3, color: "#1B5E20" },
	{ id: 4, color: "#BF360C" },
	{ id: 5, color: "#263238" },
];

function Form() {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteContent, setNoteContent] = useState("");
	const [noteColor, setNoteColor] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		if (!noteTitle || !noteContent || !noteColor) {
			e.preventDefault();
			return;
		}
		e.preventDefault();
		await dispatch(addNoteAsync({ noteTitle, noteContent, noteColor }));
		dispatch(getNotesAsync());
		setNoteTitle("");
		setNoteContent("");
		setNoteColor("");
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="formContainer">
				<Input placeholder="Enter your note header here..." value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
				<TextArea onResize={false} rows={12} placeholder="Enter your note here.." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
			</div>
			<div className="formBottom">
				<div className="radioButtons">
					<p>Note Color : </p>
					{colors.map((item) => (
						<div className="radioBut" key={item.id} style={{ backgroundColor: item.color }}>
							<input type="radio" name="radio" id={`radio${item.id}`} value={item.color} onChange={(e) => setNoteColor(e.target.value)} />
							<span className={noteColor === item.color ? "radioSpanVisible" : "radioSpan"}>
								<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
							</span>
						</div>
					))}
				</div>
				<Button htmlType="submit" type="primary" disabled={noteTitle === "" || noteContent === "" || noteColor === ""}>
					Add Note
				</Button>
			</div>
		</form>
	);
}

export default Form;
