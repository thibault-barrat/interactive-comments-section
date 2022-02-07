import React from "react";
import Button from "../Button";
import styles from "./Header.module.scss";
import axios from "axios";

type Props = {
  isLogged: boolean;
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
};

const Header: React.FC<Props> = ({ isLogged, setShowSignInForm, setShowSignUpForm, setIsLogged, setAccessToken, setUserId }) => {
  const handleSignOut = () => {
    axios.post(process.env.REACT_APP_API_URL + "/logout", {
      refreshToken: localStorage.getItem("refreshToken")
    });
    localStorage.removeItem("refreshToken");
    setIsLogged(false);
    setAccessToken("");
    setUserId(0);
  };

  return (
    <div className={styles.header}>
      {isLogged ? (
        <Button text="Sign Out" onClick={handleSignOut} />
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
