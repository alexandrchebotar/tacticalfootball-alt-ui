import {
  GET_INIT_DATA
} from '../constants';
import {createAction} from 'redux-actions';

export const getInitData = createAction(GET_INIT_DATA);
// export const startSearchPosition = createAction(START_SEARCH_POSITION, () => ({
//   gmaps: {messages: {loading: 'Встановлення місцезнаходження', alerts: [], errors: []}},
// }));
// export const endSearchPosition = createAction(END_SEARCH_POSITION, ({position, adress, alerts=[], errors=[]}) => ({
//   search: {position, adress},
//   gmaps: {messages: {loading: null}, alerts, errors},
//   places: {activePlaceId: null},
// }));
