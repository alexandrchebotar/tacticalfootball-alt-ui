import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import './style.sass';

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

class PageMenu extends Component {
  state = {
    // authorized: true,
    // user: 'ArmagedOFF',
    visibleClubList: false,
  };

  render() {
    const {user, currentClub} = this.props;
    const {visibleClubList} = this.state;
    return (
      <div class="pageMenu">
        $$pageMenu
      </div>
    )
  };
}

export default connect(mapStateToProps)(PageMenu);
