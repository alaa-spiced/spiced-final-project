import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import Welcome from './Welcome';
// import App from './App';
import { init } from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

init(store);


let component = (
    <Provider store={ store }>
        <Welcome />
    </Provider>
);

// else {
//     component = (
//         <Provider store={ store }>
//             <App />
//         </Provider>
//     );
// }

ReactDOM.render(
    component,
    document.querySelector('main')
);
