import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.css';

const Post = ({ title, body, id }) => (
  <div className={styles.post}>
    <h3>
      <Link to={`/posts/${id}`}>{title}</Link>
      <p>{body}</p>
    </h3>
  </div>
);

export default Post;
