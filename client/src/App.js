import "./App.css";
import Form from "./components/Form";
import NoteList from "./components/NoteList";
import Search from "./components/Search";

function App() {
	return (
		<div className="container">
			<h1>NotesApp</h1>
			<Form />
			<Search />
			<NoteList />
		</div>
	);
}

export default App;
