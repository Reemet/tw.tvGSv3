import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Player from './components/player_index';
import StreamIndex from './components/streams_index';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

export const store = createStore(reducers, enhancer);


ReactDOM.render(
    <Provider store={store}>
        <StreamIndex/>
    </Provider>,
    document.querySelector('#root')
);