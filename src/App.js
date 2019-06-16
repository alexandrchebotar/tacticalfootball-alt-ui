import React from 'react';
import InfoBar from './components/Infobar';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Squad from './pages/Squad';

import './App.css';

function App() {
  return (
    <div className="App">
      <InfoBar />
      <NavBar />
      <Squad />
      <Footer>
        <div className="footer">
        </div>
      </Footer>
    </div>
  );
}

export default App;
