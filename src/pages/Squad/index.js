import React, {Component} from 'react';
import PageContainer from '../../components/PageContainer';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Text,
  HTMLSelect,
  Checkbox,
} from "@blueprintjs/core";

import players from '../../store/players.json';

import './style.scss';

const Squad = ({match}) => {
  return (
    <PageContainer activeTabId={match.params.activeTabId}>
      <Content players={players} />
    </PageContainer>
  );
}

class Content extends Component {
  state = {
    activeTabId: 'forvards',
    skillsMode: 'training',
    sortByPotential: false,
  };

  setSortByPotential = (event) => {
    this.setState({sortByPotential: event.target.checked});
  };

  handleTabChange = (id) => {
    this.setState({activeTabId: id});
  };

  handleSkillsModeChange = (event) => {
    this.setState({skillsMode: event.currentTarget.value});
  };

  getPlayersTable = (filter) => {
    const {skillsMode, sortByPotential} = this.state;
    return (
      <PlayersTable 
        players={players}
        filter={filter}
        skillsMode={skillsMode}
        sortByPotential={sortByPotential}
      />
    );
  };

  render() {
    const {
      state: {activeTabId, skillsMode, sortByPotential},
      getPlayersTable,
      handleSkillsModeChange,
      handleTabChange,
      setSortByPotential,
    } = this;
    const players = this.props.players
      .sort(({potential:A},{potential:B})=>B-A)
      .sort(({rating:A},{rating:B})=>B-A)
      .sort(({age:A},{age:B})=>B-A);;
    return (
      <div className="content">
        <Tabs
          animate
          id="playersTable"
          selectedTabId={activeTabId}
          onChange={handleTabChange}
          renderActiveTabPanelOnly
        >
          <Tab id="outfielders" title="All Outfielders" panel={getPlayersTable('outfielders')} />
          <Tab id="forvards" title="Forvards" panel={getPlayersTable('forwards')} />
          <Tab id="midlefielders" title="Midlefielders" panel={getPlayersTable('midlefielders')} />
          <Tab id="defenders" title="Defenders" panel={getPlayersTable('defenders')} />
          <Tab id="goalkeepers" title="Goalkeepers" panel={getPlayersTable('goalkeepers')} />
          <Tabs.Expander />
          {['combined', 'training'].includes(skillsMode) &&
            <Checkbox  className="bp3-tab"
              // disabled={skillsMode !== 'combined'}
              checked={sortByPotential}
              onChange={setSortByPotential}
              label="sort by potential"
            />
          }
          <Text className="bp3-tab-text">Skills mode:</Text>
          <HTMLSelect  className="bp3-tab"
            options={['current', 'potential', 'match', 'combined', 'training']}
            value={skillsMode}
            onChange={handleSkillsModeChange}
            minimal
          />
        </Tabs>
      </div> 
    );
  };
};

export default Squad;
