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
      squad: {senior: '{}', youth: '{}', training: '{}'},
      office: {finances: '{}', personal: '{}', buildings: '{}', calendar: '{}'},
      competitions: this.props.competitions,
      forum: this.props.forums,
      help: {manual: '{}', tour: '{}'},
      settings: {'alternate UI': '', user: '', club: ''},
    },
  };

  getMainMenuItems = () => {
    return Object.entries(this.state.items).map(([name, items]) => {
      const forumUnread = name === 'forum' && Object.values(items).some(arr => arr[2] === 'unread');
      return (
        <Popover
          key={name}
          content={
            <Menu className="main-menu-submenu">
              {this.getSubmenu({name, items})}
              {forumUnread && 
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
        >
          <Button className="main-menu-item">
            <svg className={forumUnread ? "main-menu-icon warning" : "main-menu-icon"}>
              <use xlinkHref={`images/icons.svg#${name}`}></use>
            </svg>
          </Button>
        </Popover>
      );
    });
    
  };

  getSubmenuItem({name, value}) {
    if (value.substr) {
      // string to link
      return <MenuItem text={name} href={value} key={name} icon="dot" />;
    } else if (Array.isArray(value)) {
      // array to link with additional info
      const [href, alert] = value;
      return (
        <MenuItem text={name} href={href} key={name} icon="dot"
          labelElement={alert && <Icon icon="comment" color={Colors.ORANGE5} />}
        />
      );
    }
    // object to submenu
    return (
      <MenuItem text={name} key={name} icon="dot">
        {this.getSubmenu({name, items: value})}
      </MenuItem>
    );
  };

  getSubmenu({name, items}) {
    const submenuItems = Object.entries(items).map(([name, value]) => {
      return this.getSubmenuItem({name, value});
    });
    return (
      <Fragment>
        <MenuDivider title={name} />
        {submenuItems}
      </Fragment>
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
