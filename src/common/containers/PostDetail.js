import React, { PureComponent, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Post from '../components/Post';
import { getPostById, actions } from '../reducers/views/detail';
import { actions as postActions } from '../reducers/entities/posts';
import styles from './PostDetail.module.css';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    const { setDetailPostId, match } = props;
    setDetailPostId(match.params.postId);
  }

  componentDidMount() {
    const { match, fetchPostIfNeeded } = this.props;
    fetchPostIfNeeded(match.params.postId);
    console.log(styles);
    import('./PostDetail.module.css').then(module =>
      console.log('dynamic', module)
    );
  }

  render() {
    const { post, error, isLoading } = this.props;

    if (isLoading) {
      return 'loading...';
    }

    if (error) {
      return 'ERROR';
    }

    return (
      <div className={styles.detail}>
        {post && (
          <Fragment>
            <Helmet>
              <title>{post.title}</title>
              <meta name="description" content={post.body} />
            </Helmet>
            <Post {...post} />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: getPostById(state),
  ...state.views.detail
});

export default connect(mapStateToProps, { ...actions, ...postActions })(Detail);
