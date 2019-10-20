import {
  GET_INIT_DATA,
  START_FETCH_PLAYERS,
  END_FETCH_PLAYERS,
  CLEAR_PLAYERS,
  START_FETCH_TRANSFERS,
  END_FETCH_TRANSFERS,
  CLEAR_TRANSFERS,
  START_SET_TRAINING,
  END_SET_TRAINING,
  START_SEARCH_PLAYERS,
  END_SEARCH_PLAYERS,
  CLEAR_SEARCH,
  CLEAR_SEARCH_FILTER,
  MARK_NEWS,
} from 'common/constants';
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
import defaultState from './defaultState';

const menu = handleActions(
  {
    [combineActions(
      GET_INIT_DATA,
    )]: (state, action) => action.payload.menu,
  },
  defaultState.menu
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
      END_FETCH_TRANSFERS,
      CLEAR_TRANSFERS,
      START_SET_TRAINING,
      END_SET_TRAINING,
      MARK_NEWS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.currentClub,
    }),
    // [MARK_NEWS_OPENED]: (state, action) => {
    //   const openedNewsId = action.payload;
    //   const {msgs, total} = state.news;
    //   return ({
    //     ...state,
    //     news: {
    //       msgs: msgs.map(msg => {
    //         const {id} = msg;
    //         return (id === openedNewsId) ?
    //           {...msg, opened: true} :
    //           msg;
    //       }),
    //       total:27,
    //     },
    //   });
    // },
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
      START_FETCH_TRANSFERS,
      END_FETCH_TRANSFERS,
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
  menu,
  user,
  currentClub,
  search,
  loading,
});
