import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Checkbox,
} from "@blueprintjs/core";
import {getTraining, clearPlayers, setTraining} from '../../store/actions';

import './style.scss';

const mapStateToProps = ({currentClub: {id, name, players}}) => {
  return {clubId: id, clubName: name, players};
};

const mapDispatchToProps = dispatch => {
  return {
    getTraining: () => dispatch(getTraining()),
    clearPlayers: () => dispatch(clearPlayers()),
    setTraining: ({playerId, skill, value}) => dispatch(setTraining({playerId, skill, value})),
  }
};

class Training extends Component {
  state = {
    activeTabId: 'forvards',
    sortByPotential: false,
  };

  setSortByPotential = (event) => {
    this.setState({sortByPotential: event.target.checked});
  };

  handleTabChange = (id) => {
    this.setState({activeTabId: id});
  };

  getPlayersTable = ({players, filter}) => {
    return (
      <PlayersTable 
        players={players}
        filter={filter}
        type="training"
        skillsMode="combined"
        sortByPotential={this.state.sortByPotential}
        setTraining={this.props.setTraining}
      />
    );
  };

  componentDidMount() {
    this.props.getTraining();
  };
  componentWillUnmount() {
    this.props.clearPlayers();
  };

  render() {
    const {
      state: {activeTabId, sortByPotential},
      props: {clubName, players},
      getPlayersTable,
      handleTabChange,
      setSortByPotential,
    } = this;
    return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Training</title>
        </Helmet>
        <div className="content">
          <Tabs
            animate
            id="playersTable"
            selectedTabId={activeTabId}
            onChange={handleTabChange}
            renderActiveTabPanelOnly
          >
            <Tab id="outfielders" title="All Outfielders" panel={getPlayersTable({players, filter: 'outfielders'})} />
            <Tab id="forvards" title="Forvards" panel={getPlayersTable({players, filter: 'forwards'})} />
            <Tab id="midlefielders" title="Midlefielders" panel={getPlayersTable({players, filter: 'midlefielders'})} />
            <Tab id="defenders" title="Defenders" panel={getPlayersTable({players, filter: 'defenders'})} />
            <Tab id="goalkeepers" title="Goalkeepers" panel={getPlayersTable({players, filter: 'goalkeepers'})} />
            <Tabs.Expander />
            <Checkbox  className="bp3-tab"
              checked={sortByPotential}
              onChange={setSortByPotential}
              label="sort by potential"
            />
          </Tabs>
        </div> 
      </Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);
