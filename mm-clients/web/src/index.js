import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Router } from 'react-router-dom';

var createHistory = require('history').createBrowserHistory;
const history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <Routes />
    </Router>,
    document.getElementById('root')
);

