import React, { useState, useEffect, useRef } from "react";
import { Comment } from "../../utils/models";
import styles from "./SingleComment.module.scss";
import timeSince from "../../utils/timeSince";
import Score from "../Score";
import DeleteModale from "../DeleteModale";
import Button from "../Button";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";
import WritingBox from "../WritingBox";

type Props = {
  comment: Comment;
};

const SingleComment: React.FC<Props> = ({ comment }) => {
  const { id, accessToken, isLogged } = useAppState();
  const dispatch = useAppDispatch();
  const [showDeleteModale, setShowDeleteModale] = useState<boolean>(false);

  const isReply = comment.replying_to !== null;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // we need to check if content contains words beginning with @
  // is so, we put it in a span with className "mention"
  let content: (string | JSX.Element)[] = [];
  comment.content.split(" ").forEach((word, index) => {
    if (word.startsWith("@")) {
      content.push(
        <span className={styles.mention} key={word + index}>
          {word + " "}
        </span>
      );
    } else if (typeof content[content.length - 1] === "string") {
      content[content.length - 1] += word + " ";
    } else {
      content.push(word + " ");
    }
  });

  // we want to disable body scrolling when modale is open
  useEffect(() => {
    if (showDeleteModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDeleteModale]);

  // put focus on text area when we edit a comment
  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  // resize textarea when content changes
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editContent, isEditing]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .patch(
        process.env.REACT_APP_API_URL + `/updateComment/${comment.id}`,
        {
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsEditing(false);
        dispatch({
          type: ACTION_TYPES.UPDATE_COMMENT,
          payload: {
            id: comment.id,
            content: editContent,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className={`${styles.container} ${
          isReply ? styles.reply : styles.parent
        }`}
      >
        {showDeleteModale && (
          <DeleteModale
            id={comment.id}
            setShowDeleteModale={setShowDeleteModale}
          />
        )}
        <div className={styles.heading}>
          <img
            className={styles.avatar}
            src={`avatars/${comment.user.avatar_url}`}
            alt={`${comment.user.username}'s avatar`}
          />
          <p className={styles.username}>{comment.user.username}</p>
          {isLogged && comment.user.id === id && (
            <span className={styles.youTag}>you</span>
          )}
          <p className={styles.date}>{`${timeSince(
            new Date(comment.created_at)
          )} ago`}</p>
        </div>
        <form className={styles.content}>
          {isEditing ? (
            <>
              <textarea
                className={styles.editContent}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                ref={textareaRef}
              />
              <Button text="Update" onClick={handleUpdate} type="submit" />
            </>
          ) : (
            <p className={styles.contentText}>{content}</p>
          )}
        </form>
        <Score score={comment.score} id={comment.id} />
        {isLogged && id !== comment.user.id && (
          <button
            className={`${styles.button} ${styles.replyButton}`}
            type="button"
            onClick={() => setIsReplying(true)}
          >
            <svg
              width="14"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              role="img"
              aria-labelledby="reply-icon"
            >
              <title id="reply-icon">Reply</title>
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="#5357B6"
              />
            </svg>
            Reply
          </button>
        )}
        {isLogged && id === comment.user.id && (
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              type="button"
              onClick={() => {
                setShowDeleteModale(true);
              }}
            >
              <svg
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                role="img"
                aria-labelledby="delete-icon"
              >
                <title id="delete-icon">Delete</title>
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="#ED6368"
                />
              </svg>
              Delete
            </button>
            <button
              className={`${styles.button} ${styles.editButton}`}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              <svg
                width="14"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                role="img"
                aria-labelledby="edit-icon"
              >
                <title id="edit-icon">Edit</title>
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="#5357B6"
                />
              </svg>
              Edit
            </button>
          </div>
        )}
      </div>
      {isReplying && (
        <div className={`${isReply ? styles.reply : styles.parent}`}>
          <WritingBox
            replyTo={comment.id}
            setIsReplying={setIsReplying}
            replyToAuthor={comment.user.username}
          />
        </div>
      )}
    </>
  );
};

export default SingleComment;
