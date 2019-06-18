import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Position,
  Icon,
  Button,
  Colors,
  H1,
} from "@blueprintjs/core";

import './style.sass';

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

class Infobar extends Component {
  state = {
    // authorized: true,
    // user: 'ArmagedOFF',
    visibleClubList: false,
  };

toggleClubList = () => {
  this.setState(state => {
    return {visibleClubList: !state.visibleClubList};
  });
}

  render() {
    const {user, currentClub} = this.props;
    const {visibleClubList} = this.state;
    return (
      <div className="infobar-container">
        <Navbar className="infobar">
          <Navbar.Group >
            <Button href="#">
              <H1>Tactical Football</H1>
            </Button>
          </Navbar.Group>
          <Navbar.Group align="right">
            <Button href="#" icon="feed" intent="warning" minimal />
            <Button href="#" text="SKIF" rightIcon="caret-down" />
            <Navbar.Divider />
            <Button href="#" text="s20 wk7/14 19:47" rightIcon="calendar" />
            <Navbar.Divider />
            <Button href="#" icon="envelope" intent="warning" minimal />
            <Button href="#" text="ArmagedOFF" rightIcon="user" />
            {/* <Navbar.Divider />
            <Button href="#" icon="log-out" /> */}




            {/* <div className="infobar-items">
              {user &&
                <Fragment>
                  <span className="infobar-item" onMouseEnter={this.toggleClubList} onMouseLeave={this.toggleClubList}>
                    <svg className="infobar-item-icon">
                      <use xlinkHref="images/icons.svg#arrowhead-down"></use>
                    </svg>
                    {currentClub.name}
                    {visibleClubList &&
                      <ul className="infobar-item-dropdown">
                        <li>England</li>
                        <li>SKIF</li>
                        <li>Affiliate Football Club With Long Very Name</li>
                      </ul>
                    }
                  </span>
                  <span className="infobar-item">$7,258,104</span>
                </Fragment> 
              }
              <span className="infobar-item">s20 wk7/14</span>
              <span className="infobar-item">19:47</span>
              {user &&
                <a href="/" className="infobar-item">{user.name}</a>
              }
              <a href="/">
                <svg className="infobar-item-icon">
                  <use xlinkHref={`images/icons.svg#${user ? 'logout' : 'login'}`}></use>
                </svg>
              </a>
            </div> */}
          </Navbar.Group>
        </Navbar>
      </div>
    )
  };
}

export default connect(mapStateToProps)(Infobar);
