import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

export default class ActionCard extends Component {

  static propTypes = {
    action: PropTypes.object.isRequired,
  }

  render () {
    const { action } = this.props;

    return (
      <View style={styles.cardContents}>
        <Text>{action.title}</Text>
        <Text>{action._teamsMeta.count} teams have committed</Text>
      </View>
    );
  }
}

const styles = {
  rowContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
};
