import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getNote, completeNote } from "../features/notes/noteSlice";
import {
  getUpdates,
  createUpdate,
  reset as updatesReset,
} from "../features/updates/updateSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import UpdateItem from "../components/UpdateItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Note() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateText, setUpdateText] = useState("");

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

  // Create update submit
  const onUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(createUpdate({ updateText, noteId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
      {note.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Post an update
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Post an update"
      >
        <h2>Post an update</h2>
        <button className="btn-complete" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onUpdateSubmit}>
          <div className="form-group">
            <textarea
              name="updateText"
              id="updateText"
              className="form-control"
              placeholder="Update text"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
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
