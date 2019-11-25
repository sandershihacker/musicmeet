import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Signup } from './Components/signup';
import { Login } from './Components/login';
import { PageNotFound } from './Components/404';
import { Profile } from './Components/profile';
import { Logout } from './Components/logout';
import { Welcome } from './Components/welcome'

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/profile" component={Profile} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default Routes;