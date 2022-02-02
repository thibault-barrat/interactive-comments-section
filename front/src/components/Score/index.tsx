import React from "react";
import minus from "../../images/icon-minus.svg";
import plus from "../../images/icon-plus.svg";
import styles from "./Score.module.scss";
import { Comment, Score as ScoreObject } from "../../models";
import axios from "axios";

type Props = {
  comments: Comment[];
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const Score: React.FC<Props> = ({ comments, id, setComments }) => {
  const score = comments.find((comment) => comment.id === id)!.score;
  const handleIncreaseScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get<ScoreObject>(
        `${process.env.REACT_APP_API_URL}/increaseCommentScore/${id}`
      )
      .then((res) => {
        const newComments = comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, score: res.data.score };
          }
          return comment;
        });
        setComments(newComments);   
      });
  };

  const handleDecreaseScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get<ScoreObject>(
        `${process.env.REACT_APP_API_URL}/decreaseCommentScore/${id}`
      )
      .then((res) => {
        const newComments = comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, score: res.data.score };
          }
          return comment;
        });
        setComments(newComments);   
      });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={handleIncreaseScore}
      >
        <img src={plus} alt="Increase score" className={styles.icon} />
      </button>
      {score}
      <button
        className={styles.button}
        type="button"
        onClick={handleDecreaseScore}
      >
        <img src={minus} alt="Decrease score" className={styles.icon} />
      </button>
    </div>
  );
};

export default Score;
