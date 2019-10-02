import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import {
  // Tabs,
  // Tab,
  // Text,
  // HTMLSelect,
  // Checkbox,
  Button,
  Collapse,
} from '@blueprintjs/core';
import {markNewsOpened} from '../../store/actions';

import './style.scss';

interface HomeProps {
  clubId: number,
  clubName: string,
  logo: string,
  leagueInfo: {
    position_txt: string,
    name: string,
    id: number,
  },
  rankings: Array<{
    type: string,
    rank: number,
    rating: number,
    url: string,
  }>,
  streaks: [string],
  news: {
    msgs: Array<{
      id: number,
      club_id: number,
      date: string,
      opened: boolean,
      topic: string,
      body: string,
    }>,
    total: number,
  },
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
  markNewsOpened: (newsId: number) => void,
};

interface HomeState {
  openNews: Array<number>,
};

const mapStateToProps = ({currentClub: {id, name, logo, leagueInfo, rankings, streaks, news, matches}}: any) => {
  return {clubId: id, clubName: name, logo, leagueInfo, rankings, streaks, news, matches};
};

const mapDispatchToProps = (dispatch: any) => {
  return {    
    markNewsOpened: (newsId: number) => dispatch(markNewsOpened(newsId)),
  }
};

class Home extends Component<HomeProps> {
  state: HomeState = {
    openNews: [5246179, 5263443],
  };

  // componentDidMount() {
  //   this.props.getPlayers();
  // };
  // componentWillUnmount() {
  //   this.props.clearPlayers();
  // };

  toggleNews(newsId: number) {
    this.setState((state: HomeState) => {
      const index = state.openNews.indexOf(newsId);
      if (index === -1) {
        return {openNews: [...state.openNews, newsId]};
      } else {
        const openNews = [...state.openNews];
        openNews.splice(index, 1);
        return {openNews};
      }
    });
  };

  getNewsList = () => {
    const {msgs} = this.props.news;
    const {openNews} = this.state;
    return msgs.map(({id, date, opened, topic, body}) => (
      <Fragment key={id} >
        <Button 
          minimal
          icon="feed"
          intent={opened ? 'none' : 'warning'}
          onClick={() => {
            this.toggleNews(id);
            if (!opened) {
              this.props.markNewsOpened(id);
            }
          }}
        >
          {date} - {topic}
        </Button>
        <Collapse className="club-news-body" isOpen={openNews.includes(id)}>
          {body}
        </Collapse>
      </Fragment>
    ));
  };

  getMatchesList(matches: Array<any>) {
    return matches.map(({id, date, competition, home_info, away_info, played, pending}) => {
      return (played) ?
        <p key={id} >{date} - {competition} - {home_info.club_name} vs {away_info.club_name} - {home_info.goals} : {away_info.goals}</p> :
        (pending) ?
          <p key={id} >{date} - {competition} - {home_info.club_name} vs {away_info.club_name} - playing now</p> :
          <p key={id} >{date} - {competition} - {home_info.club_name} vs {away_info.club_name} - set tactics</p>
    });
  };

  getPrevMatches = () => {
    return this.getMatchesList(this.props.matches.filter(({played}) => played));
  };

  getNextMatches = () => {
    return this.getMatchesList(this.props.matches.filter(({played}) => !played));
  };

  render() {
    const {
    //   state: {activeTabId, skillsMode, sortByPotential},
      props: {clubName, logo, leagueInfo: {position_txt: position, name: leagueName, id: leagueId}, rankings, streaks},
      getNewsList,
      getPrevMatches,
      getNextMatches,
    //   handleSkillsModeChange,
    //   handleTabChange,
    //   setSortByPotential,
    } = this;
    return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Home</title>
        </Helmet>
        <div className="club-matches" >
          <div className="previous-matches">
            <h3>Previous Matches:</h3>
            {getPrevMatches()}
          </div>
          <div className="next-matches">
            <h3>Next Matches:</h3>
            {getNextMatches()}
          </div>
        </div>
        <div className="club-news" >
          <h3>News:</h3>
          {getNewsList()}
        </div> 
        <div className="club-info" >
          <img className="club-logo" src={'https://tacticalfootball.com' + logo} alt={clubName + ' logo'} ></img>
          <h2>{clubName}</h2>
          <p><b>League:</b></p>
          <p className="club-info-details" ><a target="_blank" rel="noopener noreferrer" href={`https://tacticalfootball.com/competitions/${leagueId}/overview`} >{leagueName}</a> ({position})</p>
          <p><b>Ranking:</b></p>
          {rankings.map(({type, rating, rank, url}, index) => (<p key={index} className="club-info-details" ><a target="_blank" rel="noopener noreferrer" href={'https://tacticalfootball.com/' + url} >{type}</a>{`: ${rating} (${rank})`}</p>))}
          <p><b>Streaks:</b></p>
          {streaks.map((streak, index) => (<p key={index} className="club-info-details" >{streak}</p>))}
        </div> 
      </Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
