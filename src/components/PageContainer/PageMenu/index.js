import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import {
  Navbar,
  Switch,
  Tabs,
  Tab,
} from "@blueprintjs/core";


import './style.scss';

const PageMenu = ({match, page}) => {
  const tabs = {
    squad: [
      {id: "players", title: "Senior Players"},
      {id: "training", title: "Training"},
      {id: "prospects", title: "Prospects"},
      {id: "statistics", title: "Statistics"},
      {id: "tactics", title: "Tactics"},
    ],
    office: [
      {id: "news", title: "News"},
      {id: "calendar", title: "Calendar"},
      {id: "transfers", title: "Transfers"},
      {id: "finances", title: "Finances"},
      {id: "trophies", title: "Trophies"},
      {id: "scouting", title: "Scouting"},
    ],
    competitions: [],
    clubs: [],
    players: [],
    settings: [],
    user: [],
    [404]: [],
  };
  const getTabs = () => tabs[page].map(({id, title}) => (
    <Tab key={id} id={id}>
      <Link to={`/${page}/${id}`}>{title}</Link>
    </Tab>
  ));

  return (
    <div className="header">
      <Navbar>
        <Navbar.Group align="left">
          <Navbar.Heading>{page}</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align="right">
          <Tabs
            animate
            id="pageMenu"
            selectedTabId={match.params.activeTabId}
            // onChange={handleTabChange}
          >
          {getTabs(page)}
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
