import React from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import { MdOutlineClose } from "react-icons/md";
import styles from "./SignInModale.module.scss";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

const SignInModale = () => {

  const { email, password, loading, emailError, passwordError } = useAppState().loginForm;

  const dispatch = useAppDispatch();

  const handleLoginError = (error: any) => {
    if (error.response.status === 404) {
      dispatch({ type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR, payload: {
        emailError: error.response.data.errorMessage,
        passwordError: ""
      } });
    } else if (error.response.status === 401) {
      dispatch({ type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR, payload: {
        emailError: "",
        passwordError: error.response.data.errorMessage
      } });
    } else {
      console.log(error);
    }
  };

  const postLogin = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: {
            id: res.data.id,
            accessToken: res.data.accessToken,
            avatarUrl: res.data.avatarUrl,
          },
        });
      })
      .catch((err) => {
        handleLoginError(err);
      });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.length === 0) {
      dispatch({
        type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR,
        payload: {
          emailError: "Email is required",
          passwordError: "",
        },
      });
      return;
    }
    if (password.length === 0) {
      dispatch({
        type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR,
        payload: {
          emailError: "",
          passwordError: "Password is required",
        },
      });
      return;
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR,
      payload: {
        emailError: "",
        passwordError: "",
      },
    });
    dispatch({
      type: ACTION_TYPES.LOGIN,
    });
    postLogin();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <MdOutlineClose
          className={styles.close}
          onClick={() => dispatch({ type: ACTION_TYPES.HIDE_LOGIN_FORM })}
        />
        <form className={styles.form}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_LOGIN_FORM_FIELD, payload: {field: "email", value: e.target.value} })}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_LOGIN_FORM_FIELD, payload: {field: "password", value: e.target.value} })}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          {loading ? (
            <Spinner size={58} />
          ) : (
            <Button text="Sign In" onClick={handleSignIn} type="submit" />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInModale;
