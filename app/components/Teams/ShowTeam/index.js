import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ShowTeam extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    teamId: React.PropTypes.string.isRequired,
  };

  render() {
    const { allTeams, loading } = this.props.data;
    if (loading && !allTeams) { return (<View style={styles.container}><Text>Loading</Text></View>); }

    const team = allTeams[0];

    return (
      <View style={styles.container}>
        <Text>
          Here is your team: {team.name} with {team.users.length} users
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const teamQuery = gql`
  query showTeam ($teamId: ID!) {
    allTeams(filter: {id: $teamId}) {
      id
      name
      users {
        id
        name
      }
    }
  }
`;

export default graphql(teamQuery, {
  options: (props) => ({ variables: { teamId: props.teamId } })
})(ShowTeam);
