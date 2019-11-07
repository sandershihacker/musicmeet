import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Signup } from './Components/signup-component';
import { Login } from './Components/login-component';
import { PageNotFound } from './Components/404-component';
import { Profile } from './Components/profile-component';
import { Logout } from './Components/logout-component';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Profile} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/logout" component={Logout} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default Routes;