import { combineReducers } from 'redux';
import editor from './components/editor/reducers';

const rootReducer = combineReducers({
  editor,
});

export default rootReducer;
