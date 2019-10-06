import React, {FunctionComponent} from 'react';
import {Tag, Callout} from '@blueprintjs/core';

import './style.scss';

interface MatchPreviewProps {
    short?: boolean,
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
};


const MatchPreview: FunctionComponent<MatchPreviewProps> = (props) => {
  const {short, date, competition, home_info, away_info, played, pending} = props;
  return (
    <div className={'match-preview' + (short ? '-short' : '')} >
      <div className="match-preview-header" >
        {competition} | {date.slice(0, -3)} | {
          (played) ?
          <Tag intent="success" minimal={true}>finished</Tag> :
          (pending) ?
            <Tag intent="danger" minimal>playing now</Tag> :
            (away_info.match_info && away_info.match_info.team_id) ?
              <Tag intent="primary" minimal>lineup set</Tag> :
              <Tag intent="warning" minimal>sheduled</Tag>
        }
      </div>
      <Callout className="match-preview-body">
        <div className="match-preview-home" >
          {home_info.club_name}
          <div className="match-preview-score" >
            {(played) ?
              home_info.goals :
              (!home_info.show_create) ?
                '' :
                (home_info.match_info && home_info.match_info.team_id) ?
                  'change lineup' :
                  'create lineup'
            }
          </div>
        </div>
        <div className="match-preview-away" >
          {away_info.club_name}
          <div className="match-preview-score" >
            {(played) ?
              away_info.goals :
              (!away_info.match_info) ?
                '' :
                (away_info.match_info && away_info.match_info.team_id) ?
                  'edit lineup' :
                  'create lineup'
              }
          </div>
        </div>
      </Callout>
    </div>
  );
};

export default MatchPreview;
