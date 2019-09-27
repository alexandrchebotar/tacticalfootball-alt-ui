import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  NumericInput,
  HTMLSelect,
  HTMLTable,
} from "@blueprintjs/core";
import {clearSearch, searchPlayers} from '../../store/actions';

import './style.scss';

const denoms = ['', 'awf', 'poor', 'weak', 'dec', 'good', 'exe', 'sup', 'bri', 'awe'];
const mapStateToProps = ({search: {filter}}) => {
  return {filter};
};
const mapDispatchToProps = dispatch => {
  return {
    searchPlayers: (filter) => dispatch(searchPlayers(filter)),
    clearSearch: () => dispatch(clearSearch()),
  }
};

class SearchFilter extends Component {
  state = {
    filter: {},
  };

  render() {
    return (
      <Fragment>
        <HTMLTable>
          <thead>
            <tr>
              <th>Set min/max</th>
              <th>Value</th>
              <th>Age</th>
              <th>Rating</th>
              <th>Potential</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Minimum</td>
              <td>
                <NumericInput stepSize={100000} majorStepSize={1000000} min={0} placeholder="Min value" leftIcon="dollar" allowNumericCharactersOnly />
              </td>
              <td>
                <NumericInput min={21} max={40} placeholder="Min age" allowNumericCharactersOnly />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
            </tr>
            <tr>
              <td>Maximum</td>
              <td>
                <NumericInput stepSize={100000} majorStepSize={1000000} min={0} placeholder="Max value" leftIcon="dollar" allowNumericCharactersOnly />
              </td>
              <td>
                <NumericInput min={21} max={40} placeholder="Max age" allowNumericCharactersOnly />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
            </tr>
          </tbody>
        </HTMLTable>

        <HTMLTable condensed>
          <thead>
            <tr>
              <th>Set minimal</th>
              <th>SC</th>
              <th>OP</th>
              <th>BC</th>
              <th>PA</th>
              <th>AE</th>
              <th>CO</th>
              <th>TA</th>
              <th>DP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current</td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
            </tr>
            <tr>
              <td>Potential</td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
              <td>
                <HTMLSelect options={denoms} minimal />
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </Fragment>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
