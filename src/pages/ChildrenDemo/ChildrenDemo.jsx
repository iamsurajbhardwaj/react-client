import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Math } from '../../components';
import { mainStyle } from '../../configs';

class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ });
  }

  render() {
    return (
      <div style={mainStyle}>
        <Math first={5} second={0} operator="/">
          {
            // eslint-disable-next-line react/jsx-one-expression-per-line
            (first, second, operator, result) => <p>{first} {operator} {second} is {result}</p>
          }
        </Math>
        <Typography>
          <Math first={5} second={10} operator="+">
            {
            // eslint-disable-next-line react/jsx-one-expression-per-line
              (first, second, operator, result) => <p>Sum of {first} and {second} is {result}</p>
            }
          </Math>
        </Typography>
        <Math first={5} second={10} operator="-">
          {
            (first, second, operator, result) => (
              // eslint-disable-next-line react/jsx-one-expression-per-line
              <p>When we subtract {second} from {first} then we will get {result} as result.</p>
            )
          }
        </Math>
        <Math first={5} second={10} operator="*">
          {
            // eslint-disable-next-line react/jsx-one-expression-per-line
            (first, second, operator, result) => <p>{first} {operator} {second} is {result}</p>
          }
        </Math>
        <Math first={5} second={10} operator="/">
          {
            // eslint-disable-next-line react/jsx-one-expression-per-line
            (first, second, operator, result) => <p>{first} {operator} {second} is {result}</p>
          }
        </Math>
      </div>
    );
  }
}

export default ChildrenDemo;
