import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import Welcome from './Welcome';
import App from './App';
// import { init } from './socket';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

// if (location.pathname != '/welcome') {
//     init(store);
// }

let component;

if (location.pathname == "/welcome") {
    component = <Welcome store={ store }/>;
} else {
    component = (
        <Provider store={ store }>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
