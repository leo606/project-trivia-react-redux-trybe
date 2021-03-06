import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Timer.css';
import { decreaseTime, stopTime } from '../redux/actions';

const ONE_SECOND = 1000;
const intervals = [];

class Timer extends React.Component {
  constructor() {
    super();
    this.updateTheTime = this.updateTheTime.bind(this);
  }

  componentDidMount() {
    const interval = setInterval(this.updateTheTime, ONE_SECOND);
    intervals.push(interval);
  }

  componentDidUpdate(prevProps) {
    const { isToStopTime } = this.props;
    if (prevProps.isToStopTime !== isToStopTime) {
      const interval = setInterval(this.updateTheTime, ONE_SECOND);
      intervals.push(interval);
    }
  }

  updateTheTime() {
    const { currentTime, isToStopTime, descrease, stop } = this.props;
    if (currentTime === 0 || isToStopTime) {
      stop();
      intervals.forEach(clearInterval);
    } else {
      descrease();
    }
  }

  timerClassName(currentTime) {
    const ten = 10;
    if (currentTime > ten) {
      const className = currentTime % 2 === 0 ? 'timer timer-even' : 'timer timer-odd';
      return className;
    }
    const className = currentTime % 2 === 0
      ? 'timer timer-ten-sec-even'
      : 'timer timer-ten-sec-odd';
    return className;
  }

  render() {
    const { currentTime } = this.props;

    return (
      <div className={ this.timerClassName(currentTime) }>
        {`Tempo Restante: ${currentTime}`}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    descrease: () => dispatch(decreaseTime()),
    stop: () => dispatch(stopTime()),
  }
);

const mapStateToProps = (state) => (
  {
    currentTime: state.game.time,
    isToStopTime: state.game.stopTime,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  currentTime: PropTypes.number.isRequired,
  isToStopTime: PropTypes.bool.isRequired,
  descrease: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};
