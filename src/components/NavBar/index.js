import React, {Component} from 'react';

import './style.sass';

class App extends Component {

  items = [
    'squad',
    'office',
    'competitions',
    'forum',
    'help',
    'settings',
  ];

  getNavbarItems = () => {
    return this.items.map((item, index) => (
      <a href="/" key={index} >
        <svg className="navbar-item">
          <use xlinkHref={`images/icons.svg#${item}`}></use>
        </svg>
      </a>
    ));
  };

  render() {
    return (
      <div className="navbar">
        {this.getNavbarItems()}
      </div>
    );
  }
}

export default App;
