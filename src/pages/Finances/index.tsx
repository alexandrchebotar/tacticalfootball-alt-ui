import React, {FunctionComponent, Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import { connect } from 'react-redux';
import {Callout, Tag} from '@blueprintjs/core';
import FinanceReport from './FinanceReport';

import './style.scss';

interface Transaction {
  club_id: number,
  created_at: string,
  description: string,
  id: number,
  season_id: number,
  updated_at: string,
  value: number,
  week: number,
};
interface FinancesProps {
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
interface PlayerBid {description: string, value: number};


const mapStateToProps = ({currentClub: {id, name, finances}}: any) => {
  return {clubId: id, clubName: name, finances};
};


const Finances: FunctionComponent<FinancesProps> = ({clubName, finances: {
  bank_balance,
  frozen_cash,
  value,
  weekly_finances: {match_income, sponsors, total, wage},
  transactions,
}}) => {

  // TODO: move finances data transformation to thunk or API 

  let freezeTransactions: Array<PlayerBid> = [];
  let releaseTransactions: Array<PlayerBid> = [];
  const allTransactions = transactions[0].list.concat(transactions[1].list);
  allTransactions.forEach(({description, value}: Transaction) => {
    if (description.includes('Freeze cash')) {
      freezeTransactions.push({
        description: description.replace('Freeze cash for bid on ', ''),
        value: - value,
      });
    } else if (description.includes('Release frozen cash')) {
      releaseTransactions.push({
        description: description.replace('Release frozen cash from bid on  ', ''),
        value,
      });
    }
  });
  freezeTransactions.filter(({description, value}) => {
    const index = releaseTransactions.findIndex(({description: desc, value: val}) => description === desc && value === val);
    if (index + 1) {
      releaseTransactions.splice(index, 1);
      return false;
    }
    return true;
  });
  const thisWeakTransactions = transactions[0].list.filter(({description}) => !/Release frozen cash|Freeze cash/.test(description));
  const lastWeakTransactions = transactions[1].list.filter(({description}) => !/Release frozen cash|Freeze cash/.test(description));

  return (
      <Fragment>
        <Helmet>
          <title>{clubName} - Finances</title>
        </Helmet>
        <div className="finances-summary" >
          <FinanceReport 
            title="Summary"
            items={[
              {description: 'Team Value', value: value},
              {description: 'Bank Balance', value: bank_balance},
              {description: 'Frozen Cash', value: frozen_cash},
            ]} 
          />
          <FinanceReport 
            title="Weekly Finances"
            items={[
              {description: 'Sponsorship', value: sponsors},
              {description: 'Gate Receipts', value: match_income},
              {description: 'Wage Bill', value: -wage},
            ]} 
            getTotal
          />
          <FinanceReport title="Frozen Cash" items={freezeTransactions.sort(({value: a}, {value: b}) => b - a)} getTotal />
        </div>
        <div className="finances-transactions" >
          <FinanceReport title="This Weak Transaction" items={thisWeakTransactions} getTotal />
          <FinanceReport title="Last Weak Transactions" items={lastWeakTransactions} getTotal />
        </div>
        <div className="clear"></div>
        
      </Fragment>
    );
};

export default connect(mapStateToProps)(Finances);
