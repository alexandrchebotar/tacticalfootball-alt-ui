import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Infobar from './components/Infobar';
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import PageContainer from './components/PageContainer';
import Squad from './pages/Squad';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Infobar />
      <MainMenu />
      <Switch>
        <Route path='/squad/:activeTabId' component={Squad} />
        <Route path='/squad/' render={() => <Redirect to="/squad/players"/>} />
        <Route path='/office' render={()=><PageContainer><div>office</div></PageContainer>} />
        <Route path='/competition/:id' render={({match})=><PageContainer><div>competition {match.params.id}</div></PageContainer>} />
        <Route path='/404' exact render={() => <PageContainer><div>Error 404. Sorry, but no pages on this location.</div></PageContainer>} />
        <Route path='/' exact component={Squad} />
        <Route path='' render={() => <Redirect to="/404"/>} />
      </Switch>
      <Footer>
        <div className="footer"></div>
      </Footer>
    </div>
  );
}

export default App;
