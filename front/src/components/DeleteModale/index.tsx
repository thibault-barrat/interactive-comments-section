import React from "react";
import styles from "./DeleteModale.module.scss";
import Button from "../Button";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

type Props = {
  id: number;
  setShowDeleteModale: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModale: React.FC<Props> = ({ id, setShowDeleteModale }) => {
  const { accessToken } = useAppState();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .delete(process.env.REACT_APP_API_URL + `/deleteComment/${id}`, header)
      .then(() => {
        dispatch({ type: ACTION_TYPES.DELETE_COMMENT, payload: id });
        setShowDeleteModale(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>Delete comment</h2>
        <p className={styles.text}>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className={styles.buttons}>
          <Button
            text="No, cancel"
            onClick={() => setShowDeleteModale(false)}
            color="gray"
            type="button"
          />
          <Button
            text="Yes, delete"
            onClick={handleDelete}
            color="red"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModale;
