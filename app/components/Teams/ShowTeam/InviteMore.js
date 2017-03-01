import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { email, text } from 'react-native-communications';

export default class InviteMore extends Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired,
  }

  render() {
    const message = `Join me on the ${this.props.teamName} team: http://www.example.com/join/${this.props.teamId}`;
    return (
      <TouchableOpacity onPress={() => text(null, message)}>
        <View style={styles.holder}>
          <Text style={styles.text}>Send a text/iMessage</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
