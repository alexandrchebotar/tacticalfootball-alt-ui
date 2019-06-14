import {
  GET_INIT_DATA,
} from '../constants';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
import thunk from 'redux-thunk';

const defaultState = { 
  competitions: {
    leagues: {
      premiership: '',
      div1: {
        'div1 A': '',
        'div1 B': '',
      },
      div2: {
        'A - B': {
          'A': '',
          B: '',
        },
        'C - D': {
          'div1 C': '',
          div2: '',
        },
      },
    },
    cups: {
      cup1: '',
      cup2: '',
    },
    national: {},
    current: {},
  },
  forums: {
    general: [0, '', ''], 
    national: [0, '', ''],
  },
  userClubs: {
    SKIF: [0, '', ''],
    England: [0, '', ''],
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
