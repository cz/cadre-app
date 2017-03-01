import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import gql from 'graphql-tag'

import MemberRow from './MemberRow';
import InviteMore from './InviteMore';

const MAX_TEAM_MEMBERS = 10;

class Members extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Team: PropTypes.object,
    }).isRequired,
    teamId: PropTypes.string.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return (<View style={styles.container}>An unexpected error occurred</View>);
    }

    const { Team } = this.props.data;

    return (
      <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <ScrollView>
          <View style={styles.scrollView}>
            {Team.users.map((user) =>
              <MemberRow key={user.id} user={user} />
            )}
            {Team.users.length < MAX_TEAM_MEMBERS &&
              <InviteMore teamId={this.props.teamId} teamName={Team.name} />
            }
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

const MembersQuery = gql`
  query teamQuery($teamId: ID!) {
    Team(id: $teamId) {
      name
      users {
        id
        name
      }
    }
  }
`;

export default graphql(MembersQuery, {
  options: (props) => ({ variables: { teamId: props.teamId } })
})(Members);
