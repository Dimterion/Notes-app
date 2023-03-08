import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

function Notes() {
  const { user } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (!notes) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>{user.name}'s Notes</h1>
      <div className="notes">
        <div className="note-headings">
          <div>Date</div>
          <div>Type</div>
          <div>Status</div>
        </div>
        {notes.length > 0 ? (
          notes.map((note) => <NoteItem key={note._id} note={note} />)
        ) : (
          <p>No notes so far</p>
        )}
        <Link to="/new-note" className="btn">
          <MdNoteAdd /> New Note
        </Link>
      </div>
    </>
  );
}

export default Notes;
