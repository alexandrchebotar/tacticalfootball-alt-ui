import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Tab,
  Checkbox,
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  ControlGroup,
  NumericInput,
  HTMLSelect,
  Switch,
  HTMLTable,
} from "@blueprintjs/core";
import {clearSearch, searchPlayers, clearSearchFilter} from '../../store/actions';
import PlayersTable from '../../components/PlayersTable';
import SearchFilter from '../../components/SearchFilter';

import './style.scss';

const mapStateToProps = ({search: {players, clubs}}) => {
  return {players, clubs};
};

const mapDispatchToProps = dispatch => {
  return {
    searchPlayers: (filter) => dispatch(searchPlayers(filter)),
    clearSearch: () => dispatch(clearSearch()),
    clearSearchFilter: () => dispatch(clearSearchFilter()),
  }
};

class Search extends Component {
  state = {
    activeTabId: 'forvards',
    sortByPotential: false,
    filterVisible: false,
    filter: {},
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
      state: {activeTabId, sortByPotential, filterVisible},
      props: {players},
      getPlayersTable,
      handleTabChange,
      setSortByPotential,
    } = this;
    return (
      <div className="content">
        <ButtonGroup minimal={true}>
          <Button 
            text="Transfer Market"
            onClick={() => {this.setState({filterVisible: false})}}
          />  
          <Button 
            text="Recent Transfers"
            onClick={() => {this.setState({filterVisible: false})}}
          />
          <Button 
            icon="filter"
            text="Custom Filter"
            onClick={() => {this.setState((state) => ({filterVisible: !state.filterVisible}))}}
          />
          <HTMLSelect options={['Saved filters', 'opt1', 'opt2', 'opt3']} minimal disabled/>
          {filterVisible &&
            <Fragment>
              <Button 
                icon="filter-remove"
                text="Clear filter"
                onClick={this.props.clearSearchFilter()}
              />
              <Button 
                icon="search"
                text="Search"
                onClick={this.props.searchPlayers(this.state.filter)}
              />
            </Fragment>
          }
        </ButtonGroup>
        {filterVisible &&
          <SearchFilter />
        }
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
