import React, { useState } from "react";
import { Comment } from "../../models";
import Button from "../Button";
import styles from "./WritingBox.module.scss";
import axios from "axios";

type Props = {
  avatarUrl: string;
  userId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  accessToken: string;
};

const WritingBox: React.FC<Props> = ({ avatarUrl, userId, setComments, accessToken }) => {
  const [content, setContent] = useState<string>("");

  const fetchComments = () => {
    axios
      .get<Comment[]>(process.env.REACT_APP_API_URL + "/allComments")
      .then((res) => {
        setComments(res.data);
      });
  };

  const handleSubmit = () => {
    if (content.length === 0) {
      return;
    }
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/createComment", {
        content,
        score: 0,
        user_id: userId,
      }, header)
      .then(() => {
        setContent("");
        fetchComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Add a comment..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <img
          className={styles.avatar}
          src={`avatars/${avatarUrl}`}
          alt={"My avatar"}
        />
        <Button
          text="Send"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default WritingBox;
