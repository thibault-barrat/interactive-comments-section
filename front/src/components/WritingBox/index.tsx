import React, { useState, useEffect, useRef } from "react";
import { Comment } from "../../utils/models";
import Button from "../Button";
import styles from "./WritingBox.module.scss";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

type Props = {
  replyTo: number | null;
  replyToAuthor?: string;
  setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
};

const WritingBox: React.FC<Props> = ({ replyTo, setIsReplying, replyToAuthor }) => {
  const [content, setContent] = useState<string>("");
  const { id, accessToken, avatarUrl } = useAppState();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const fetchComments = () => {
    axios
      .get<Comment[]>(process.env.REACT_APP_API_URL + "/allComments")
      .then((res) => {
        dispatch({ type: ACTION_TYPES.GET_COMMENTS_SUCCESS, payload: res.data });
      });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (content.length === 0) {
  //     return;
  //   }
  //   const header = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   try {
  //     await axios
  //     .post(process.env.REACT_APP_API_URL + "/createComment", {
  //       content,
  //       replying_to: replyTo,
  //       score: 0,
  //       user_id: id,
  //     }, header);
  //     setContent("");
  //       setIsReplying && setIsReplying(false);
  //       fetchComments();
  //   }
  //   catch (err) {
  //     console.log('prout');
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        replying_to: replyTo,
        score: 0,
        user_id: id,
      }, header)
      .then(() => {
        setContent("");
        setIsReplying && setIsReplying(false);
        fetchComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if it is a reply, set the content to the author's name
  // and put focus on it
  useEffect(() => {
    if (replyToAuthor) {
      setContent(`@${replyToAuthor} `);
      textareaRef.current && textareaRef.current.focus();
    }
  }, [replyToAuthor]);

  return (
    <div className={`${styles.container} ${replyTo ? styles.reply : ''}`}>
      <form className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Add a comment..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaRef}
        />
        <img
          className={styles.avatar}
          src={`avatars/${avatarUrl}`}
          alt={"My avatar"}
        />
        <Button
          text={replyTo ? "Reply" : "Send"}
          onClick={handleSubmit}
          type="submit"
        />
      </form>
    </div>
  );
};

export default WritingBox;
