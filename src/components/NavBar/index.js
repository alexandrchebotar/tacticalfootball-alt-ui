import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import './style.sass';

const mapStateToProps = ({competitions, forums}) => {
  return {competitions, forums};
};

class Navbar extends Component {
  state = {
    items: {
      squad: {senior: '{}', youth: '{}', training: '{}'},
      office: {finances: '{}', personal: '{}', buildings: '{}', calendar: '{}'},
      competitions: this.props.competitions,
      forum: this.props.forums,
      help: {manual: '{}', tour: '{}'},
      settings: {'alternate UI': '', user: '', club: ''},
    },
    submenu: [
      {name: '', items: []},
      {name: '', items: []},
      {name: '', items: []},
      {name: '', items: []},
    ],
  };

  showSubmenu = (level, name, items) => {
    this.setState(state => {
      let submenu = [...state.submenu];
      submenu[level] = {name, items};
      return {submenu};
    });
  };

  hideSubmenu = level => {
    if (level > 3) {
      return;
    }
    this.setState(state => {
      let submenu = [...state.submenu].map((item, index) => {
        return index < level ? item : {name: '', items: []};
      });
      submenu[level].name = '';
      return {submenu};
    });
  };

  getNavbarItems = () => {
    return Object.keys(this.state.items).map((item, index) => (
      <a href="/" key={index} onMouseEnter={() => this.showSubmenu(0, item, this.state.items[item])} >
        <svg className="navbar-item">
          <use xlinkHref={`images/icons.svg#${item}`}></use>
        </svg>
      </a>
    ));
  };

  getSubmenuItems = level => {
    return Object.entries(this.state.submenu[level].items).map(([name, value], index) => {
      let mouseEnterHandler;
      if (value.substr) {
        // TODO
        // string to link
        mouseEnterHandler = () => this.hideSubmenu(level + 1);
      } else if (Array.isArray(value)) {
        // TODO
        // array to link with additional info
        mouseEnterHandler = () => this.hideSubmenu(level + 1);
      } else {
        // object to submenu
        mouseEnterHandler = () => this.showSubmenu(level + 1, name, value);
      }
      return (
        <li key={index} onMouseEnter={mouseEnterHandler} >
          {name}
        </li>
      )
    });
  };

  render() {
    const {state: {submenu}, getNavbarItems, getSubmenuItems, hideSubmenu} = this;
    return (
      <Fragment>
        <div className="navbar">
          {getNavbarItems()}
        </div>
        {submenu[0].name &&
          <div className="navbar-submenu" onMouseLeave={() => hideSubmenu(0)}>
            <h1>{submenu[0].name}</h1>
            <ul>{getSubmenuItems(0)}</ul>

            {submenu[1].name &&
              <div className="navbar-submenu navbar-submenu-level-1" onMouseLeave={() => hideSubmenu(1)}>
                <h1>{submenu[1].name}</h1>
                <ul>{getSubmenuItems(1)}</ul>

                {submenu[2].name &&
                  <div className="navbar-submenu navbar-submenu-level-2" onMouseLeave={() => hideSubmenu(2)}>
                    <h1>{submenu[2].name}</h1>
                    <ul>{getSubmenuItems(2)}</ul>

                    {submenu[3].name &&
                      <div className="navbar-submenu navbar-submenu-level-3" onMouseLeave={() => hideSubmenu(3)}>
                        <h1>{submenu[3].name}</h1>
                        <ul>{getSubmenuItems(3)}</ul>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
