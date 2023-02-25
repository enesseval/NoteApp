import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "antd";
import { filterNoteList, getNotesAsync } from "../redux/Notes/notesSlice";
import { useDispatch } from "react-redux";

const colors = [
	{ id: 1, color: "#B71C1C" },
	{ id: 2, color: "#1A237E" },
	{ id: 3, color: "#1B5E20" },
	{ id: 4, color: "#BF360C" },
	{ id: 5, color: "#263238" },
];

function Search() {
	const [filterNoteColor, setFilterNoteColor] = useState("");
	const [filterNoteText, setFilterNoteText] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (filterNoteColor !== "" || filterNoteText !== "") {
			dispatch(filterNoteList({ filterNoteColor, filterNoteText }));
		} else {
			dispatch(getNotesAsync());
		}
	}, [filterNoteColor, filterNoteText, dispatch]);

	const clearFilter = () => {
		setFilterNoteColor("");
		setFilterNoteText("");
		dispatch(getNotesAsync());
	};

	return (
		<div className="search">
			<Button style={{ marginBottom: 10 }} onClick={() => clearFilter()} disabled={filterNoteColor === "" && filterNoteText === ""}>
				CLEAR FİLTER
			</Button>
			<Input placeholder="Search" value={filterNoteText} onChange={(e) => setFilterNoteText(e.target.value)} />
			<div className="radioButtons">
				{colors.map((item) => (
					<div className="radioBut" key={item.id} style={{ backgroundColor: item.color, marginTop: 15 }}>
						<input type="radio" name="radio" id={`radio${item.id}`} value={item.color} onChange={(e) => setFilterNoteColor(e.target.value)} />
						<span className={filterNoteColor === item.color ? "radioSpanVisible" : "radioSpan"}>
							<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Search;
