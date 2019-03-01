import React from 'react';
import PropTypes from 'prop-types';
import { getRandomNumber, getRoundRobinNumber } from '../../lib/utils/math';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { random, duration, banner } = this.props;
    const totalImage = banner.length;
    this.timerId = setInterval(() => {
      const { index } = this.state;
      this.setState({
        index: (random) ? (getRandomNumber(totalImage)) : (getRoundRobinNumber(index, totalImage)),
      });
    }, duration);
  }

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  }

  render() {
    const {
      altText,
      banner,
      random,
      defaultBanner,
      height,
      ...rest
    } = this.props;
    const { index } = this.state;
    const imagePath = banner ? banner[index] : defaultBanner;
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={imagePath} {...rest} alt={altText} height={height} />
      </div>
    );
  }
}

Slider.defaultProps = {
  altText: 'Default Banner',
  banner: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
Slider.propTypes = {
  altText: PropTypes.string,
  banner: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
export default Slider;
