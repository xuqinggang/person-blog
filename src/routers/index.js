import React from 'react';
import { Router, Route, Switch } from 'react-router';
import Home from 'pages/Home/Home';

const routers = (history) => {
    return (
        <Router
            history={history}
        >
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default routers;
