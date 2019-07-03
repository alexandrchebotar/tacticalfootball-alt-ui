import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageMenu from './PageMenu';
import Players from '../../pages/Players';
import Training from '../../pages/Training';

import './style.scss';

const Page404 = () => {
  return <div>Sorry, but no pages on this location.</div>;
};

const PageContainer = ({page}) => {
  return (
    <div className="page-container">
      <div className="header">
        <PageMenu className="bp3-dark" page={page} />
      </div>
      <div className="page-content">
        <Switch>
          <Route path='/squad/players' component={Players} exact />
          <Route path='/squad/training' component={Training} exact />
          <Route path='/squad/:activeTabId' component={Page404} exact />
          <Route path='/office/:activeTabId' component={Page404} exact />
          <Route path='/competitions/:competitionsId/:activeTabId' component={Page404} exact />
          <Route path='/clubs/:clubId/:activeTabId' component={Page404} exact />
          <Route path='/players/:playerId/:activeTabId' component={Page404} exact />
          <Route path='/settings/:activeTabId' component={Page404} exact />
          <Route path='/user/:activeTabId' component={Page404} exact />
  
          <Route path='/404' exact component={Page404} />
          <Route path='/' render={() => <Redirect to="/404" />} exact />
          <Redirect from='' to='404'/>
          {/* <Route path='' render={() => <Redirect to="/404" />} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default PageContainer;
