import React, {FunctionComponent} from 'react';

import './style.scss';

interface FinanceReportProps {
  items: Array<{description: string, value: number}>,
  title: string,
  getTotal?: boolean;
};

const FinanceReport: FunctionComponent<FinanceReportProps> = ({items, title, getTotal}) => {

  return (
    <div className="finance-report" >
      <h3>{title}:</h3>
      {
        items.map(({description, value}) => (
          <div className="finance-report-item" key={description} >
            {description}
            <div className="finance-report-item-value" >
              {value}
            </div>
          </div>
        ))
      }
      {getTotal &&
        <div className="finance-report-item total" >
          Total
          <div className="finance-report-item-value total" >
            {items.reduce((sum, {value}) => sum + value, 0)}
          </div>
        </div>
      }
    </div>
  );
};

export default FinanceReport;
