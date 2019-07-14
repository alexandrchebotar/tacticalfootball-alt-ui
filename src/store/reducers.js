import {
  GET_INIT_DATA,
  START_FETCH_PLAYERS,
  END_FETCH_PLAYERS,
  CLEAR_PLAYERS,
  START_SET_TRAINING,
  END_SET_TRAINING,
  START_SEARCH_PLAYERS,
  END_SEARCH_PLAYERS,
  CLEAR_SEARCH,
  CLEAR_SEARCH_FILTER,
} from 'common/constants';
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';

export const defaultState = { 
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
    sells: [],
    bids: [],
  },
  search: {
    players: [],
    clubs: [],
    filter: {},
  },
  loading: {
    players: false,
    search: false,
    trainings: [],
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
      END_FETCH_PLAYERS,
      CLEAR_PLAYERS,
      START_SET_TRAINING,
      END_SET_TRAINING,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.currentClub,
    }),
  },
  defaultState.currentClub
);
const search = handleActions(
  {
    [combineActions(
      START_SEARCH_PLAYERS,
      END_SEARCH_PLAYERS,
      CLEAR_SEARCH,
      CLEAR_SEARCH_FILTER,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.search,
    }),
  },
  defaultState.search
);
const loading = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
      START_FETCH_PLAYERS,
      END_FETCH_PLAYERS,
      START_SET_TRAINING,
      END_SET_TRAINING,
      START_SEARCH_PLAYERS,
      END_SEARCH_PLAYERS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.loading,
    }),
  },
  defaultState.loading
);

export const appState = combineReducers({
  competitions,
  forums,
  user,
  currentClub,
  search,
  loading,
});
