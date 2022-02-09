import React from "react";
import styles from "./Score.module.scss";
import { Score as ScoreObject } from "../../utils/models";
import axios from "axios";
import { useAppDispatch } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

type Props = {
  score: number;
  id: number;
};

const Score: React.FC<Props> = ({ score, id }) => {
  const dispatch = useAppDispatch();
  const handleIncreaseScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get<ScoreObject>(
        `${process.env.REACT_APP_API_URL}/increaseCommentScore/${id}`
      )
      .then((res) => {
        dispatch({ type: ACTION_TYPES.UPDATE_SCORE, payload: {id, score: res.data.score} });
      });
  };

  const handleDecreaseScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get<ScoreObject>(
        `${process.env.REACT_APP_API_URL}/decreaseCommentScore/${id}`
      )
      .then((res) => {
        dispatch({ type: ACTION_TYPES.UPDATE_SCORE, payload: {id, score: res.data.score} });
      });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={handleIncreaseScore}
      >
        <svg
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          aria-labelledby="plus-button"
        >
          <title id="plus-button">Plus</title>
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
      {score}
      <button
        className={styles.button}
        type="button"
        onClick={handleDecreaseScore}
      >
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" className={styles.icon} aria-labelledby="minus-button">
          <title id="minus-button">Minus</title>
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
    </div>
  );
};

export default Score;
