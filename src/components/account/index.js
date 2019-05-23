import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../404/404';
import SignIn from './sign_in';
import SignUp from './sign-up/sign_up';
import SignOut from './sign-out';

const AccountRoutes = props => {
    const {match} = props;

    return (
        <Switch className="container">
            <Route path={`${match.path}/sign-in`} component={SignIn}/>
            <Route path={`${match.path}/sign-out`} component={SignOut}/>
            <Route path={`${match.path}/sign-up`} component={SignUp}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default AccountRoutes;
