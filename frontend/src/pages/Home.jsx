import { Link } from "react-router-dom";
import { MdNoteAdd, MdNotes } from "react-icons/md";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Create Your Notes</h1>
        <p>Please choose</p>
      </section>
      <Link to="/new-note" className="btn btn-reverse btn-block">
        <MdNoteAdd /> Create New Note
      </Link>
      <Link to="/notes" className="btn btn-block">
        <MdNotes /> View My Notes
      </Link>
    </>
  );
}

export default Home;
