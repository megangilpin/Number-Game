import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, PropTypes} from 'react-native';

class RandomNumber extends Component {
  // static propTypes = {
  //   number: PropTypes.number.isRequired,
  //   isDisabled: PropTypes.bool.isRequired,
  //   onPress: PropTypes.func.isRequired,
  // };

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
