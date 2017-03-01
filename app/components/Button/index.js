import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text } from 'react-native';

import styles from './styles';

export default class Button extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
