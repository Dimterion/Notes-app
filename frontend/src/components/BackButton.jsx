import { FaArrowCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const { note } = useSelector((state) => state.notes);

  const navigate = useNavigate();

  return (
    <button
      className="btn btn-reverse btn-back"
      onClick={note ? () => navigate(-1) : () => navigate("/")}
    >
      <FaArrowCircleLeft /> Back
    </button>
  );
};

export default BackButton;
