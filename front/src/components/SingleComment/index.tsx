import React from 'react';
import { Comment } from '../../models';
import styles from './SingleComment.module.scss';
import timeSince from '../../utils/timeSince';
import Score from '../Score';
import reply from '../../images/icon-reply.svg';

type Props = {
  comments: Comment[];
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLogged: boolean;
  accessToken: string;
  userId: number;
}

const SingleComment: React.FC<Props> = ({ comments, id, setComments, isLogged, accessToken, userId }) => {
  const comment = comments.find(comment => comment.id === id)!;
  const isReply = comment.replying_to !== null;
  return (
    <div className={`${styles.container} ${isReply ? styles.reply : styles.parent}`}>
      <div className={styles.heading}>
        <img className={styles.avatar} src={`avatars/${comment.user.avatar_url}`} alt={`${comment.user.username}'s avatar`} />
        <p className={styles.username}>{comment.user.username}</p>
        <p className={styles.date}>{`${timeSince(new Date(comment.created_at))} ago`}</p>
      </div>
      <p className={styles.content}>
        {isReply && <span className={styles.answerTo}>{`@${comments.find(c => c.id === comment.replying_to)?.user.username} `}</span>}
        {comment.content}
      </p>
      <Score comments={comments} id={comment.id} setComments={setComments} />
      {isLogged && 
        <button
          className={styles.replyButton}
          type="button"
          onClick={() => {}}
        >
          <img src={reply} alt="Reply" className={styles.icon} />
          Reply
        </button>}
    </div>
  );
};

export default SingleComment;
