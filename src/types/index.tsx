// pages-office-home

export interface HomeProps {
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

export interface HomeState {
  openNews: Array<number>,
};

// pages-office-finances

export interface Transaction {
  club_id: number,
  created_at: string,
  description: string,
  id: number,
  season_id: number,
  updated_at: string,
  value: number,
  week: number,
};
export interface FinancesProps {
  clubId: number,
  clubName: string,
  finances: {
    bank_balance: number,
    frozen_cash: number,
    value: number,
    weekly_finances: {
      match_income: number,
      sponsors: number,
      total: number,
      wage: number,
    },
    transactions: Array<{
      message: string,
      total: number,
      list: Array<Transaction>,      
    }>,
  },
};
export interface FinanseReportItem {description: string, value: number};
export interface FinanceReportProps {
  items: Array<FinanseReportItem>,
  title: string,
  getTotal?: boolean;
};

// pages-office-calendar

export interface CalendarProps {
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
