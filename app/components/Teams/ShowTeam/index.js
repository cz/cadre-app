import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Members from './Members';

class ShowTeam extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    teamId: React.PropTypes.string.isRequired,
  };

  render() {
    const { team, loading } = this.props.data;
    if (loading && !team) { return (<View style={styles.container}><Text>Loading</Text></View>); }

    return (
      <View style={styles.container}>
        { false && <Members teamId={this.props.teamId} /> }
        <Actions teamId={this.props.teamId} />
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
    Team(id: $teamId) {
      id
      name
    }
  }
`;

export default graphql(teamQuery, {
  options: (props) => ({ variables: { teamId: props.teamId } })
})(ShowTeam);
