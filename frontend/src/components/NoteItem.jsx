import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteNote } from "../features/notes/noteSlice";

function NoteItem({ note }) {
  const dispatch = useDispatch();

  // Delete note
  const onNoteDelete = () => {
    window.confirm("Delete this note?") &&
      dispatch(deleteNote(note._id))
        .unwrap()
        .then(() => {
          window.location.reload(false);
        })
        .catch(toast.error);
  };

  return (
    <div className="note">
      <div>{new Date(note.createdAt).toLocaleString("en-GB")}</div>
      <div>{note.type}</div>
      <div className={`status status-${note.status}`}>{note.status}</div>
      <Link to={`/note/${note._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
      <button onClick={onNoteDelete} className="btn btn-sm">
        X
      </button>
    </div>
  );
}

export default NoteItem;
