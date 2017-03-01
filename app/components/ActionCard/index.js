import React, { Component, PropTypes } from 'react'
import { View, Text, Button } from 'react-native'

import styles from './styles';

export default class ActionCard extends Component {

  static propTypes = {
    action: PropTypes.object.isRequired,
    commitAndShare: PropTypes.func.isRequired,
  }

  commitAndShare = () => {
    this.props.commitAndShare(this.props.action.id);
  }

  render () {
    const { action } = this.props;

    return (
      <View style={styles.cardContents}>
        <Text>{action.title}</Text>
        <Text>{action._teamsMeta.count} teams have committed</Text>
        <Button
          title="Commit and Share"
          onPress={this.commitAndShare} />
      </View>
    );
  }
}
