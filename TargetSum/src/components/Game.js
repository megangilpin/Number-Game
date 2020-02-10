import React, {Component} from 'react';
import propTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

class Game extends Component {
  static propTypes = {
    randomNumberCount: propTypes.number.isRequired,
  };

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(() =>
    Math.floor(Math.random() * 10),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.target}>{this.target}</Text>
        </View>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((ranNum, index) =>
            <Text style={styles.randomNumber} key={index}>{ranNum}</Text>
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
  randomNumber: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 50,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
});

export default Game;
