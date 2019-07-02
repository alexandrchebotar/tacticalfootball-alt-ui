import {
  GET_INIT_DATA,
  START_FETCH_PLAYERS,
  END_FETCH_PLAYERS,
  CLEAR_PLAYERS,
} from 'common/constants';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

// default state
const defaultState = { 
  competitions: {
    leagues: {
      premiership: '',
      div1: {
        'div1 A': '',
        'div1 B': '',
      },
      div2: {
        'A - J': {
          'A': '',
          B: '',
          C: '',
          D: '',
          E: '',
          F: '',
          G: '',
          H: '',
          I: '',
          J: '',
        },
        'divisions': {
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
    general: ['#', false, null, '_blank'], 
    national: ['#', true, null, '_blank'],
  },
  user: {
    id: 409,
    name: 'UserName',
    clubs: [
      {name: 'SKIF', id: 225, news: true},
      {name: 'England', id: 102, news: false}, 
      {name: 'Some Affiliate Club with long name', id: 102, news: false}, 
    ],
    messages: true,
  },
  currentClub: {
    id: 788,
    name: 'SKIF',
    players: [],
  },
  loading: {
    players: false,
  },
};

// reducers
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
      END_FETCH_PLAYERS,
      CLEAR_PLAYERS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.currentClub,
    }),
  },
  defaultState.currentClub
);
const loading = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
      START_FETCH_PLAYERS,
      END_FETCH_PLAYERS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.loading,
    }),
  },
  defaultState.loading
);

// creating state
const appState = combineReducers({
  competitions,
  forums,
  user,
  currentClub,
  loading,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appState, 
  applyMiddleware(logger, thunk)
  // composeEnhancers(applyMiddleware(thunk))
);  

export default store;
