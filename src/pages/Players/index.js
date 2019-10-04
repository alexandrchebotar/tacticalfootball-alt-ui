import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Text,
  HTMLSelect,
  Checkbox,
} from "@blueprintjs/core";
import {getPlayers, clearPlayers} from '../../store/actions';

import './style.scss';

const mapStateToProps = ({currentClub: {id, name, players}}) => {
  return {clubId: id, clubName: name, players};
};

const mapDispatchToProps = dispatch => {
  return {    
    getPlayers: () => dispatch(getPlayers()),
    clearPlayers: () => dispatch(clearPlayers()),
  }
};

class Players extends Component {
  state = {
    activeTabId: 'forvards',
    skillsMode: 'combined',
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

  getPlayersTable = ({players, filter}) => {
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

  componentDidMount() {
    this.props.getPlayers();
  };
  componentWillUnmount() {
    this.props.clearPlayers();
  };

  render() {
    const {
      state: {activeTabId, skillsMode, sortByPotential},
      props: {clubName, players},
      getPlayersTable,
      handleSkillsModeChange,
      handleTabChange,
      setSortByPotential,
    } = this;
    return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Senior Players</title>
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
            {['combined', 'training'].includes(skillsMode) &&
              <Checkbox  className="bp3-tab"
              checked={sortByPotential}
                onChange={setSortByPotential}
                label="sort by potential"
              />
            }
            <Text className="bp3-tab-text">Skills mode:</Text>
            <HTMLSelect  className="bp3-tab"
              options={['current', 'potential', 'match', 'combined']}
              value={skillsMode}
              onChange={handleSkillsModeChange}
              minimal
              />
          </Tabs>
        </div> 
      </Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
