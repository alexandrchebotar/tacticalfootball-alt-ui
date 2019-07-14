import {createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import {appState} from './reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appState, 
  applyMiddleware(logger, thunk)
  // composeEnhancers(applyMiddleware(thunk))
);  

export default store;
