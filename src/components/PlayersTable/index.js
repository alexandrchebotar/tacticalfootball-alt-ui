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

  // experianceFormatter(cell) {
  //   const row = cell.getData();
  //   let {experience, experience_team: teamExperience} = row;
  //   experience = this.denomFormatter(null, {value: experience});
  //   teamExperience = this.denomFormatter(null, {value: teamExperience});
  //   return `${teamExperience} / ${experience}`;
  // };

  render() {
    const {denomFormatter, props: {filter}} = this;
    return (
      <ReactTabulator
        columns={[
          {rowHandle:true, formatter:"handle", headerSort:false, resizable:false, frozen:true, width:30},
          {field:"flag", headerSort: false, resizable:false, formatter:"image", formatterParams:{width:"24px",height:"16px"}, tooltip: (cell) => cell.getData().nation, width: 33},
          {title:"Name", headerTooltip: true, field:"name", widthGrow:10},
          {title:"Age", headerTooltip: "Age", field:"age", formatter:denomFormatter, formatterParams:{type:"age"}, width: 43},
          {title:"Pos", headerTooltip:"Position", field:"position", width: 45},
          {title:"Fit", headerTooltip:"Fitness", field:"Fit", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"Ex", headerTooltip:"Experiance", field:"experience", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"Tx", headerTooltip:"Team Experiance", field:"experience_team", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"Form", headerTooltip:"Form", field:"form", formatter:denomFormatter, headerSortStartingDir:"desc",  formatterParams:{type:"form"}, width: 65},
          {title:"R", headerTooltip:"Rating", field:"rating", formatter:denomFormatter, headerSortStartingDir:"desc",  formatterParams:{type:"rating"}, width:28},
          {title:"P", headerTooltip:"Potential", field:"potential", formatter:denomFormatter, headerSortStartingDir:"desc",  formatterParams:{type:"rating"}, width:28},
          {title:"SC", headerTooltip:"Score", field:"SC", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"OP", headerTooltip:"Offencive Position", field:"OP", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"BC", headerTooltip:"Ball Control", field:"BC", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"PA", headerTooltip:"Passes", field:"PA", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"AE", headerTooltip:"Aerial", field:"AE", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"CO", headerTooltip:"Constitution", field:"CO", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35},
          {title:"TA", headerTooltip:"Tackles", field:"TA", formatter:denomFormatter, headerSortStartingDir:"desc",  width: 35, align: "center"},
          {title:"DP", headerTooltip:"Defence Position" ,field:"DP", formatter:denomFormatter, headerSortStartingDir:"desc", width: 35, align: "right"},
        ]}
        data={this.getfilteredPlayers(filter)}
        options={{
          // height:  500,
          layout: "fitColumns",
          movableRows: true,
          columnMinWidth: 25,
          pagination:"local",
          paginationSize: 15,
          paginationSizeSelector:[5, 10, 15, 20, 25, 50, 100],
          // sortOrderReverse: true,
          selectable: true,
        }}
      />
    );
  };
};

export default PlayersTable;
