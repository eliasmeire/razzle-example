import { combineReducers } from 'redux';
import detailReducer from './detail';
import overviewReducer from './overview';

export default combineReducers({
  detail: detailReducer,
  overview: overviewReducer
});
