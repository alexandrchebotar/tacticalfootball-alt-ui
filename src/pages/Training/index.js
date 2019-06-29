import React, {Component} from 'react';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Text,
  HTMLSelect,
  Checkbox,
} from "@blueprintjs/core";

import playersData from '../../store/players.json';

import './style.scss';

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
    const {skillsMode, sortByPotential} = this.state;
    return (
      <PlayersTable 
        players={players}
        filter={filter}
        skillsMode="training"
        sortByPotential={sortByPotential}
      />
    );
  };

  render() {
    const {
      state: {activeTabId, sortByPotential},
      getPlayersTable,
      handleTabChange,
      setSortByPotential,
    } = this;
    const players = playersData.sort(({potential:A},{potential:B})=>B-A).sort(({rating:A},{rating:B})=>B-A).sort(({age:A},{age:B})=>B-A);
    return (
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
    );
  };
};

export default Training;
