import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import savedReducer from './savedReducer';
import allUsers from './allUsersReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  savedPosts: savedReducer,
  allUsers : allUsers,
  profile: profileReducer
});

export default rootReducer;
