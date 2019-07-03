import {
  GET_INIT_DATA,
  START_FETCH_PLAYERS,
  END_FETCH_PLAYERS,
  CLEAR_PLAYERS,
  START_SET_TRAINING,
  END_SET_TRAINING,
} from '../common/constants';
import {createAction} from 'redux-actions';
import axios from 'axios';

import playersJSON from './players.json';
import trainingJSON from './training.json';

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
export const startSetTraining = createAction(START_SET_TRAINING, ({trainings}) => ({
  loading: {trainings},
}));
export const endSetTraining = createAction(END_SET_TRAINING, ({trainings, players}) => ({
  currentClub: {players},
  loading: {trainings},
}));


export const getPlayers = () => {
  return (dispatch, getState) => {
    // startFetchAction
    dispatch(startFetchPlayers());

/******* enable after CORS resolve **************/
    // const clubId = getState().currentClub.id;
    // axios.get(`https://tacticalfootball.com/api/clubs/${clubId}?serialiser=ClubPlayers`)
    // .then(res => {
    //   if (res.status !== 200) {
    //     throw new Error(res.statusText);
    //   }
    //   const {players} = res.data;
    //   dispatch(endFetchPlayers({players}));
    // })
    // .catch(err => {
    //   dispatch(endFetchPlayers({players: []}));
    //   console.log('getPlayers error: ' + err);
    // })
/************************************************/

/******* remove after CORS resolve **************/
    const players = playersJSON;

    // endFetch action
    dispatch(endFetchPlayers({players}));
/************************************************/
  };
};

export const getTraining = () => {
  return (dispatch, getState) => {
    // startFetchAction
    dispatch(startFetchPlayers());

/******* enable after CORS resolve **************/
    // const clubId = getState().currentClub.id;
    // axios.get(`https://tacticalfootball.com/api/clubs/${clubId}?serialiser=ClubPlayers`)
    // .then(res => {
    //   if (res.status !== 200) {
    //     throw new Error(res.statusText);
    //   }
    //   const {players} = res.data;
    //   const playersPromises = players.map((id) => {
    //     return axios.get(`https://tacticalfootball.com/api/players/${id}?serialiser=PlayerOverview`);
    //   });
    //   return Promise.all(playersPromises)
      // .then(res => {
      //   if (res.some(({status}) => status !== 200)) {
      //     throw new Error(res.statusText);
      //   }
      //   const playersWithTraining = players.map((player, index) => {
      //     return {...player, skills_age: res[index].data.skills_age, skills_train: res[index].data.skills_train};
      //   });
      //   dispatch(endFetchPlayers({playersWithTraining}));
      // })
    // })
    // .catch(err => {
    //   dispatch(endFetchPlayers({players: []}));
    //   console.log('getPlayers error: ' + err);
    // });
/************************************************/

/******* remove after CORS resolve **************/
    const players = trainingJSON;

    // endFetch action
    dispatch(endFetchPlayers({players}));
/************************************************/
  };
};

export const setTraining = ({playerId, skill, value}) => {
  return (dispatch, getState) => {
    let {trainings} = getState().loading;
    if (trainings.some(({playerId: _playerId, skill: _skill}) => _playerId === playerId && _skill === skill)) {
      return;
    }
    dispatch(startSetTraining({trainings: [...trainings, {playerId, skill}]}));

/******* enable after CORS resolve **************/
    // axios.put(`https://tacticalfootball.com/api/players/${playerId}?data=${value?1:false}&player_action=train&skill=${skill}`, {
    //   // xsrfCookieName: 'XSRF-TOKEN',
    //   // xsrfHeaderName: 'X-XSRF-TOKEN',
    // })
    // .then(res => {
    //   if (res.status !== 200) {
    //     throw new Error(res.statusText);
    //   }
    //   let {players} = getState().currentClub;
    //   let player = players.find(({id}) => id === playerId);
    //   const skills_train = player.skills_train ? player.skills_train : {};
    //   if (res.data.msgs.includes(`Now training ${skill}`)) {
    //     skills_train = {...player.skills_train, [skill]: true};
    //   }
    //   if (res.data.msgs.includes(`No longer training ${skill}`)) {
    //     skills_train = {...player.skills_train, [skill]: false};
    //   }
    //   player = {...player, skills_train};
    //   players = [...players.filter(({id}) => id !== playerId), player];
    //   const trainings = getState().loading.trainings.filter(({playerId: _playerId, skill: _skill}) => !(_playerId === playerId && _skill === skill));
    //   dispatch(endSetTraining({trainings, players}));
    // })
    // .catch(function (err) {
    //   const {currentClub: {players}, loading} = getState();
    //   const trainings = loading.trainings.filter(({playerId: _playerId, skill: _skill}) => !(_playerId === playerId && _skill === skill));
    //   dispatch(endSetTraining({trainings, players}));
    //   console.log(err);
    // });
/************************************************/

/******* remove after CORS resolve **************/
    let {players} = getState().currentClub;
    let player = players.find(({id}) => id === playerId);
    let skills_train = player.skills_train ? player.skills_train : {};
    skills_train = {...skills_train, [skill]: !skills_train[skill]};
    player = {...player, skills_train};
    players = [...players.filter(({id}) => id !== playerId), player];
    trainings = trainings.filter(({playerId: _playerId, skill: _skill}) => !(_playerId === playerId && _skill === skill));
    dispatch(endSetTraining({trainings, players}));
/************************************************/
  };
};
