import React from "react";
import SingleComment from "../SingleComment";
import styles from "./CommentList.module.scss";
import { useAppState } from "../../utils/context";

const CommentList = () => {

  const { comments } = useAppState();
  let sortedComments = comments.filter((comment) => comment.replying_to === null);
  let replies = comments.filter((comment) => comment.replying_to !== null);
  for (const reply of replies) {
    const parentIndex = sortedComments.findIndex((comment) => comment.id === reply.replying_to);
    if (parentIndex !== -1) {
      sortedComments.splice(parentIndex + 1, 0, reply);
    }
  }

  return (
    <div className={styles.container}>
      {sortedComments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default CommentList;
