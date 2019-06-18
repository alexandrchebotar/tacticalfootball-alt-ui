import React from 'react';
import { connect } from 'react-redux';

import PageMenu from './PageMenu';

import './style.scss';

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

const PageContainer = ({children, ...restProps}) => {
  return (
    <div className="page-container">
      <div className="header">
        <PageMenu className="bp3-dark" {...restProps} />
      </div>
      <div className="page-content">
        {React.cloneElement(children, restProps)}
      </div>
    </div>
  )
};

export default connect(mapStateToProps)(PageContainer);
