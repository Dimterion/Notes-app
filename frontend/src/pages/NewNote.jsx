import { useState } from "react";
import { useSelector } from "react-redux";

function NewNote() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [type, setType] = useState("Task");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create New Note</h1>
        <p>Fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Task">Task</option>
              <option value="Thought">Thought</option>
              <option value="Quote">Quote</option>
              <option value="Event">Event</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the note</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Create</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewNote;
