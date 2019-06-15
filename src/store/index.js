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
    national: {
      WC: '',
      WL: '',
    },
    current: {
      'Super League': '',
      'IC group X': '',
      IC: '',
    },
  },
  forums: {
    general: [0, '', ''], 
    national: [0, '', ''],
  },
  user: {
    id: 409,
    name: 'ArmagedOFF',
    clubs: {
      SKIF: [0, '', ''],
      England: [0, '', ''],
    },
  },
  currentClub: {
    id: 788,
    name: 'SKIF'
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
const user = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.user,
    }),
  },
  defaultState.user
);
const currentClub = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.currentClub,
    }),
  },
  defaultState.currentClub
);


const appState = combineReducers({
  competitions,
  forums,
  user,
  currentClub,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appState, 
  composeEnhancers(applyMiddleware(thunk))
);    

export default store;
