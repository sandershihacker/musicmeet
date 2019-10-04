import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Homepage, Dog, Cat, NotFound } from './components';
import { App } from './App';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={App} />
                <Route exact path="/dog" component={Dog} />
                <Route exact path="/cat" component={Cat} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default Routes;