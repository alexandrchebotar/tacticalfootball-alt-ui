import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageMenu from './PageMenu';
import Squad from '../../pages/Squad';

import './style.scss';

const PageContainer = ({page}) => {
  return (
    <div className="page-container">
      <div className="header">
        <PageMenu className="bp3-dark" page={page} />
      </div>
      <div className="page-content">
        <Switch>
          <Route path='/squad/:activeTabId' component={Squad} exact />
          <Route path='/office/:activeTabId' component={Squad} exact />
          <Route path='/competitions/:competitionsId/:activeTabId' component={Squad} exact />
          <Route path='/clubs/:clubId/:activeTabId' component={Squad} exact />
          <Route path='/players/:playerId/:activeTabId' component={Squad} exact />
          <Route path='/settings/:activeTabId' component={Squad} exact />
          <Route path='/user/:activeTabId' component={Squad} exact />
  
          <Route path='/404' exact render={() => <div>Sorry, but no pages on this location.</div>} />
          <Route path='/' render={() => <Redirect to="/404" />} exact />
          <Redirect from='' to='404'/>
          {/* <Route path='' render={() => <Redirect to="/404" />} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default PageContainer;
