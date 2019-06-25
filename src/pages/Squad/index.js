import React, {Component} from 'react';
import PageContainer from '../../components/PageContainer';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Switch,
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
  };

  handleTabChange = (id) => {
    this.setState({activeTabId: id});
  };

  render() {
    const players = this.props.players
      .sort(({potential:A},{potential:B})=>B-A)
      .sort(({rating:A},{rating:B})=>B-A)
      .sort(({age:A},{age:B})=>B-A);;
    return (
      <div className="content">
        <Tabs
          animate
          id="playersTable"
          selectedTabId={this.state.activeTabId}
          onChange={this.handleTabChange}
          renderActiveTabPanelOnly
        >
          <Tab id="outfielders" title="All Outfielders" panel={<PlayersTable data={players} filter="outfielders" />} />
          <Tab id="forvards" title="Forvards" panel={<PlayersTable data={players} filter="forwards" />} />
          <Tab id="midlefielders" title="Midlefielders" panel={<PlayersTable data={players} filter="midlefielders" />} />
          <Tab id="defenders" title="Defenders" panel={<PlayersTable data={players} filter="defenders" />} />
          <Tab id="goalkeepers" title="Goalkeepers" panel={<PlayersTable data={players} filter="goalkeepers" />} />
          <Tabs.Expander />
          <Switch label="Sort by potentials" inline/>
        </Tabs>
      </div> 
    );
  };
};

export default Squad;
