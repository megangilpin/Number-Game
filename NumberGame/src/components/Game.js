import React, {Component} from 'react';
import propTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber';

class Game extends Component {
  static propTypes = {
    randomNumberCount: propTypes.number.isRequired,
  };

  state = {
    selectedIds: [],
  };

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(() =>
    Math.floor(Math.random() * 10),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  selectedNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
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
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.target}>{this.target}</Text>
        </View>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((ranNum, index) =>
            <RandomNumber 
              key={index}
              id={index}
              number={ranNum}
              onPress={this.selectedNumber}
              isDisabled={this.isSelected(index)}
            />
          )}
          {/* To do suffle the random numbers */}
        </View>
          <Text>{gameStatus}</Text>
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
});

export default Game;
