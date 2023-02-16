import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

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

  return <div>Notes</div>;
}

export default Notes;
