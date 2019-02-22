import React from 'react';
import PropTypes from 'prop-types';
import buttonStyle from './style';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { value, disabled, style } = this.props;
    return (
      <div style={{ textAlign: 'right' }}>
        <input type="button" style={{ ...buttonStyle.main, ...style }} value={value} disabled={disabled} />
      </div>
    );
  }
}
Button.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};
Button.defaultProps = {
  disabled: false,
  style: {},
};
export default Button;
