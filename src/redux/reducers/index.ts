import { combineReducers } from 'redux';
import { modalReducer } from './modalReducer';
import { userReducer } from './userReducer';

export const Reducer = combineReducers({
  modalState: modalReducer,
  userState: userReducer,
});
