import React, { Component, PropTypes } from 'react'
import { View, Text, Button } from 'react-native'

export default class TeamCard extends Component {

  static propTypes = {
    team: PropTypes.object.isRequired,
  }

  render () {
    const { team } = this.props;

    return (
      <View style={styles.cardContents}>
        <Text>{team.name} has {team._usersMeta.count} members and {team._actionsMeta.count} actions</Text>
      </View>
    );
  }
}

const styles = {
  cardContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
};
