import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

function Notes() {
  const { notes, isLoading, isSuccess } = useSelector((state) => state.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (isLoading) {
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
          <div></div>
        </div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
}

export default Notes;
