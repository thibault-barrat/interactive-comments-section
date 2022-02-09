import React from "react";
import { useEffect } from "react";
import styles from "./App.module.scss";
import Attribution from "./components/Attribution";
import Spinner from "./components/Spinner";
import { Comment, Token } from "./utils/models";
import CommentList from "./components/CommentList";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Header from "./components/Header";
import SignUpModale from "./components/SignUpModale";
import SignInModale from "./components/SignInModale";
import WritingBox from "./components/WritingBox";
import { useAppDispatch, useAppState } from "./utils/context";
import { ACTION_TYPES } from "./store/actions";

const App: React.FC = () => {

  const { loading, isLogged, loginForm: { show : showSignInForm }, signupForm: { show: showSignUpForm} } = useAppState();
  const dispatch = useAppDispatch();

  // configuration of axios interceptor
  // to handle 401 unauthorized error
  // and get new tokens
  // axios.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     if (error.response.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const token = localStorage.getItem("refreshToken");
  //       if (token) {
  //         const exp = jwt_decode<Token>(token).exp;
  //         if (exp * 1000 < Date.now()) {
  //           localStorage.removeItem("refreshToken");
  //           setIsLogged(false);
  //           setAccessToken("");
  //           setUserId(0);
  //           setAvatarUrl("");
  //         } else {
  //           // if not we dispatch refreshToken action to obtain new accessToken
  //           axios
  //             .post(process.env.REACT_APP_API_URL + "/refreshToken", {
  //               refreshToken: token,
  //             })
  //             .then((res) => {
  //               localStorage.setItem("refreshToken", res.data.refreshToken);
  //               const { id, avatarUrl } = jwt_decode<Token>(
  //                 res.data.accessToken
  //               );
  //               setUserId(id);
  //               setAvatarUrl(avatarUrl);
  //               setAccessToken(res.data.accessToken);
  //               setIsLogged(true);
  //               originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
  //               return axios(originalRequest);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         }
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const refreshToken = (token: string) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/refreshToken", {
        refreshToken: token,
      })
      .then((res) => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        const { id, avatarUrl } = jwt_decode<Token>(res.data.accessToken);
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: {
            id,
            avatarUrl,
            accessToken: res.data.accessToken,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // at first render, fetch the comments and check refresh token
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.GET_COMMENTS });
    axios
      .get<Comment[]>(process.env.REACT_APP_API_URL + "/allComments")
      .then((res) => {
        dispatch({ type: ACTION_TYPES.GET_COMMENTS_SUCCESS, payload: res.data });
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

  // we want to disable body scrolling when signin modale or signup is open
  useEffect(() => {
    if (showSignInForm || showSignUpForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showSignInForm, showSignUpForm]);

  return (
    <div className={styles.app}>
      {showSignUpForm && (
        <SignUpModale />
      )}
      {showSignInForm && (
        <SignInModale />
      )}
      <Header />
      {loading && <Spinner size={100} />}
      {!loading && (
        <CommentList />
      )}
      {!loading && isLogged && (
        <WritingBox />
      )}
      <Attribution />
    </div>
  );
};

export default App;
