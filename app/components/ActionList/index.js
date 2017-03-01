import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import gql from 'graphql-tag'

import ActionCard from '../ActionCard';
import styles from './styles';

class ActionList extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allActions: PropTypes.array,
    }).isRequired,
    teamId: PropTypes.string,
  }

  commitAndShare = (actionId) => {
    this.props.navigator.push({
      name: "CommitAndShare",
      passProps: {
        actionId: actionId,
      },
      type: "Modal",
    });
  }

  render () {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return (<View style={styles.container}>An unexpected error occurred</View>);
    }

    const { allActions } = this.props.data;

    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <ScrollView>
          <View style={styles.scrollView}>
            {allActions.map((action) =>
              <ActionCard key={action.id} action={action} commitAndShare={this.commitAndShare} />
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const ActionsQuery = gql`
  query actionsQuery {
    allActions {
      id
      title
      _teamsMeta {
        count
      }
    }
  }
`;

export default graphql(ActionsQuery)(ActionList);
