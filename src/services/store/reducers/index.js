import { combineReducers } from 'redux';
import { passwordManager } from './passwordManager';

const allReducers = combineReducers({
  passwordManager,
});

export default allReducers;