import React from 'react';
import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Attribution from './components/Attribution';
import Spinner from './components/Spinner';
import { Comment } from './models';
import CommentList from './components/CommentList';
import axios from 'axios';
import Header from './components/Header';
import SignUpModale from './components/SignUpModale';

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>('');
  const [showSignInForm, setShowSignInForm] = useState<boolean>(false);
  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);

  // at first render, fetch the comments
  useEffect(() => {
    axios.get<Comment[]>(process.env.REACT_APP_API_URL + '/allComments')
      .then(res => {
        setComments(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.app}>
      {showSignUpForm && (
        <SignUpModale
          setShowSignInForm={setShowSignInForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      )}
      <Header
        isLogged={isLogged}
        setShowSignInForm={setShowSignInForm}
        setShowSignUpForm={setShowSignUpForm}
      />
     {isLoading && <Spinner size={100} />}
     {!isLoading && <CommentList comments={comments} setComments={setComments} />}
     <Attribution />
    </div>
  );
}

export default App;
