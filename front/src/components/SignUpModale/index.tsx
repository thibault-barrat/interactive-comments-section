import React, { useState } from "react";
import Button from "../Button";
import { MdOutlineClose } from 'react-icons/md';
import styles from "./SignUpModale.module.scss";

type Props = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpModale: React.FC<Props> = ({ setShowSignInForm, setShowSignUpForm }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  // function to verify that the email matches the regex rule
  const checkEmail = (event: React.FormEvent<HTMLInputElement>) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.currentTarget.value)) {
      setEmailError('Email is not valid');
    }
    else setEmailError('');
  };

  // function to verify that the password matches the regex rule
  const checkPassword = (event: React.FormEvent<HTMLInputElement>) => {
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(event.currentTarget.value)) {
      setPasswordError('Password must contains at least 6 characters, one uppercase letter, one number and one special character');
    }
    else setPasswordError('');
  };

  // function to verify that the confirmed password matches the password
  const checkConfirmedPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    }
    else setConfirmPasswordError('');
  };

  // function to handle sign up action
  const handleSignUp = () => {
    if (usernameError || emailError || passwordError || confirmPasswordError) {
      return;
    }
    else {
      console.log('sign up');
    }
  };

  return (
    <div className={styles.container}>
      <MdOutlineClose className={styles.close} onClick={() => setShowSignUpForm(false)} />
      <form className={styles.form}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {confirmPasswordError && <p className={styles.error}>{confirmPasswordError}</p>}
        <Button
          text="Sign Up"
          onClick={handleSignUp}
        />
      </form>
    </div>
  );
};

export default SignUpModale;
