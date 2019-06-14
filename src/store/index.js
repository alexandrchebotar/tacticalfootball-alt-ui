import {
  GET_INIT_DATA,
} from '../constants';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
import thunk from 'redux-thunk';

const defaultState = { 
  competitions: {
    leagues: {},
    cups: {},
    national: {},
    current: {},
  },
  forums: {
    general: {}, 
    national: {},
  },
  userClubs: {
    SKIF: {},
    England: {},
  },
};

const forums = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.forums,
    }),
  },
  defaultState.forums
);
const userClubs = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.userClubs,
    }),
  },
  defaultState.userClubs
);
const competitions = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.competitions,
    }),
  },
  defaultState.competitions
);

const appState = combineReducers({
  competitions,
  forums,
  userClubs,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appState, 
  composeEnhancers(applyMiddleware(thunk))
);    

export default store;
