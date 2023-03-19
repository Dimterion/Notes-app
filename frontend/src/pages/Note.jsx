import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getNote,
  deleteNote,
  completeNote,
  inProgressNote,
} from "../features/notes/noteSlice";
import { getUpdates, createUpdate } from "../features/updates/updateSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import UpdateItem from "../components/UpdateItem";

const customStyles = {
  content: {
    width: "600px",
    maxWidth: "95vw",
    background: "#d6ccc2",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    border: "1px solid #252323",
  },
  overlay: {
    backgroundColor: "rgb(189 189 189 / 75%)",
  },
};

Modal.setAppElement("#root");

function Note() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateText, setUpdateText] = useState("");

  const { note } = useSelector((state) => state.notes);

  const { updates } = useSelector((state) => state.updates);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noteId } = useParams();

  useEffect(() => {
    dispatch(getNote(noteId)).unwrap().catch(toast.error);
    dispatch(getUpdates(noteId)).unwrap().catch(toast.error);
  }, [noteId, dispatch]);

  // Complete note
  const onNoteComplete = () => {
    window.confirm("Mark this note as complete?") &&
      dispatch(completeNote(noteId))
        .unwrap()
        .then(() => {
          toast.success("Note has been completed");
          navigate("/notes");
        })
        .catch(toast.error);
  };

  // Delete note
  const onNoteDelete = () => {
    window.confirm("Delete this note?") &&
      dispatch(deleteNote(noteId))
        .unwrap()
        .then(() => {
          toast.success("Note has been deleted");
          navigate("/notes");
        })
        .catch(toast.error);
  };

  // In progress note
  const onNoteInProgress = () => {
    window.confirm("Set this note status as in-progress?") &&
      dispatch(inProgressNote(noteId)).unwrap().catch(toast.error);
  };

  // Create update submit
  const onUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(createUpdate({ updateText, noteId }))
      .unwrap()
      .then(() => {
        setUpdateText("");
        closeModal();
      })
      .catch(toast.error);
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (!note) {
    return <Spinner />;
  }

  return (
    <div className="note-page">
      <header className="note-header">
        <BackButton />
        <h2>
          Note ID: {note._id}
          <span className={`status status-${note.status}`}>{note.status}</span>
        </h2>
        <h3>Created at: {new Date(note.createdAt).toLocaleString("en-GB")}</h3>
        <h3>Type: {note.type}</h3>
        <div className="note-desc">
          <h3>Description</h3>
          <p>{note.description}</p>
        </div>
        {note.status !== "complete" && note.status !== "in-progress" && (
          <button onClick={onNoteInProgress} className="btn">
            Set as in-progress
          </button>
        )}
        <h2>Updates</h2>
      </header>
      {note.status !== "complete" && (
        <button onClick={openModal} className="btn btn-reverse">
          <FaPlus /> Post an update
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Post an update"
      >
        <h2>Note update</h2>
        <button className="btn-complete" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onUpdateSubmit}>
          <div className="form-group">
            <textarea
              name="updateText"
              id="updateText"
              className="form-control update-text"
              placeholder="Update text"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Post update
            </button>
          </div>
        </form>
      </Modal>
      {updates ? (
        updates.map((update) => <UpdateItem key={update._id} update={update} />)
      ) : (
        <Spinner />
      )}
      {note.status !== "complete" && (
        <button onClick={onNoteComplete} className="btn">
          Mark as complete
        </button>
      )}
      <button onClick={onNoteDelete} className="btn btn-danger">
        X Delete this note
      </button>
    </div>
  );
}

export default Note;
