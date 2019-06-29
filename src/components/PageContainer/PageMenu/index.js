import React, {Fragment} from 'react';
import { withRouter } from "react-router";
import {
  Navbar,
  Switch,
  Tabs,
  Tab,
} from "@blueprintjs/core";


import './style.scss';

const PageMenu = ({match, title}) => {
  return (
    <div className="header">
      <Navbar>
        <Navbar.Group align="left">
          <Navbar.Heading>{title}</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align="right">
          <Tabs
            animate
            id="pageMenu"
            selectedTabId={match.params.activeTabId}
            // onChange={handleTabChange}
          >
            <Tab id="players" title="Senior Players" />
            <Tab id="training" title="Training" />
            <Tab id="tactics" title="Tactics" />
          </Tabs>
          {/* {results &&
            <Fragment>
              <Navbar.Divider />
              <Switch label="Show results" inline/>
            </Fragment>
          } */}
        </Navbar.Group>
      </Navbar>
    </div>
  );
};

PageMenu.defaultProps = {
  pageName: 'Squad',
  results: true,
}

export default withRouter(PageMenu);
