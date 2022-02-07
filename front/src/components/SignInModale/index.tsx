import React, { useState } from 'react';
import Button from "../Button";
import Spinner from "../Spinner";
import { MdOutlineClose } from "react-icons/md";
import styles from './SignInModale.module.scss';
import axios from 'axios';

type Props = {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
};

const SignInModale: React.FC<Props> = ({ setShowSignInForm, setUserId, setIsLogged, setAccessToken, setAvatarUrl }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginError = (error: any) => {
    if (error.response.status === 404) {
      setEmailError(error.response.data.errorMessage);
      setPasswordError("");
    } else if (error.response.status === 401) {
      setEmailError("");
      setPasswordError(error.response.data.errorMessage);
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
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setUserId(res.data.id);
        setAccessToken(res.data.accessToken);
        setAvatarUrl(res.data.avatarUrl);
        setIsLogged(true);
        setIsLoading(false);
        setShowSignInForm(false);
      })
      .catch((err) => {
        setIsLoading(false);
        handleLoginError(err);
      });
  };

  const handleSignIn = () => {
    if (email.length === 0) {
      setEmailError("Email is required");
      return;
    }
    if (password.length === 0) {
      setPasswordError("Password is required");
      return;
    }
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);
    postLogin();
  };

  return (
    <div className={styles.container}>
      <MdOutlineClose
        className={styles.close}
        onClick={() => setShowSignInForm(false)}
      />
      <form className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        {isLoading ? (
          <Spinner size={58}/>
        ) : (
          <Button text="Sign In" onClick={handleSignIn} />
        )}
      </form>
    </div>
  );
};

export default SignInModale;
