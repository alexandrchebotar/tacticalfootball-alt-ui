import React, {Component} from 'react';
import { ReactTabulator } from 'react-tabulator';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import './style.scss';

class PlayersTable extends Component {

  getfilteredPlayers(filter) {
    return (filter === 'forwards') ?
      this.props.data.filter(({position}) => ['ST','FW'].includes(position)) :
      (filter === 'midlefielders') ?
        this.props.data.filter(({position}) => ['LW','OM','RW','LM','CM','RM','LWB','DM','RWB'].includes(position)) :
        (filter === 'defenders') ?
          this.props.data.filter(({position}) => position === 'CB') :
          (filter === 'outfielders') ?
            this.props.data.filter(({position}) => position !== 'GK') :
            (filter === 'goalkeepers') ?
              this.props.data.filter(({position}) => position === 'GK') :
                this.props.data;
  };

  denomFormatter(cell, {type, value = cell.getValue()}) {
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
      const form_rising = cell.getData().form_rising;
      arrow = form_rising ?
        '<div class="arrow-up"></div>' :
        '<div class="arrow-down"></div>';
    }
    return `<span class="${className}">${value}${arrow}</span>`;
  };

  nationFormatter(cell) {
    const {nation_id, url} = cell.getData().country_info;
    return `<a href="https://tacticalfootball.com/nations/${nation_id}/clubs" target="_blank"><img class="flag" src="https://tacticalfootball.com/${url}"></a>`;
  };

  render() {
    const {nationFormatter, denomFormatter, props: {filter}} = this;
    const baseColumnSettings = {
      align: 'center',
      headerSortStartingDir: 'desc',
    }
    const skillsColumnSettings = {
      formatter: denomFormatter,
      width: 35,
    }
    const commonColumns = [
      {rowHandle:true, formatter: 'handle', headerSort:false, frozen:true, width:30},
      {title: 'N', headerTooltip: 'Nation',field: 'country_info.title', formatter: nationFormatter, tooltip: true, width: 33},
      {title: 'Name', headerTooltip: 'Name', field: 'name', align: 'left', headerSortStartingDir: 'asc', widthGrow: 10},
      {title: 'Age', headerTooltip: 'Age', field: 'age', formatter: denomFormatter, formatterParams: {type: 'age'}, width: 43},
      {title: 'Pos', headerTooltip: 'Position', field: 'position', width: 40},
      {title: 'Fit', headerTooltip: 'Fitness', field: 'skills.Fit', formatter: denomFormatter, width: 35},
      {title: 'Ex', headerTooltip: 'Experiance', field: 'experience', formatter: denomFormatter, width: 35},
      {title: 'Tx', headerTooltip: 'Team Experiance', field: 'experience_team', formatter: denomFormatter, width: 35},
      {title: 'Form', headerTooltip: 'Form', field: 'form_mid', align: 'left', formatter: denomFormatter, formatterParams: {type: 'form'}, width: 65},
      {title: 'R', headerTooltip: 'Rating', field: 'current_rating', formatter: denomFormatter, formatterParams: {type: 'rating'}, width: 28},
      {title: 'P', headerTooltip: 'Potential', field: 'rating', formatter: denomFormatter, formatterParams: {type: 'rating'}, width: 28},
    ];
    const outfieldersSkills = [
      {title: 'SC', headerTooltip: 'Score', field: 'skills.SC'},
      {title: 'OP', headerTooltip: 'Offencive Position', field: 'skills.OP'},
      {title: 'BC', headerTooltip: 'Ball Control', field: 'skills.BC'},
      {title: 'PA', headerTooltip: 'Passes', field: 'skills.PA'},
      {title: 'AE', headerTooltip: 'Aerial', field: 'skills.AE'},
      {title: 'CO', headerTooltip: 'Constitution', field: 'skills.CO'},
      {title: 'TA', headerTooltip: 'Tackles', field: 'skills.TA'},
      {title: 'DP', headerTooltip: 'Defence Position', field: 'skills.DP'},
    ];
    const goalkeepersSkills = [
      {title: 'RE', headerTooltip: 'Reflexes', field: 'skills.RE'},
      {title: 'GP', headerTooltip: 'Offencive Position', field: 'skills.GP'},
      {title: 'IN', headerTooltip: 'Ball Control', field: 'skills.IN'},
      {title: 'CT', headerTooltip: 'Passes', field: 'skills.CT'},
      {title: 'OR', headerTooltip: 'Aerial', field: 'skills.OR'},
      {title: 'CO', headerTooltip: 'Constitution', field: 'skills.CO'},
    ];
    const skillsColumns = filter === 'goalkeepers' ? goalkeepersSkills : outfieldersSkills;
    const columns = [
      ...commonColumns,
      ...skillsColumns.map(columnSettings => ({...skillsColumnSettings, ...columnSettings}))
    ].map(columnSettings => ({...baseColumnSettings, ...columnSettings}));

    return (
      <ReactTabulator
        columns={columns}
        data={this.getfilteredPlayers(filter)}
        options={{
          layout: "fitColumns",
          movableRows: true,
          columnMinWidth: 25,
          pagination:"local",
          paginationSize: 15,
          paginationSizeSelector:[5, 10, 15, 20, 25, 50, 100],
          selectable: true,
          resizableColumns: false,
        }}
      />
    );
  };
};

export default PlayersTable;
