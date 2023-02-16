import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getNote, completeNote, reset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Note() {
  const { note, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getNote(noteId));
    // eslint-disable-next-line
  }, [isError, message, noteId]);

  // Complete note
  const onNoteComplete = () => {
    dispatch(completeNote(noteId));
    toast.success("Note complete");
    navigate("/notes");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong.</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/notes" />
        <h2>
          Note ID: {note._id}
          <span className={`status status-${note.status}`}>{note.status}</span>
        </h2>
        <h3>
          Date created: {new Date(note.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Type: {note.type}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the note</h3>
          <p>{note.description}</p>
        </div>
      </header>
      {note.status !== "complete" && (
        <button onClick={onNoteComplete} className="btn btn-block btn-danger">
          Mark as Complete
        </button>
      )}
    </div>
  );
}

export default Note;
