import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import {
  Tabs,
  Tab,
  Checkbox,
} from "@blueprintjs/core";
import {getTransfers, clearTransfers, searchPlayers, clearSearch} from '../../store/actions';

import './style.scss';

const mapStateToProps = ({currentClub: {id, name, sells, bids}, search: {players}}) => {
  return {clubId: id, clubName: name, sells, bids, players};
};

const mapDispatchToProps = dispatch => {
  return {
    getTransfers: () => dispatch(getTransfers()),
    clearTransfers: () => dispatch(clearTransfers()),
    searchPlayers: () => dispatch(searchPlayers()),
    clearSearch: () => dispatch(clearSearch()),
  }
};

class Transfers extends Component {
  state = {
    activeTabIdSells: 'outfielders',
    sortByPotentialSells: false,
    activeTabIdBids: 'outfielders',
    sortByPotentialBids: false,
    activeTabIdTransferMarket: 'forvards',
    sortByPotentialTransferMarket: false,
  };

  setSortByPotentialSells = (event) => {
    this.setState({sortByPotentialSells: event.target.checked});
  };
  setSortByPotentialBids = (event) => {
    this.setState({sortByPotentialBids: event.target.checked});
  };
  setSortByPotentialTransferMarket = (event) => {
    this.setState({sortByPotentialTransferMarket: event.target.checked});
  };
  handleSellsTabChange = (id) => {
    this.setState({activeTabIdSells: id});
  };
  handleBidsTabChange = (id) => {
    this.setState({activeTabIdBids: id});
  };
  handleTransferMarketTabChange = (id) => {
    this.setState({activeTabIdTransferMarket: id});
  };

  getPlayersTable = ({players, filter, sortByPotential}) => {
    return (
      <PlayersTable 
        players={players}
        filter={filter}
        type="transfers"
        skillsMode="combined"
        sortByPotential={sortByPotential}
      />
    );
  };

  componentDidMount() {
    this.props.getTransfers();
    this.props.searchPlayers();
  };
  componentWillUnmount() {
    this.props.clearTransfers();
    this.props.clearSearch();
  };

  render() {
    const {
      state: {
        activeTabIdSells,
        sortByPotentialSells,
        activeTabIdBids,
        sortByPotentialBids,
        activeTabIdTransferMarket,
        sortByPotentialTransferMarket,
      },
      props: {clubName, sells, bids, players},
      getPlayersTable,
      handleSellsTabChange,
      handleBidsTabChange,
      handleTransferMarketTabChange,
      setSortByPotentialSells,
      setSortByPotentialBids,
      setSortByPotentialTransferMarket,
    } = this;

    return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Transfers</title>
        </Helmet>
        <div className="content">
          <h2>
            Current Club Sells
          </h2>
          <Tabs
            animate
            id="sellsTable"
            selectedTabId={activeTabIdSells}
            onChange={handleSellsTabChange}
            renderActiveTabPanelOnly
          >
            <Tab id="outfielders" title="All Outfielders" panel={getPlayersTable({players: sells, filter: 'outfielders', sortByPotential: sortByPotentialSells})} />
            <Tab id="forvards" title="Forvards" panel={getPlayersTable({players: sells, filter: 'forwards', sortByPotential: sortByPotentialSells})} />
            <Tab id="midlefielders" title="Midlefielders" panel={getPlayersTable({players: sells, filter: 'midlefielders', sortByPotential: sortByPotentialSells})} />
            <Tab id="defenders" title="Defenders" panel={getPlayersTable({players: sells, filter: 'defenders', sortByPotential: sortByPotentialSells})} />
            <Tab id="goalkeepers" title="Goalkeepers" panel={getPlayersTable({players: sells, filter: 'goalkeepers', sortByPotential: sortByPotentialSells})} />
            <Tabs.Expander />
            <Checkbox  className="bp3-tab"
              checked={sortByPotentialSells}
              onChange={setSortByPotentialSells}
              label="sort by potential"
            />
          </Tabs>
          <h2>
            Current Club Bids
          </h2>
          <Tabs
            animate
            id="bidsTable"
            selectedTabId={activeTabIdBids}
            onChange={handleBidsTabChange}
            renderActiveTabPanelOnly
          >
            <Tab id="outfielders" title="All Outfielders" panel={getPlayersTable({players: bids, filter: 'outfielders', sortByPotential: sortByPotentialBids})} />
            <Tab id="forvards" title="Forvards" panel={getPlayersTable({players: bids, filter: 'forwards', sortByPotential: sortByPotentialBids})} />
            <Tab id="midlefielders" title="Midlefielders" panel={getPlayersTable({players: bids, filter: 'midlefielders', sortByPotential: sortByPotentialBids})} />
            <Tab id="defenders" title="Defenders" panel={getPlayersTable({players: bids, filter: 'defenders', sortByPotential: sortByPotentialBids})} />
            <Tab id="goalkeepers" title="Goalkeepers" panel={getPlayersTable({players: bids, filter: 'goalkeepers', sortByPotential: sortByPotentialBids})} />
            <Tabs.Expander />
            <Checkbox  className="bp3-tab"
              checked={sortByPotentialBids}
              onChange={setSortByPotentialBids}
              label="sort by potential"
            />
          </Tabs>
          <h2>
            Current Transfer Market
          </h2>
          <Tabs
            animate
            id="transferMarketTable"
            selectedTabId={activeTabIdTransferMarket}
            onChange={handleTransferMarketTabChange}
            renderActiveTabPanelOnly
          >
            <Tab id="outfielders" title="All Outfielders" panel={getPlayersTable({players, filter: 'outfielders', sortByPotential: sortByPotentialTransferMarket})} />
            <Tab id="forvards" title="Forvards" panel={getPlayersTable({players, filter: 'forwards', sortByPotential: sortByPotentialTransferMarket})} />
            <Tab id="midlefielders" title="Midlefielders" panel={getPlayersTable({players, filter: 'midlefielders', sortByPotential: sortByPotentialTransferMarket})} />
            <Tab id="defenders" title="Defenders" panel={getPlayersTable({players, filter: 'defenders', sortByPotential: sortByPotentialTransferMarket})} />
            <Tab id="goalkeepers" title="Goalkeepers" panel={getPlayersTable({players, filter: 'goalkeepers', sortByPotential: sortByPotentialTransferMarket})} />
            <Tabs.Expander />
            <Checkbox  className="bp3-tab"
              checked={sortByPotentialTransferMarket}
              onChange={setSortByPotentialTransferMarket}
              label="sort by potential"
            />
          </Tabs>
        </div>
      </Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
