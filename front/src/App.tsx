import React from "react";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Attribution from "./components/Attribution";
import Spinner from "./components/Spinner";
import { Comment, Token } from "./models";
import CommentList from "./components/CommentList";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Header from "./components/Header";
import SignUpModale from "./components/SignUpModale";
import SignInModale from "./components/SignInModale";

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>("");
  const [showSignInForm, setShowSignInForm] = useState<boolean>(false);
  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);

  const refreshToken = (token: string) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/refreshToken", {
        refreshToken: token
      })
      .then(res => {
        localStorage.setItem('refreshToken', res.data.refreshToken);
        const userId = jwt_decode<Token>(res.data.accessToken).id;
        setUserId(userId);
        setAccessToken(res.data.accessToken);
        setIsLogged(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // at first render, fetch the comments and check refresh token
  useEffect(() => {
    axios
      .get<Comment[]>(process.env.REACT_APP_API_URL + "/allComments")
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      });
    const token = localStorage.getItem("refreshToken");
    if (token) {
      // we check if the token is expired
      // if yes we delete it
      const exp = jwt_decode<Token>(token).exp;
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem("refreshToken");
      } else {
        // if not we dispatch refreshToken action to obtain new accessToken
        refreshToken(token);
      }
    }
  }, []);

  return (
    <div className={styles.app}>
      {showSignUpForm && (
        <SignUpModale
          setShowSignInForm={setShowSignInForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      )}
      {showSignInForm && (
        <SignInModale
          setShowSignInForm={setShowSignInForm}
          setUserId={setUserId}
          setIsLogged={setIsLogged}
          setAccessToken={setAccessToken}
        />
      )}
      <Header
        isLogged={isLogged}
        setShowSignInForm={setShowSignInForm}
        setShowSignUpForm={setShowSignUpForm}
        setIsLogged={setIsLogged}
        setAccessToken={setAccessToken}
        setUserId={setUserId}
      />
      {isLoading && <Spinner size={100} />}
      {!isLoading && (
        <CommentList
          comments={comments}
          setComments={setComments}
          isLogged={isLogged}
          accessToken={accessToken}
          userId={userId}
        />
      )}
      <Attribution />
    </div>
  );
};

export default App;
