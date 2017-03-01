import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import gql from 'graphql-tag'

import ActionCard from '../ActionCard';

class ActionList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allActions: PropTypes.array,
    }).isRequired,
    teamId: PropTypes.string,
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
              <ActionCard key={action.id} action={action} />
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
});

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
