import React, { Component, PropTypes } from 'react'
import { View, Text, Button } from 'react-native'

export default class ActionCard extends Component {

  static propTypes = {
    action: PropTypes.object.isRequired,
  }

  render () {
    const { action } = this.props;

    return (
      <View style={styles.cardContents}>
        <Text>Action</Text>
        <Text>{action.title}</Text>
        <Button title='Tap for details' onPress={() => {}} />
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
