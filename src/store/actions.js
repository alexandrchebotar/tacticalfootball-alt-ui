import {
  GET_INIT_DATA,
  START_FETCH_PLAYERS,
  END_FETCH_PLAYERS,
  CLEAR_PLAYERS,
} from '../common/constants';
import {createAction} from 'redux-actions';
// import axios from 'axios';

import playersResponse from './playersResponse.json';

export const getInitData = createAction(GET_INIT_DATA);
export const startFetchPlayers = createAction(START_FETCH_PLAYERS, () => ({
  loading: {players: true},
}));
export const endFetchPlayers = createAction(END_FETCH_PLAYERS, ({players = []}) => ({
  currentClub: {players},
  loading: {players: false},
}));
export const clearPlayers = createAction(CLEAR_PLAYERS, () => ({
  currentClub: {players: []},
}));

export const getPlayers = ({clubId}) => {

  return (dispatch) => {
    // startFetchAction
    dispatch(startFetchPlayers());

/******* enable after CORS resolve **************/
    // axios.get(`https://tacticalfootball.com/api/clubs/${clubId}?serialiser=ClubPlayers`)
    // .then(function (response) {
    //   const players = response.players;
    //   dispatch(endFetchPlayers({players}));
    // })
    // .catch(function (error) {
    //   dispatch(endFetchPlayers({players: []}));
    //   console.log('getPlayers errot: ' + error);
    // })
/************************************************/

/******* remove after CORS resolve **************/
    const players = playersResponse.players;

    // endFetch action
    dispatch(endFetchPlayers({players}));
/************************************************/
  };
};
