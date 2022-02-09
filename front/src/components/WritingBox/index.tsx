import React from "react";
import { Comment } from "../../utils/models";
import Button from "../Button";
import styles from "./WritingBox.module.scss";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

const WritingBox = () => {
  
  const { id, accessToken, avatarUrl, newCommentContent } = useAppState();
  const dispatch = useAppDispatch();
  const fetchComments = () => {
    axios
      .get<Comment[]>(process.env.REACT_APP_API_URL + "/allComments")
      .then((res) => {
        dispatch({ type: ACTION_TYPES.GET_COMMENTS_SUCCESS, payload: res.data });
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentContent.length === 0) {
      return;
    }
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/createComment", {
        content: newCommentContent,
        score: 0,
        user_id: id,
      }, header)
      .then(() => {
        dispatch({ type: ACTION_TYPES.CHANGE_NEW_COMMENT_CONTENT, payload: ""})
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
          value={newCommentContent}
          onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_NEW_COMMENT_CONTENT, payload: e.target.value })}
        />
        <img
          className={styles.avatar}
          src={`avatars/${avatarUrl}`}
          alt={"My avatar"}
        />
        <Button
          text="Send"
          onClick={handleSubmit}
          type="submit"
        />
      </form>
    </div>
  );
};

export default WritingBox;
