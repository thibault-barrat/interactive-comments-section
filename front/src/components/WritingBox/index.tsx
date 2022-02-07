import React from "react";
import { Comment } from "../../models";
import Button from "../Button";
import styles from "./WritingBox.module.scss";

type Props = {
  avatarUrl: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const WritingBox: React.FC<Props> = ({ avatarUrl, setComments }) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Add a comment..."
          rows={3}
        />
        <img
          className={styles.avatar}
          src={`avatars/${avatarUrl}`}
          alt={"My avatar"}
        />
        <Button
          text="Send"
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default WritingBox;
