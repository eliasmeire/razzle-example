import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { getPostsByIds } from '../reducers/views/overview';
import { actions } from '../reducers/entities/posts';
import './Home.css';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }

  render() {
    const { posts, error, isLoading } = this.props;

    if (Object.keys(posts).length === 0 && isLoading) {
      return null;
    }

    if (error) {
      return 'ERROR';
    }

    return (
      <div className="home">
        <img src={logo} alt={'Logo'} />
        {error && <div>{JSON.stringify(error)}</div>}
        <div className="posts">
          {posts &&
            posts.map(post => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: getPostsByIds(state),
  ...state.views.overview
});

export default connect(mapStateToProps, actions)(Home);
