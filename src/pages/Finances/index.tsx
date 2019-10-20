import React, {FunctionComponent, Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import { connect } from 'react-redux';
import FinanceReport from './FinanceReport';
import {Transaction, FinanseReportItem, FinancesProps} from '../../types';

import './style.scss';

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

  let freezeTransactions: Array<FinanseReportItem> = [];
  let releaseTransactions: Array<FinanseReportItem> = [];
  const allTransactions = transactions[0].list.concat(transactions[1].list);
  allTransactions.forEach(({description, value}: Transaction) => {
    if (description.includes('Freeze cash')) {
      freezeTransactions.push({
        description: description.replace('Freeze cash for bid on ', ''),
        value: - value,
      });
    } else if (description.includes('Release frozen cash')) {
      releaseTransactions.push({
        description: description.replace('Release frozen cash from bid on ', ''),
        value,
      });
    }
  });
  freezeTransactions = freezeTransactions.filter(({description, value}) => {
    const index = releaseTransactions.findIndex(({description: desc, value: val}) => description === desc && value === val);
    if (index + 1) {
      releaseTransactions.splice(index, 1);
      return false;
    }
    return true;
  });
  const getFormatedTransactions = (transactions: Array<FinanseReportItem>)  => {
    return transactions
      .filter(({description}) => !/Release frozen cash|Freeze cash/.test(description))
      .map(({description, value}) => ({
        description: description.replace(/(<a|Super League|Premiership|Division|International Cup|Shadow Cup).*a>/, ''),
        value
      }));
  }
  const thisWeakTransactions = getFormatedTransactions(transactions[0].list);
  const lastWeakTransactions = getFormatedTransactions(transactions[1].list);

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
          <FinanceReport title="Frozen Cash (Bids)" items={freezeTransactions.sort(({value: a}, {value: b}) => b - a)} getTotal />
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
