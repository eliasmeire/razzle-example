import { handle } from 'redux-pack';
import { createSelector } from 'reselect';
import { types as postTypes, getPosts } from '../entities/posts';

export const types = {
  SET_DETAIL_POST_ID: 'SET_DETAIL_POST_ID'
};

export const initialState = {
  isLoading: false,
  error: null,
  postId: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_DETAIL_POST_ID:
      return { ...state, postId: action.postId };
    case postTypes.FETCH_POST:
      return handle(state, action, {
        start: prevState => ({ ...prevState, error: null, isLoading: true }),
        success: prevState => ({ ...prevState, postId: payload.id }),
        failure: prevState => ({ ...prevState, error: payload }),
        finish: prevState => ({ ...prevState, isLoading: false })
      });
    default:
      return state;
  }
};

export const actions = {
  setDetailPostId: postId => ({ type: types.SET_DETAIL_POST_ID, postId })
};

export const getPostId = state => state.views.detail.postId;
export const getPostById = createSelector(
  [getPosts, getPostId],
  (posts, postId) => posts[postId]
);
