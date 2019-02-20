/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    console.log('constructor');
  }

  // componentDidMount() {
  //   console.log('Didmount');
  //   this.setState({
  //   });
  // }

  eventChangeHandler = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { error, label, options, ...rest } = this.props;
    const errorStyle = (error) ? style.error : {};
    const { value } = this.state;
    console.log('render>>>', value);
    if (!options) return '';
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
        {
          options.map(response => (
            // eslint-disable-next-line jsx-a11y/label-has-for
            <label onClick={this.eventChangeHandler}>
              <input
                type="radio"
                {...rest}
                key={response.value}
                name="Sports"
                value={response.label}
                style={{ ...style.base, ...errorStyle }}
              />
              {response.value}
            </label>
          ))
        }
        {(error) ? <info style={{ color: 'red', fontSize: '14px' }}>{error}</info> : ''}
      </>
    );
  }
}
TextField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf,
};
TextField.defaultProps = {
  error: '',
  label: 'Please Select',
  options: [],
  // value: '',
  // onChange: () => {},
};
export default TextField;
