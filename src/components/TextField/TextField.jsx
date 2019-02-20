import React from 'react';
import propTypes from 'prop-types';
import textFieldStyle from './style';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    this.setState({
    });
  }

  eventChangeHandler = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { error, label, ...rest } = this.props;
    const errorStyle = (error) ? textFieldStyle.error : {};
    const { value } = this.state;
    return (
      <>
        {(label) ? (
          <div
            style={{
              fontWeight: 'bold', fontSize: '15px', paddingBottom: '20px', paddingTop: '20px',
            }}
          >
            {label}
          </div>
        ) : ''}
        <input type="text" {...rest} value={value} onChange={this.eventChangeHandler} style={{ ...textFieldStyle.base, ...errorStyle }} />
        {(error) ? <info style={{ color: 'red', fontSize: '14px' }}>{error}</info> : ''}
      </>
    );
  }
}
TextField.propTypes = {
  error: propTypes.string,
  label: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
TextField.defaultProps = {
  error: '',
  label: 'Please Enter',
  // value: '',
  // onChange: () => {},
};
export default TextField;
