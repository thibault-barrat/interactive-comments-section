import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick: (e: React.FormEvent) => void;
  color?: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({ text, onClick, color, type }) => {
  return (
    <button
      className={`${styles.button} ${color ? `${styles[color]}` : ""}`}
      onClick={(e) => onClick(e)}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
