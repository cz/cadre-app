import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class MemberRow extends Component {

  static propTypes = {
    user: React.PropTypes.object,
  }

  render () {
    const { user } = this.props;

    return (
      <View style={styles.rowContents}>
        <Text>{this.props.user.name}</Text>
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
