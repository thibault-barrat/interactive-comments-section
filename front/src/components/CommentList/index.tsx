import React from "react";
import { Comment } from "../../models";
import SingleComment from "../SingleComment";
import styles from "./CommentList.module.scss";

type Props = {
  comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div className={styles.container}>
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default CommentList;
