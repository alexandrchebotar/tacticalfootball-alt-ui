import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

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
      <div className="infobar">
        <div className="infobar-container">
          <a href="/">
            <svg className="logo">
              <use xlinkHref={'images/icons.svg#logo'}></use>
            </svg>
            <h1>Tactical Football</h1>
          </a>
          <div className="infobar-items">
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
          </div>
        </div>
      </div>
    )
  };
}

export default connect(mapStateToProps)(Infobar);
