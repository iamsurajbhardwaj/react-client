import React from 'react';
import PropTypes from 'prop-types';

class Math extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({});
  }

  operation = (first, second, operator) => {
    if (operator === '+') {
      return first + second;
    }
    if (operator === '-') {
      return first - second;
    }
    if (operator === '/') {
      if (second === 0) return 'Infinity';
      return first / second;
    }
    if (operator === '*') {
      return first * second;
    }
    return 'invalid operation';
  }

  render() {
    const { children, first, second, operator } = this.props;
    return (
      <div>
        Math Component
        {
          children(first, second, operator, this.operation(first, second, operator))
        }
      </div>
    );
  }
}

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.oneOf(['+', '-', '/', '*']),
  children: PropTypes.func,
};

Math.defaultProps = {
  children: () => {},
  operator: '',
};
export default Math;
