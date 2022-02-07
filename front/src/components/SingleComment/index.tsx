import React from "react";
import { Comment } from "../../models";
import styles from "./SingleComment.module.scss";
import timeSince from "../../utils/timeSince";
import Score from "../Score";

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
  const comment = comments.find((comment) => comment.id === id)!;
  const isReply = comment.replying_to !== null;
  return (
    <div
      className={`${styles.container} ${
        isReply ? styles.reply : styles.parent
      }`}
    >
      <div className={styles.heading}>
        <img
          className={styles.avatar}
          src={`avatars/${comment.user.avatar_url}`}
          alt={`${comment.user.username}'s avatar`}
        />
        <p className={styles.username}>{comment.user.username}</p>
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
      {isLogged && (
        <button className={styles.replyButton} type="button" onClick={() => {}}>
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" className={styles.icon} role="img" aria-labelledby="reply-icon">
            <title id="reply-icon">Reply</title>
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          Reply
        </button>
      )}
    </div>
  );
};

export default SingleComment;
