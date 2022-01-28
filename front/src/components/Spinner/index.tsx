import React from "react";
import styles from "./Spinner.module.scss";

type Props = {
  size: number;
};

const Spinner: React.FC<Props> = ({ size }) => {
  return (
    <div className={styles.container}>
      <span
        className={styles.spinner}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <span
          className={styles.ball}
          style={{
            width: `${size / 7}px`,
            height: `${size / 7}px`,
            top: `${size / 2 - size / 14}px`,
          }}
        />
        <span
          className={styles.circle}
          style={{
            width: `${size - (size * 2) / 7}px`,
            height: `${size - (size * 2) / 7}px`,
            borderWidth: `${size / 7}px`,
          }}
        />
      </span>
    </div>
  );
};

export default Spinner;
