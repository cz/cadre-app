import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './styles';

class TeamList extends Component {
  render() {
    const { loading, user } = this.props.data;
    if (loading || !user) { return (<View style={styles.container}><Text>Loading</Text></View>) }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollView}>
            {user.teams.map((team) =>
              <TeamCard key={team.id} team={team} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const teamsQuery = gql`
  query teamsQuery {
    user {
      teams {
        id
        name
        _usersMeta {
          count
        }
        _actionsMeta {
          count
        }
      }
    }
  }
`;

export default graphql(teamsQuery)(TeamList);
