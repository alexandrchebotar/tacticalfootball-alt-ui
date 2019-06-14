import React, {Component, Fragment} from 'react';

import './style.sass';

class NavBar extends Component {
  state = {
    activeItem: '',
  };

  items = {
    'squad': ['senior', 'youth', 'training'],
    'office': ['finances', 'personal', 'buildings', 'calendar'],
    'competitions': ['leagues', 'cups', 'national', 'current'],
    'forum': ['general', 'national'],
    'help': ['manual', 'tour'],
    'settings': ['alternate UI', 'user', 'club'],
  };

  showDetails = (activeItem) => {
    this.setState({activeItem});
  };

  hideDetails = () => {
    this.setState({activeItem: ''});
  }

  getNavbarItems() {
    return Object.keys(this.items).map((item, index) => (
      <a href="/" key={index} onMouseEnter={() => this.showDetails(item)} >
        <svg className="navbar-item">
          <use xlinkHref={`images/icons.svg#${item}`}></use>
        </svg>
      </a>
    ));
  }

  getNavbarDetailsList() {
    return this.items[this.state.activeItem].map((item, index) => (
      <li key={index} >{item}</li>
    ));
  }

  render() {
    return (
      <Fragment>
        <div className="navbar">
          {this.getNavbarItems()}
        </div>
        {this.state.activeItem &&
          <div className="navbar-details" onMouseLeave={this.hideDetails}>
            <h1>{this.state.activeItem}</h1>
            <ul>
              {this.getNavbarDetailsList()}
            </ul>
          </div>
        }
      </Fragment>
    );
  }
}

export default NavBar;
