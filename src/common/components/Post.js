import React from 'react';
import './Post.css';
import styles from './Post.module.css';

const Post = ({ title, body, id }) => (
  <div className="post">
    <h3 className={styles.post}>{title}</h3>
    <p>{body}</p>
  </div>
);

export default Post;
