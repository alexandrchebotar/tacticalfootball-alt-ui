import React, {Fragment} from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {
  Navbar,
  Tabs,
  Tab,
} from "@blueprintjs/core";


import './style.scss';

const mapStateToProps = ({currentClub: {name}}) => {
  return {clubName: name};
};

const PageMenu = ({match, page, clubName}) => {
  const tabs = {
    squad: [
      {id: "players", title: "Senior Players"},
      {id: "training", title: "Training"},
      {id: "prospects", title: "Prospects", disabled: true},
      {id: "statistics", title: "Statistics", disabled: true},
      {id: "tactics", title: "Tactics", disabled: true},
    ],
    office: [
      {id: "news", title: "News"},
      {id: "calendar", title: "Calendar"},
      {id: "transfers", title: "Transfers"},
      {id: "search", title: "Search"},
      {id: "finances", title: "Finances"},
      {id: "trophies", title: "Trophies"},
      {id: "scouting", title: "Scouting"},
    ],
    competitions: [],
    clubs: [],
    players: [],
    settings: [],
    user: [],
    404: [],
  };
  const getTabs = () => tabs[page].map(({id, title, disabled}) => (
    <Tab key={id} id={id} disabled={disabled}>
      <Link to={`/${page}/${id}`}>{title}</Link>
    </Tab>
  ));

  const PageTitle = () => (
    <Navbar.Group align="left">
      {['squad','office'].includes(page) ?
        <Fragment>
          <Navbar.Heading>{clubName}</Navbar.Heading>
          <Navbar.Divider />
          <Navbar.Heading>{page}</Navbar.Heading>
        </Fragment>
      :
        <Navbar.Heading>{page}</Navbar.Heading>
      }
    </Navbar.Group>
  );

  return (
    <div className="header">
      <Navbar>
        <PageTitle />
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

export default connect(mapStateToProps)(withRouter(PageMenu));
