import React from 'react';
import Infobar from './components/Infobar';
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import Squad from './pages/Squad';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Infobar />
      <MainMenu />
      <Squad />
      <Footer>
        <div className="footer">
        </div>
      </Footer>
    </div>
  );
}

export default App;
