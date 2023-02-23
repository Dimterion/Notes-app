import { Link } from "react-router-dom";

function NoteItem({ note }) {
  return (
    <div className="ticket">
      <div>{new Date(note.createdAt).toLocaleString("en-GB")}</div>
      <div>{note.type}</div>
      <div className={`status status-${note.status}`}>{note.status}</div>
      <Link to={`/note/${note._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default NoteItem;
