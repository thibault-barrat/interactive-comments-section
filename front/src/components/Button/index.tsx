import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
