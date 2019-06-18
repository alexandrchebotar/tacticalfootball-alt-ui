import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Position,
  Icon,
  Button,
  Colors,
} from "@blueprintjs/core";

import './style.sass';

const mapStateToProps = ({competitions, forums}) => {
  return {competitions, forums};
};

class MainMenu extends Component {
  state = {
    items: {
      squad: {
        players: ['#', false, 'people'],
        training: ['#', false, 'walk'],
        prospects: ['#', false, 'new-person'],
        statistics: ['#', false, 'timeline-bar-chart'],
        tactics: ['#', false, 'layout-group-by'],
      },
      office: {
        news: ['#', true, 'feed'],
        calendar: ['#', false, 'calendar'],
        transfers: ['#', false, 'shopping-cart'],
        finances: ['#', false, 'dollar'],
        trophies: ['#', false, 'glass'],
        scouting: ['#', false, 'new-person'],
      },
      competitions: this.props.competitions,
      forum: this.props.forums,
      help: {
        manual: '{}',
        'origin UI tours': {
          'club page': ['', null, null, '_blank'],
          'player page': ['', null, null, '_blank']
        }
      },
      settings: {'alternate UI': '', user: '', club: ''},
    },
  };

  getMainMenuItems = () => {
    return Object.entries(this.state.items).map(([name, items]) => {
      const warning = Object.values(items).some(item => Array.isArray(item) && item[1]);
      const icon = name === 'competitions' ?
        'glass' :
        name === 'forum' ?
          'comment':
          name === 'help' ?
            'help' :
            name === 'settings' ?
            'cog' :
            null;
      return (
        <Popover
          key={name}
          content={
            <Menu className="main-menu-submenu">
              {this.getSubmenu({name, items, icon})}
              {warning && name === 'forum' &&
                <Fragment>
                  <MenuDivider />
                  <MenuItem text="mark all read" labelElement={alert && <Icon icon="eye-on" />} />
                </Fragment>
              }
            </Menu>
          } 
          position={Position.RIGHT_TOP}
          interactionKind="hover"
          minimal
          autoFocus={false}
          popoverClassName="main-menu-submenu"
        >
          <Button className="main-menu-item">
            <svg className={warning ? 'main-menu-icon warning' : 'main-menu-icon'}>
              <use xlinkHref={`images/icons.svg#${name}`}></use>
            </svg>
          </Button>
        </Popover>
      );
    });
    
  };

  getSubmenu({name, items, icon}) {
    const submenuItems = Object.entries(items).map(([name, value]) => {
      return this.getSubmenuItem({name, value, icon});
    });
    return (
      <Fragment>
        <MenuDivider title={name} />
        {submenuItems}
      </Fragment>
    );
  };

  getSubmenuItem({name, value, icon}) {
    if (value.substr) {
      // string to link
      return <MenuItem text={name} href={value} key={name} icon={icon || "dot"} />;
    } else if (Array.isArray(value)) {
      // array to link with additional info
      const [href, alert, customIcon, target] = value;
      return (
        <MenuItem
          text={name}
          href={href}
          target={target}
          key={name}
          icon={<Icon icon={customIcon || icon || "dot"} intent={alert ? "warning" : null} />}
          labelElement={target ? <Icon icon="share" /> : null}
        />
      );
    }
    // object to submenu
    return (
      <MenuItem text={name} key={name} icon={icon || "dot"}>
        {this.getSubmenu({name, items: value, icon})}
      </MenuItem>
    );
  };

  render() {
    return (
        <div className="main-menu">
          {this.getMainMenuItems()}
        </div>
    );
  }
}

export default connect(mapStateToProps)(MainMenu);
