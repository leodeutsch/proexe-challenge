import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

const Reducer = combineReducers({
  modalState: modalReducer,
  userState: userReducer,
});

export default Reducer;
