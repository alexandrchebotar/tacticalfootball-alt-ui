import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import './style.sass';

const mapStateToProps = ({competitions, forums}) => {
  return {competitions, forums};
};

class Navbar extends Component {
  state = {
    activeItem: '',
    items: {
      squad: {'senior': {}, 'youth': {}, 'training': {}},
      office: {'finances': {}, 'personal': {}, 'buildings': {}, 'calendar': {}},
      competitions: this.props.competitions,
      forum: this.props.forums,
      help: {'manual': {}, 'tour': {}},
      settings: {'alternate UI': {}, 'user': {}, 'club': {}},
    },
  };

  showDetails = (activeItem) => {
    this.setState({activeItem});
  };

  hideDetails = () => {
    this.setState({activeItem: ''});
  }

  getNavbarItems() {
    return Object.keys(this.state.items).map((item, index) => (
      <a href="/" key={index} onMouseEnter={() => this.showDetails(item)} >
        <svg className="navbar-item">
          <use xlinkHref={`images/icons.svg#${item}`}></use>
        </svg>
      </a>
    ));
  }

  getNavbarDetailsList() {
    return Object.keys(this.state.items[this.state.activeItem]).map((item, index) => (
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

export default connect(mapStateToProps)(Navbar);
