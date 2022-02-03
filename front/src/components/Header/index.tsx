import React from "react";
import Button from "../Button";
import styles from "./Header.module.scss";

type Props = {
  isLogged: boolean;
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ isLogged, setShowSignInForm, setShowSignUpForm }) => {
  return (
    <div className={styles.header}>
      {isLogged ? (
        <Button text="Sign Out" onClick={() => console.log("sign out")} />
      ) : (
        <>
          <Button text="Sign In" onClick={() => setShowSignInForm(true)} />
          <Button text="Sign Up" onClick={() => setShowSignUpForm(true)} />
        </>
      )}
    </div>
  );
};

export default Header;
