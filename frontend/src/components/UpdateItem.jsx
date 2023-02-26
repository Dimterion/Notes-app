import { useSelector } from "react-redux";

function UpdateItem({ update }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="update"
      style={{
        backgroundColor: update.isStaff ? "rgba(0,0,0,0.7)" : "#f5ebe0",
        color: update.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Update from{" "}
        {update.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{update.text}</p>
      <div className="update-date">
        {new Date(update.createdAt).toLocaleString("en-GB")}
      </div>
    </div>
  );
}

export default UpdateItem;
