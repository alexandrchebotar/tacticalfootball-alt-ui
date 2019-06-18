import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Menu,
  Popover,
  Icon,
  Button,
  H1,
  Text,
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

  getClubsMenu = () => {
    const clubsList = this.props.user.clubs.map(({name, id, news}) => (
      <Menu.Item
        key={name}
        text={name}
        href={id}
        icon={news ? <Icon icon="feed" intent="warning" /> : "dot"}
      />
    ));
    return (
      <Menu className="clubs-menu">
        {clubsList}
      </Menu>
    );
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
            {user &&
              <Fragment>
                <Button href="#" icon="feed" intent="warning" minimal />
                <Popover content={this.getClubsMenu()} position="bottom-left" minimal>
                  <Button href={currentClub.id} text={currentClub.name} rightIcon="caret-down" />
                </Popover>
                <Navbar.Divider />
              </Fragment>
            }
            {user ?
              <Button href="#" text="s20 wk7/14 19:47" rightIcon="calendar" />
            :
              <Text>s20 wk7/14 19:47</Text>
            }
            <Navbar.Divider />
            {user ?
              <Fragment>
                {user.messages &&
                  <Button href="#" icon="envelope" intent="warning" minimal />
                }
                <Popover 
                  content={(
                    <Menu>
                      <Menu.Item href="#" text="settings" icon="cog" />
                      <Menu.Item
                        href="#"
                        text="messages" 
                        icon={user.messages ? <Icon icon="envelope" intent="warning" /> : "envelope"}
                      />
                      <Menu.Divider />
                      <Menu.Item href="#" text="logout" icon="log-out" />
                    </Menu>
                  )}
                  position="bottom-right"
                  minimal>
                  <Button text={user.name} rightIcon="user" />
                </Popover>
              </Fragment>
            :
              <Button text="Login" rightIcon="log-in" />
            }
          </Navbar.Group>
        </Navbar>
      </div>
    )
  };
}

export default connect(mapStateToProps)(Infobar);
