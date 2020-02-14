import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class RandomNumber extends Component {
  static propTypes = {
    number: propTypes.number.isRequired,
    isDisabled: propTypes.bool.isRequired,
    onPress: propTypes.func.isRequired,
  };

  handlePress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[
            styles.randomNumber,
            this.props.isDisabled && styles.disabled,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  randomNumber: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 50,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default RandomNumber;
