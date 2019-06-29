import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Infobar from './components/Infobar';
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import PageContainer from './components/PageContainer';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Infobar />
      <MainMenu />
      <Switch>
        <Route path='/squad/:activeTabId' render={() => <PageContainer page="squad" />} exact />
        <Route path='/squad/' render={() => <Redirect to="/squad/players"/>} exact />
        <Route path='/office/:activeTabId' render={() => <PageContainer page="office" />} exact />
        <Route path='/office/' render={() => <Redirect to="/office/news"/>} exact />
        <Route path='/competitions/:competitionsId/:activeTabId' render={() => <PageContainer page="competitions" />} exact />
        <Route path='/clubs/:clubId/:activeTabId' render={() => <PageContainer page="clubs" />} exact />
        <Route path='/players/:playerId/:activeTabId' render={() => <PageContainer page="players" />} exact />
        <Route path='/settings/:activeTabId' render={() => <PageContainer page="settings" />} exact />
        <Route path='/user/:activeTabId' render={() => <PageContainer page="user" />} exact />

        <Route path='/404' exact render={() => <PageContainer page="404" />} exact />
        <Route path='/' render={() => <Redirect to="/404" />} exact />
        <Route path='' render={() => <Redirect to="/404" />} />
      </Switch>
      <Footer>
        <div className="footer"></div>
      </Footer>
    </div>
  );
}

export default App;
