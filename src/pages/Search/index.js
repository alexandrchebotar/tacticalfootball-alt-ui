import React, {Component} from 'react';
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Checkbox,
} from "@blueprintjs/core";
import {clearSearch, searchPlayers} from '../../store/actions';

import './style.scss';

const mapStateToProps = ({search: {players, clubs}}) => {
  return {players, clubs};
};

const mapDispatchToProps = dispatch => {
  return {
    searchPlayers: (filter) => dispatch(searchPlayers(filter)),
    clearSearch: () => dispatch(clearSearch()),
  }
};

class Search extends Component {
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
        type="transfers"
        skillsMode="combined"
        sortByPotential={this.state.sortByPotential}
      />
    );
  };

  componentDidMount() {
    this.props.searchPlayers();
  };
  componentWillUnmount() {
    this.props.clearSearch();
  };

  render() {
    const {
      state: {activeTabId, sortByPotential},
      props: {players},
      getPlayersTable,
      handleTabChange,
      setSortByPotential,
    } = this;
    return (
      <div className="content">
        <Tabs
          animate
          id="searchPlayersTable"
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
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
