const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let notes = [
	{
		noteId: nanoid(),
		noteTitle: "Note Title",
		noteColor: "#B71C1C",
		noteContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus, libero laboriosam officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 2",
		noteColor: "#1A237E",
		noteContent: "Lorem ipsum dolor sit amet  adipisicing elit. Tenetur necessitatibus, libero laboriosam officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 3",
		noteColor: "#1B5E20",
		noteContent: "Lorem ipsum dolor sit amet consectetur  elit. Tenetur necessitatibus, libero laboriosam officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 4",
		noteColor: "#BF360C",
		noteContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  necessitatibus, libero laboriosam officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 5",
		noteColor: "#263238",
		noteContent: "Lorem  dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus, libero laboriosam officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 6",
		noteColor: "#B71C1C",
		noteContent: "Lorem ipsum dolor sit amet consectetur  elit. Tenetur , libero  officiis porro velit",
	},
	{
		noteId: nanoid(),
		noteTitle: "Note Title 7",
		noteColor: "#1A237E",
		noteContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus, libero laboriosam officiis porro velit",
	},
];

app.get("/notes", (req, res) => res.send(notes));

app.post("/notes", (req, res) => {
	const note = { noteId: nanoid(), noteTitle: req.body.noteTitle, noteColor: req.body.noteColor, noteContent: req.body.noteContent };
	notes.push(note);
	return res.send(note);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server runing on port ${PORT}`.green.bold));
