import { Link } from "react-router-dom";
import { MdNoteAdd, MdNotes } from "react-icons/md";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Notes</h1>
        <p>Write a note or view your current ones</p>
      </section>
      <div className="btn-block">
        <Link to="/new-note" className="btn btn-reverse btn-block">
          <MdNoteAdd /> New Note
        </Link>
        <Link to="/notes" className="btn btn-block">
          <MdNotes /> My Notes
        </Link>
      </div>
    </>
  );
}

export default Home;
