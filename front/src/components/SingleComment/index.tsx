import React, { useState, useEffect } from "react";
import { Comment } from "../../models";
import styles from "./SingleComment.module.scss";
import timeSince from "../../utils/timeSince";
import Score from "../Score";
import DeleteModale from "../DeleteModale";

type Props = {
  comments: Comment[];
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLogged: boolean;
  accessToken: string;
  userId: number;
};

const SingleComment: React.FC<Props> = ({
  comments,
  id,
  setComments,
  isLogged,
  accessToken,
  userId,
}) => {
  const [showDeleteModale, setShowDeleteModale] = useState<boolean>(false);
  const comment = comments.find((comment) => comment.id === id)!;
  const isReply = comment.replying_to !== null;

  // we want to disable body scrolling when modale is open
  useEffect(() => {
    if (showDeleteModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [showDeleteModale]);

  return (
    <div
      className={`${styles.container} ${
        isReply ? styles.reply : styles.parent
      }`}
    >
      {showDeleteModale && (
        <DeleteModale
          commentId={id}
          setComments={setComments}
          comments={comments}
          accessToken={accessToken}
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
        {isLogged && comment.user.id === userId && (
          <span className={styles.youTag}>you</span>
        )}
        <p className={styles.date}>{`${timeSince(
          new Date(comment.created_at)
        )} ago`}</p>
      </div>
      <p className={styles.content}>
        {isReply && (
          <span className={styles.answerTo}>{`@${
            comments.find((c) => c.id === comment.replying_to)?.user.username
          } `}</span>
        )}
        {comment.content}
      </p>
      <Score comments={comments} id={comment.id} setComments={setComments} />
      {isLogged && userId !== comment.user.id && (
        <button
          className={`${styles.button} ${styles.replyButton}`}
          type="button"
          onClick={() => {}}
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
      {isLogged && userId === comment.user.id && (
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            type="button"
            onClick={() => {setShowDeleteModale(true)}}
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
            onClick={() => {}}
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
  );
};

export default SingleComment;
