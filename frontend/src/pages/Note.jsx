import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getNote, completeNote } from "../features/notes/noteSlice";
import {
  getUpdates,
  reset as updatesReset,
} from "../features/updates/updateSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import UpdateItem from "../components/UpdateItem";

function Note() {
  const { note, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.notes
  );

  const { updates, isLoading: updatesIsLoading } = useSelector(
    (state) => state.updates
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
    dispatch(getUpdates(noteId));
    // eslint-disable-next-line
  }, [isError, message, noteId, dispatch]);

  // Complete note
  const onNoteComplete = () => {
    dispatch(completeNote(noteId));
    toast.success("Note complete");
    navigate("/notes");
  };

  if (isLoading || updatesIsLoading) {
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
        <h2>Updates</h2>
      </header>
      {updates &&
        updates.map((update) => (
          <UpdateItem key={update._id} update={update} />
        ))}
      {note.status !== "complete" && (
        <button onClick={onNoteComplete} className="btn btn-block btn-danger">
          Mark as Complete
        </button>
      )}
    </div>
  );
}

export default Note;
