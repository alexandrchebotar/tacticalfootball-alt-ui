import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Button,
  H1,
  Text,
} from "@blueprintjs/core";

import './style.sass';

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

class Infobar extends Component {

  render() {
    const {user, currentClub} = this.props;
    return (
      <div className="infobar-container">
        <Navbar className="infobar">
          <Navbar.Group >
            <Button href="#">
              <H1>Tactical Football</H1>
            </Button>
          </Navbar.Group>
          <Navbar.Group align="right">
            {user ?
              <Fragment>
                <ClubsMenu user={user} currentClub={currentClub} />
                <Navbar.Divider />
                <Button href="#" text="s20 wk7/14 19:47" rightIcon="calendar" />
              </Fragment>
            :
              <Text>s20 wk7/14 19:47</Text>
            }
            <Navbar.Divider />
            <UserMenu user={user} />
          </Navbar.Group>
        </Navbar>
      </div>
    )
  };
}

export default connect(mapStateToProps)(Infobar);
