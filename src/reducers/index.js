import { combineReducers } from 'redux';
import { default as stopsReducer } from './stopsReducer';

export const rootReducer = combineReducers({
	stops: stopsReducer,
});
