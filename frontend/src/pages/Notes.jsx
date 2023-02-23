import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

function Notes() {
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
      <h1>Notes</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Type</div>
          <div>Status</div>
        </div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
}

export default Notes;
