import React from "react";
import { Comment } from "../../models";
import SingleComment from "../SingleComment";
import styles from "./CommentList.module.scss";

type Props = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLogged: boolean;
  accessToken: string;
  userId: number;
};

const CommentList: React.FC<Props> = ({ comments, setComments, isLogged, accessToken, userId }) => {
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
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          id={comment.id}
          comments={comments}
          setComments={setComments}
          isLogged={isLogged}
          accessToken={accessToken}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default CommentList;
