import React, { useState } from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import { MdOutlineClose } from "react-icons/md";
import styles from "./SignUpModale.module.scss";
import axios from "axios";

type Props = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpModale: React.FC<Props> = ({
  setShowSignInForm,
  setShowSignUpForm,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // function to verify that username is not empty
  const checkUsername = (): boolean => {
    if (username.length === 0) {
      setUsernameError("Username is required");
      return false;
    } else {
      setUsernameError("");
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
      setEmailError("Email is not valid");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // function to verify that the password matches the regex rule
  const checkPassword = (): boolean => {
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(password)
    ) {
      setPasswordError(
        "Password must contains at least 6 characters, one uppercase letter, one number and one special character"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // function to verify that the confirmed password matches the password
  const checkConfirmedPassword = (): boolean => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handlePostError = (error: any): void => {
    if (error.response.status === 406 || error.response.status === 409) {
      if (error.response.data.field === "username") {
        setUsernameError(error.response.data.errorMessage);
      } else if (error.response.data.field === "email") {
        setEmailError(error.response.data.errorMessage);
      } else if (error.response.data.field === "password") {
        setPasswordError(error.response.data.errorMessage);
      } else if (error.response.data.field === "confirmPassword") {
        setConfirmPasswordError(error.response.data.errorMessage);
      }
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
        setIsLoading(false);
        setShowSignUpForm(false);
        setShowSignInForm(true);
      })
      .catch((err) => {
        setIsLoading(false);
        handlePostError(err);
      });
  };

  // function to handle sign up action
  const handleSignUp = () => {
    if (
      checkUsername() &&
      checkEmail() &&
      checkPassword() &&
      checkConfirmedPassword()
    ) {
      setIsLoading(true);
      postUser();
    }
  };

  return (
    <div className={styles.container}>
      <MdOutlineClose
        className={styles.close}
        onClick={() => setShowSignUpForm(false)}
      />
      <form className={styles.form}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkUsername}
        />
        {usernameError && <p className={styles.error}>{usernameError}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkEmail}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={checkPassword}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <label htmlFor="confirm-password">Confirm your password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={checkConfirmedPassword}
        />
        {confirmPasswordError && (
          <p className={styles.error}>{confirmPasswordError}</p>
        )}
        {isLoading ? (
          <Spinner size={58}/>
        ) : (
          <Button text="Sign Up" onClick={handleSignUp} />
        )}
      </form>
    </div>
  );
};

export default SignUpModale;
