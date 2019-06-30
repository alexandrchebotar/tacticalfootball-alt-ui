import React, {Component, Fragment} from 'react';
import ReactDOMServer from 'react-dom/server';
// import { ReactTabulator } from 'react-tabulator';
import { ReactTabulator } from '../../common/libs/react-tabulator/lib';
import { withRouter } from "react-router";
import CombinedSkill from './CombinedSkill';
import StatusIcons from './StatusIcons';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import './style.scss';

class PlayersTable extends Component {
  state = {
    columns: [],
    players: [],
  };

  static getDerivedStateFromProps(props, state) {
    const {players, filter, skillsMode, sortByPotential} = props;
    const getPlayers = () => {
      return (filter === 'outfielders') ?
        players.filter(({position}) => position !== 'GK') :
        (filter === 'goalkeepers') ?
          players.filter(({position}) => position === 'GK') :
          (filter === 'forwards') ?
            players.filter(({position}) => ['ST','FW'].includes(position)) :
            (filter === 'midlefielders') ?
              players.filter(({position}) => ['LW','OM','RW','LM','CM','RM','LWB','DM','RWB'].includes(position)) :
              (filter === 'defenders') ?
                players.filter(({position}) => position === 'CB') :
                players;
    };
    const getColumns = () => {
      const baseColumnSettings = {
        align: 'center',
        headerSortStartingDir: 'desc',
      }
      const skillsColumnSettings = {
        ...baseColumnSettings,
        formatter: skillsFormatter,
        sorter: skillsSorter,
        sorterParams: {sortByPotential, skillsMode},
        width: (skillsMode === 'training') ? 65 :
          (skillsMode === 'combined' || skillsMode === 'match') ? 45 : 35,
        cellClick: (skillsMode === 'training') ? 
          (e, cell) => {
            e.stopPropagation();
            console.log('playerId: ' + cell.getData().id + ', ' + cell.getField());
          } : '',
      }
      const baseColumns1 = [
        {rowHandle:true, formatter: 'handle', headerSort:false, frozen:true, width:30},
        {title: 'C', headerTooltip: 'Country',field: 'country_info.title', tooltip: true, formatter: nationFormatter, width: 33},
        {title: 'Name', headerTooltip: 'Name', field: 'name', formatter: statusFormatter, tooltip: true, align: 'left', headerSortStartingDir: 'asc', widthGrow: 10},
        {title: 'Age', headerTooltip: 'Age', field: 'age', tooltip: cell => cell.getData().age_long, formatter: denomFormatter, formatterParams: {type: 'age'}, sorter: ageSorter, width: 43},
        {title: 'Pos', headerTooltip: 'Position', field: 'position', width: 40},
      ];
      const baseColumns2 = [
        {title: 'Fit', headerTooltip: 'Fitness', field: 'skills.Fit', formatter: denomFormatter, width: 35},
        {title: 'Ex', headerTooltip: 'Experiance', field: 'experience', formatter: denomFormatter, width: 35},
        {title: 'Tx', headerTooltip: 'Team Experiance', field: 'experience_team', formatter: denomFormatter, width: 35},
        {title: 'Form', headerTooltip: 'Form', field: 'form_mid', align: 'left', formatter: denomFormatter, formatterParams: {type: 'form'}, width: 60},
      ];
      const baseColumns3 = [
        {title: 'R', headerTooltip: 'Rating', field: 'current_rating', formatter: denomFormatter, formatterParams: {type: 'rating'}, width: 28},
        {title: 'P', headerTooltip: 'Potential', field: 'rating', formatter: denomFormatter, formatterParams: {type: 'rating'}, width: 28},
        {title: 'F', headerTooltip: 'Foot', field: 'foot', width: 28},
      ];
      const outfieldersSkills = [
        {title: 'SC', headerTooltip: 'Score', field: 'SC'},
        {title: 'OP', headerTooltip: 'Offencive Position', field: 'OP'},
        {title: 'BC', headerTooltip: 'Ball Control', field: 'BC'},
        {title: 'PA', headerTooltip: 'Passes', field: 'PA'},
        {title: 'AE', headerTooltip: 'Aerial', field: 'AE'},
        {title: 'CO', headerTooltip: 'Constitution', field: 'CO'},
        {title: 'TA', headerTooltip: 'Tackles', field: 'TA'},
        {title: 'DP', headerTooltip: 'Defence Position', field: 'DP'},
      ];
      const goalkeepersSkills = [
        {title: 'RE', headerTooltip: 'Reflexes', field: 'RE'},
        {title: 'GP', headerTooltip: 'Goalkeeper Position', field: 'GP'},
        {title: 'IN', headerTooltip: 'Interceptions', field: 'IN'},
        {title: 'CT', headerTooltip: 'Control', field: 'CT'},
        {title: 'OR', headerTooltip: 'Organisation', field: 'OR'},
        {title: 'CO', headerTooltip: 'Constitution', field: 'CO'},
      ];
      const baseColumns = skillsMode === 'training' ?
        [...baseColumns1, ...baseColumns3] :
        [...baseColumns1, ...baseColumns2, ...baseColumns3];
      const skillsColumns = (filter === 'goalkeepers' ? goalkeepersSkills : outfieldersSkills);
      return [
        ...baseColumns.map(columnSettings => ({...baseColumnSettings, ...columnSettings})),
        ...skillsColumns.map(columnSettings => ({...skillsColumnSettings, ...columnSettings})),
      ];
    };
    const denomFormatter = (cell, {type, value = cell.getValue()}) => {
      let className = '';
      let arrow = '';
      if (type === 'age') {
        className = (value < 22) ?
          'denom5' :
          (value < 25) ?
            'denom6' :
            (value < 28) ?
              'denom7' :
              (value < 30) ?
                'denom8' :
                (value < 33) ?
                  'denom3' :
                  (value < 35) ?
                    'denom2' :
                    'denom1';
      } else if (type === 'rating') {
        className = (value === 1) ?
        'denom1' :
        (value === 2) ?
          'denom2':
          (value === 3) ?
            'denom3':
            (value === 4) ?
              'denom4':
              (value === 5) ?
                'denom5':
                (value === 6) ?
                  'denom6':
                  (value === 7) ?
                    'denom7':
                    (value === 8) ?
                      'denom8':
                      'denom9';
      } else if (type === 'short') {
        className = (value === 'awf') ?
        'denom1' :
        (value === 'poor') ?
          'denom2':
          (value === 'weak') ?
            'denom3':
            (value === 'dec') ?
              'denom4':
              (value === 'good') ?
                'denom5':
                (value === 'exe') ?
                  'denom6':
                  (value === 'sup') ?
                    'denom7':
                    (value === 'bri') ?
                      'denom8':
                      'denom9';
      } else  {
        className = (value < 15) ?
          'denom1' :
          (value < 30) ?
            'denom2':
            (value < 40) ?
              'denom3':
              (value < 50) ?
                'denom4':
                (value < 60) ?
                  'denom5':
                  (value < 70) ?
                    'denom6':
                    (value < 80) ?
                      'denom7':
                      (value < 90) ?
                        'denom8':
                        'denom9';
      }
      if (type === 'form') {
        value = (value === 15) ?
        'awf' :
        (value === 25) ?
          'poor':
          (value === 35) ?
            'weak':
            (value === 45) ?
              'dec':
              (value === 55) ?
                'good':
                (value === 65) ?
                  'exe':
                  (value === 75) ?
                    'sup':
                    (value === 85) ?
                      'bri':
                      (value === 95) ?
                      'awe':
                      value;
        arrow = cell.getData().form_rising ?
          '<div class="arrow-up"></div>' :
          '<div class="arrow-down"></div>';
      }
      return `<span class="${className}">${value}${arrow}</span>`;
    };
    const statusFormatter = (cell) => {
      const value = cell.getValue();
      const data = cell.getData();
      return `
        <div class="name-container">
          <span class="player-name">${value}</span>
          ${ReactDOMServer.renderToString(<StatusIcons {...data} />)}
        </div>`;
    };
    const nationFormatter = (cell) => {
      const {nation_id, url} = cell.getData().country_info;
      return `<a href="https://tacticalfootball.com/nations/${nation_id}/clubs" target="_blank"><img class="flag" src="https://tacticalfootball.com/${url}"></a>`;
    };
    const skillsFormatter = (cell) => {
      const data = cell.getData();
      const skill = cell.getField();
      const value = (skillsMode === 'current') ?
        data.skills[skill] :
        (skillsMode === 'potential') ?
          data.potentials[skill] :
          (skillsMode === 'match') ?
            Math.round(data.skills_match.with_fitness[skill] * 10) / 10 :
            (skillsMode === 'combined') ?
              {current: data.skills[skill], potential: data.potentials[skill]}:
              (skillsMode === 'training') ?
                {
                  current: data.skills[skill],
                  potential: data.potentials[skill],
                  age: data.skills_age ? data.skills_age[skill] : '',
                  train: data.skills_train ? data.skills_train[skill] : false,
                }:
                null;
      const formatedValue = (skillsMode === 'combined') ?
        ReactDOMServer.renderToString(<CombinedSkill value={value} denomFormatter={denomFormatter} />) :
        (skillsMode === 'training') ?
          ReactDOMServer.renderToString(<CombinedSkill value={value} denomFormatter={denomFormatter} />) :
          denomFormatter(null, {value});
      return formatedValue;
    };
    const ageSorter = (a, b, aRow, bRow, column, dir, sorterParams) => {
      const aAge = a + aRow.getData().age_long.split(/years|month/)[1]/12;
      const bAge = b + bRow.getData().age_long.split(/years|month/)[1]/12;
      return aAge - bAge;
    };
    const skillsSorter = (a, b, aRow, bRow, column, dir, sorterParams) => {
      const {sortByPotential, skillsMode} = sorterParams;
      const aData = aRow.getData();
      const bData = bRow.getData();
      const skill = column.getField();
      const sortResult = (skillsMode === 'current' || (['combined','training'].includes(skillsMode) && !sortByPotential)) ?
        aData.skills[skill] - bData.skills[skill] :
          (skillsMode === 'potential' || (['combined', 'training'].includes(skillsMode) && sortByPotential)) ?
          aData.potentials[skill] - bData.potentials[skill] :
            (skillsMode === 'match') ?
            aData.skills_match.with_fitness[skill] - bData.skills_match.with_fitness[skill] :
              null;
      return sortResult;
    };
    if ( skillsMode === state.skillsMode && sortByPotential === state.sortByPotential ) {
      return null;
    }
    return {
      columns: getColumns(),
      players: getPlayers(),
      skillsMode,
      sortByPotential,
    };
  };

  render() {
    const {columns, players} = this.state;
    return (
      <ReactTabulator
        columns={columns}
        data={players}
        options={{
          layout: 'fitColumns',
          movableRows: true,
          columnMinWidth: 25,
          pagination: 'local',
          paginationSize: 15,
          paginationSizeSelector: [5, 10, 15, 20, 25, 50, 100],
          selectable: true,
          resizableColumns: false,
          sortOrderReverse: false,
          persistenceMode: 'local',
        }}
      />
    );
  };
};

export default withRouter(PlayersTable);
