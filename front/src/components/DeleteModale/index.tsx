import React from "react";
import styles from "./DeleteModale.module.scss";
import { Comment } from "../../models";
import Button from "../Button";
import axios from "axios";

type Props = {
  commentId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
  accessToken: string;
  setShowDeleteModale: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModale: React.FC<Props> = ({ commentId, setComments, comments, accessToken, setShowDeleteModale }) => {
  const handleDelete = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .delete(process.env.REACT_APP_API_URL + `/deleteComment/${commentId}`, header)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
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
