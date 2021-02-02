import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dapp from './Dapp';
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.render(
    <Provider store={store}>
        <Dapp/>
    </Provider>,
    document.getElementById('root')
);
