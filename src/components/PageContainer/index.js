import React, {Component} from 'react';
import { connect } from 'react-redux';
import PageMenu from './PageMenu';

import './style.scss';

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

class PageContainer extends Component {
  state = {
    activeTabId: this.props.activeTabId,
  };

  static getDerivedStateFromProps(props){
   return {activeTabId: props.activeTabId};
  };
  handleTabChange = (tabId) => {
    this.setState({activeTabId: tabId});
  };

  render() {
    const {children, ...restProps} = this.props;
    const {activeTabId} = this.state;
    return (
      <div className="page-container">
        <div className="header">
          <PageMenu className="bp3-dark" handleTabChange={this.handleTabChange} activeTabId={activeTabId} />
        </div>
        <div className="page-content">
          {React.cloneElement(children, {...restProps, activeTabId})}
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps)(PageContainer);
