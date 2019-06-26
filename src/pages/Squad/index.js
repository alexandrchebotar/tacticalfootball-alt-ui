import React, {Component} from 'react';
import PageContainer from '../../components/PageContainer';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Text,
  HTMLSelect,
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
    skillsMode: 'combined',
  };

  handleTabChange = (id) => {
    this.setState({activeTabId: id});
  };

  handleSkillsModeChange = (event) => {
    this.setState({skillsMode: event.currentTarget.value});
  };

  render() {
    const {activeTabId, skillsMode} = this.state;
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
          onChange={this.handleTabChange}
          renderActiveTabPanelOnly
        >
          <Tab
            id="outfielders"
            title="All Outfielders"
            panel={<PlayersTable data={players} filter="outfielders" skillsMode={skillsMode} />}
          />
          <Tab
            id="forvards"
            title="Forvards"
            panel={<PlayersTable data={players} filter="forwards" skillsMode={skillsMode} />}
          />
          <Tab
            id="midlefielders"
            title="Midlefielders"
            panel={<PlayersTable data={players} filter="midlefielders" skillsMode={skillsMode} />}
          />
          <Tab
            id="defenders"
            title="Defenders"
            panel={<PlayersTable data={players} filter="defenders" skillsMode={skillsMode} />}
          />
          <Tab
            id="goalkeepers"
            title="Goalkeepers"
            panel={<PlayersTable data={players} filter="goalkeepers" skillsMode={skillsMode} />}
          />
          <Tabs.Expander />
          <Text>Skills mode: </Text>
          <HTMLSelect 
            options={['current', 'potential', 'match', 'combined']}
            value={skillsMode}
            onChange={this.handleSkillsModeChange}
            minimal
          />
        </Tabs>
      </div> 
    );
  };
};

export default Squad;
