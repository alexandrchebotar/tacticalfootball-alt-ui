import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { Button, Collapse} from '@blueprintjs/core';
import parse from 'html-react-parser'
import {markNewsOpened} from '../../store/actions';
import MatchPreview from '../../components/MatchPreview';
import {HomeProps, HomeState} from '../../types';

import './style.scss';

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
    openNews: [5233001],
  };

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
          className="newsHeader"
          icon="feed"
          intent={opened ? 'none' : 'warning'}
          onClick={() => {
            this.toggleNews(id);
            if (!opened) {
              this.props.markNewsOpened(id);
            }
          }}
        >
          <div className="newsDate">{date}</div>
          <div className="newsTopic">{topic}</div>
        </Button>
        <Collapse className="club-news-body" isOpen={openNews.includes(id)}>
          {parse(body)}
        </Collapse>
      </Fragment>
    ));
  };

  getMatchesList(matches: Array<any>) {
    return matches.map(match => {
      return <MatchPreview short {...match} key={match.id} />;
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
      props: {clubName, logo, leagueInfo: {position_txt: position, name: leagueName, id: leagueId}, rankings, streaks},
      getNewsList,
      getPrevMatches,
      getNextMatches,
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
