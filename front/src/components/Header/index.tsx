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
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<Props> = ({ isLogged, setShowSignInForm, setShowSignUpForm, setIsLogged, setAccessToken, setUserId, setAvatarUrl }) => {
  const handleSignOut = () => {
    axios.post(process.env.REACT_APP_API_URL + "/logout", {
      refreshToken: localStorage.getItem("refreshToken")
    });
    localStorage.removeItem("refreshToken");
    setIsLogged(false);
    setAccessToken("");
    setUserId(0);
    setAvatarUrl("");
  };

  return (
    <div className={styles.header}>
      {isLogged ? (
        <Button text="Sign Out" onClick={handleSignOut} type="button" />
      ) : (
        <>
          <Button text="Sign In" onClick={() => setShowSignInForm(true)} type="button" />
          <Button text="Sign Up" onClick={() => setShowSignUpForm(true)} type="button" />
        </>
      )}
    </div>
  );
};

export default Header;
