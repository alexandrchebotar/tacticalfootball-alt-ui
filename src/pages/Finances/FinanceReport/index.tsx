import React, {FunctionComponent} from 'react';
import {FinanceReportProps} from '../../../types';

import './style.scss';

const FinanceReport: FunctionComponent<FinanceReportProps> = ({items, title, getTotal}) => {
  const total = items.reduce((sum, {value}) => sum + value, 0);
  return (
    <div className="finance-report" >
      <h3>{title}:</h3>
      {
        items.map(({description, value}) => (
          <div className="finance-report-item" key={description} >
            {description}
            <div className={'finance-report-item-value' + ((value < 0) ? ' spending' : '')} >
              {value.toLocaleString()}
            </div>
          </div>
        ))

      } 
      {getTotal &&
        <div className="finance-report-item total" >
          Total
          <div className={'finance-report-item-value' + ((total < 0) ? ' spending' : '')} >
            {total.toLocaleString()}
          </div>
        </div>
      }
    </div>
  );
};

export default FinanceReport;
