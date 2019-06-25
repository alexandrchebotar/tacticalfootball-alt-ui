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

  getOutfielpers() {
    return this.props.players.filter(({position}) => position !== 'GK').map(({
      id, 
      country_info: {title: nation, url: flag}, 
      name, age, age_long, current_rating: rating , rating: potential,
      experience, experience_team, foot, form_mid: form, form_rising, position, 
      skills: {AE, BC, CO, DP, OP, PA, SC, TA, Fit}
    }) => ({
      id, nation, flag: `https://tacticalfootball.com/${flag}`, name, age, age_long, rating, potential, 
      potential, experience, experience_team, foot, form, form_rising,
      position, Fit, SC, OP, BC, PA, AE, CO, TA, DP
    })).sort(({potential:A},{potential:B})=>B-A).sort(({rating:A},{rating:B})=>B-A).sort(({age:A},{age:B})=>B-A);
  };
  
  getGoalkeepers() {
    return this.props.players.filter(({position}) => position === 'GK').map(({
      id, 
      country_info: {title: nation, url: flag}, 
      name, age, age_long, current_rating: rating , rating: potential,
      experience, experience_team, foot, form_mid: form, form_rising, position, 
      skills: {RE, GP, IN, CT, OR, CO, Fit}
    }) => ({
      id, nation, flag: `https://tacticalfootball.com/${flag}`, name, age, age_long, rating, potential, 
      potential, experience, experience_team, foot, form, form_rising,
      position, Fit, RE, GP, IN, CT, OR, CO
    }));
  };

  render() {
    const {denomFormatter} = this;
    return (
      <div className="content">
        <Tabs
            animate
            id="playersTable"
            selectedTabId={this.state.activeTabId}
            onChange={this.handleTabChange}
            renderActiveTabPanelOnly
          >
            <Tab id="outfielders" title="All Outfielders" panel={<PlayersTable data={this.getOutfielpers()} />} />
            <Tab id="forvards" title="Forvards" panel={<PlayersTable data={this.getOutfielpers()} filter="forwards" />} />
            <Tab id="midlefielders" title="Midlefielders" panel={<PlayersTable data={this.getOutfielpers()} filter="midlefielders" />} />
            <Tab id="defenders" title="Defenders" panel={<PlayersTable data={this.getOutfielpers()} filter="defenders" />} />
            <Tab id="goalkeepers" title="Goalkeepers" panel={<PlayersTable data={this.getGoalkeepers()} />} />
            <Tabs.Expander />
            <Switch label="Sort by potentials" inline/>
          </Tabs>
      </div> 
    );
  };
};

export default Squad;
