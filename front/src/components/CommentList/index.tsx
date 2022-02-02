import React from "react";
import { Comment } from "../../models";
import SingleComment from "../SingleComment";
import styles from "./CommentList.module.scss";

type Props = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const CommentList: React.FC<Props> = ({ comments, setComments }) => {
  return (
    <div className={styles.container}>
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          id={comment.id}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
