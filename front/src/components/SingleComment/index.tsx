import React from 'react';
import { Comment } from '../../models';
import styles from './SingleComment.module.scss';

type Props = {
  comment: Comment;
}

const SingleComment: React.FC<Props> = ({ comment }) => {
  return (
    <div className={styles.container}>
      <h3>{comment.content}</h3>
    </div>
  );
};

export default SingleComment;
