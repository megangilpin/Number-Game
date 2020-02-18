import React, {Component} from 'react';
import propTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      remainingSeconds: this.props.initialSeconds,
    };
  }

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(() =>
    Math.floor(Math.random() * 10),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectedNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };
  shouldComponetUdpate(nextState) {
    return (
      nextState.selectedIds !== this.state.selectedIds ||
      this.state.remainingSeconds === 0
    );
  }
  // gameStatus: PLAYING, WON, LOST
  calcGameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (this.state.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.calcGameStatus();
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        </View>
        <Text>{this.state.remainingSeconds}</Text>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((ranNum, index) =>
            <RandomNumber
              key={index}
              id={index}
              number={ranNum}
              onPress={this.selectedNumber}
              isDisabled={this.isSelected(index) || gameStatus != 'PLAYING'}
            />
          )}
          {/* To do suffle the random numbers */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  randomNumberContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
