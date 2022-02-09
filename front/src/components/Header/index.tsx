import React from "react";
import { useAppDispatch, useAppState } from "../../utils/context";
import Button from "../Button";
import styles from "./Header.module.scss";
import axios from "axios";
import { ACTION_TYPES } from "../../store/actions";

const Header = () => {
  const { isLogged } = useAppState();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    axios.post(process.env.REACT_APP_API_URL + "/logout", {
      refreshToken: localStorage.getItem("refreshToken")
    });
    localStorage.removeItem("refreshToken");
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  return (
    <div className={styles.header}>
      {isLogged ? (
        <Button text="Sign Out" onClick={handleSignOut} type="button" />
      ) : (
        <>
          <Button text="Sign In" onClick={() => dispatch({type: ACTION_TYPES.SHOW_LOGIN_FORM})} type="button" />
          <Button text="Sign Up" onClick={() => dispatch({type: ACTION_TYPES.SHOW_SIGNUP_FORM})} type="button" />
        </>
      )}
    </div>
  );
};

export default Header;
