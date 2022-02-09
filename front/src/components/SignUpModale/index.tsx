import React from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import { MdOutlineClose } from "react-icons/md";
import styles from "./SignUpModale.module.scss";
import axios from "axios";
import { useAppDispatch, useAppState } from "../../utils/context";
import { ACTION_TYPES } from "../../store/actions";

const SignUpModale = () => {
  const {
    username,
    email,
    password,
    confirmPassword,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    loading,
  } = useAppState().signupForm;

  const dispatch = useAppDispatch();

  // function to verify that username is not empty
  const checkUsername = (): boolean => {
    if (username.length === 0) {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "usernameError",
          error: "Username is required",
        },
      });
      return false;
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "usernameError",
          error: "",
        },
      });
      return true;
    }
  };

  // function to verify that the email matches the regex rule
  const checkEmail = (): boolean => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "emailError",
          error: "Email is invalid",
        },
      });
      return false;
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "emailError",
          error: "",
        },
      });
      return true;
    }
  };

  // function to verify that the password matches the regex rule
  const checkPassword = (): boolean => {
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(password)
    ) {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "passwordError",
          error:
            "Password must contains at least 6 characters, one uppercase letter, one number and one special character",
        },
      });
      return false;
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "passwordError",
          error: "",
        },
      });
      return true;
    }
  };

  // function to verify that the confirmed password matches the password
  const checkConfirmedPassword = (): boolean => {
    if (password !== confirmPassword) {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "confirmPasswordError",
          error: "Passwords do not match",
        },
      });
      return false;
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "confirmPasswordError",
          error: "",
        },
      });
      return true;
    }
  };

  const handlePostError = (error: any): void => {
    if (error.response.status === 406 || error.response.status === 409) {
      if (error.response.data.field === "username") {
        dispatch({
          type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
          payload: {
            field: "usernameError",
            error: error.response.data.errorMessage,
          },
        });
      } else if (error.response.data.field === "email") {
        dispatch({
          type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
          payload: {
            field: "emailError",
            error: error.response.data.errorMessage,
          },
        });
      }
    } else if (error.response.data.field === "password") {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "passwordError",
          error: error.response.data.errorMessage,
        },
      });
    } else if (error.response.data.field === "confirmPassword") {
      dispatch({
        type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR,
        payload: {
          field: "confirmPasswordError",
          error: error.response.data.errorMessage,
        },
      });
    } else {
      console.log(error);
    }
  };

  const postUser = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/register", {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.SIGNUP_SUCCESS,
        });
      })
      .catch((err) => {
        handlePostError(err);
      });
  };

  // function to handle sign up action
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      checkUsername() &&
      checkEmail() &&
      checkPassword() &&
      checkConfirmedPassword()
    ) {
      dispatch({
        type: ACTION_TYPES.SIGNUP,
      });
      postUser();
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <MdOutlineClose
          className={styles.close}
          onClick={() => dispatch({ type: ACTION_TYPES.HIDE_SIGNUP_FORM })}
        />
        <form className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD, payload: { field: "username", value: e.target.value } })}
            onBlur={checkUsername}
          />
          {usernameError && <p className={styles.error}>{usernameError}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD, payload: { field: "email", value: e.target.value } })}
            onBlur={checkEmail}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD, payload: { field: "password", value: e.target.value } })}
            onBlur={checkPassword}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <label htmlFor="confirm-password">Confirm your password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => dispatch({ type: ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD, payload: { field: "confirmPassword", value: e.target.value } })}
            onBlur={checkConfirmedPassword}
          />
          {confirmPasswordError && (
            <p className={styles.error}>{confirmPasswordError}</p>
          )}
          {loading ? (
            <Spinner size={58} />
          ) : (
            <Button text="Sign Up" onClick={handleSignUp} type="submit" />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpModale;
