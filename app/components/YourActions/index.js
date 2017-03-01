import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import gql from 'graphql-tag'

import ActionCard from './ActionCard';
import styles from './styles';

class YourActions extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      user: PropTypes.object,
    }).isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return (<View style={styles.container}>An unexpected error occurred</View>);
    }

    const { userActions } = this.props.data.user;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollView}>
            {userActions.map((commitment) =>
              <ActionCard key={commitment.action.id} action={commitment.action} />
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const ActionsQuery = gql`
  query userActions {
    user {
      userActions {
        createdAt
        completedAt
        action {
          id
          title
        }
      }
    }
  }
`;

export default graphql(ActionsQuery)(YourActions);
