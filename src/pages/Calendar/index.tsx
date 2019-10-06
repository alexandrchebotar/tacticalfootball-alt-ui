import React, {FunctionComponent, Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import { connect } from 'react-redux';
import {Callout, Tag} from '@blueprintjs/core';
// import {markNewsOpened} from '../../store/actions';
import MatchPreview from '../../components/MatchPreview';

import './style.scss';

interface CalendarProps {
  clubId: number,
  clubName: string,
  matches: Array<{
    away_info: {
      club_id: number,
      club_name: string,
      goals: number|null,
      match_info: null|{
        match_id: number,
        team_id: number|null,
        club_id?: number,
      },
      show_create: boolean,
      show_pending_button: boolean,
      show_visit: boolean,
      team_id: number|null,
    },
    competition: string,
    date: string,
    formatted_date: string,
    home_info: {
      club_id: number,
      club_name: string,
      goals: number|null,
      match_info: null|{
        match_id: number,
        team_id: number|null,
        club_id?: number,
      },
      show_create: boolean,
      show_pending_button: boolean,
      show_visit: boolean,
      team_id: number|null,
    },
    id: number,
    match_subscript: any,
    pending: boolean,
    played: boolean,
  }>,
};

const mapStateToProps = ({currentClub: {id, name, matches}}: any) => {
  return {clubId: id, clubName: name, matches};
};



const Calendar: FunctionComponent<CalendarProps> = ({clubName, matches}) => {

  const prevMatchesList = matches.filter(({played}) => played).map(match => {
    return <MatchPreview short {...match} key={match.id} />;
  });
  const nextMatchesList = matches.filter(({played}) => !played).map(match => {
    return <MatchPreview short {...match} key={match.id} />;
  });

  const weeklyEvents = [
    {
      day: 'Sunday',
      events: [
        {
          time: '13:00',
          event: 'Super League matches'
        },
        {
          time: '13:05',
          event: 'Premiership matches'
        },
        {
          time: '13:15',
          event: 'Division 1 matches'
        },
        {
          time: '13:30',
          event: 'Division 2 matches'
        },
        {
          time: '14:00',
          event: 'Division 3 matches'
        },
      ],
    },
    {
      day: 'Monday',
      events: [
        {
          time: '06:00',
          event: 'Finances'
        },
        {
          time: '08:00',
          event: 'Scouting'
        },
        {
          time: '10:00',
          event: 'Training'
        },
      ],
    },
    {
      day: 'Tuesday',
      events: [
        {
          time: '10:00',
          event: 'Training'
        },
      ],
    },
    {
      day: 'Wednesday',
      events: [
        {
          time: '18:30',
          event: 'Supar League matches'
        },
        {
          time: '18:40',
          event: 'Premiership matches'
        },
        {
          time: '18:50',
          event: 'Division 1 matches'
        },
        {
          time: '19:00',
          event: 'Division 2 matches'
        },
        {
          time: '19:30',
          event: 'Division 3 matches'
        },
      ],
    },
    {
      day: 'Thursday',
      events: [
        {
          time: '08:00',
          event: 'Scouting'
        },
        {
          time: '10:00',
          event: 'Training'
        },
      ],
    },
    {
      day: 'Friday',
      events: [
        {
          time: '10:00',
          event: 'Training'
        },
      ],
    },
    {
      day: 'Saturday',
      events: [
        {
          time: '13:00',
          event: 'International Cup matches'
        },
        {
          time: '16:00',
          event: 'Shadow Cup matches'
        },
      ],
    },
  ];

  const weeklyShedule = () => {
    return weeklyEvents.map(({day, events}, index) => (
      <div className={'daily-schedule'} key={index} >
        <div className="daily-schedule-header" >
          <Tag
            intent={
              ((new Date()).getDay() < index) ?
                'primary':
                ((new Date()).getDay() > index) ?
                  'success':
                  'warning'
            } 
            minimal
          >
            {day}
          </Tag>
        </div>
        <Callout className="daily-schedule-events">
          {events.map(({time, event}, index) => (
            <div className="daily-schedule-event-name" key={index} >
              {event}
              <div className="daily-schedule-event-time" >
                {time}
              </div>
            </div>
          ))}
        </Callout>
      </div>
    ));
  }; 

  return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Calendar</title>
        </Helmet>
        <div className="calendar" >
          <div className="calendar-filter" >
            Here will be CalendarFilter
            Dropdown menu: show matches: all, officials, friendlies, single tournament, unset lineup;
            Switch: show results
          </div>
          <div className="club-matches" >
            <div className="previous-matches">
              <h3>Previous Matches:</h3>
              {prevMatchesList}
            </div>
            <div className="next-matches">
              <h3>Next Matches:</h3>
              {nextMatchesList}
            </div>
          </div>
          <div className="weekly-schedule" >
            <h3>Weekly Schedule:</h3>
            {weeklyShedule()}
          </div> 
        </div> 
      </Fragment>
    );
};

// export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
export default connect(mapStateToProps)(Calendar);
