import React from 'react';
import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Attribution from './components/Attribution';
import Spinner from './components/Spinner';
import { Comment } from './models';
import CommentList from './components/CommentList';
import axios from 'axios';

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
     {isLoading && <Spinner size={100} />}
     {!isLoading && <CommentList comments={comments} setComments={setComments} />}
     <Attribution />
    </div>
  );
}

export default App;
