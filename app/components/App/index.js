import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import Login from '../Login'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class App extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading) return;

    if (nextProps.data.user) {
      const teams = nextProps.data.user.teams;
      const nextScene = teams.length ? 'ActionList' : 'CreateTeam';

      this.props.navigator.push({
        name: nextScene,
        passProps: {
          userId: nextProps.data.user.id,
        }
      });
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>);
    }

    return (<Login navigator={this.props.navigator} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const userQuery = gql`
  query userQuery {
    user {
      id
      teams {
        id
      }
    }
  }
`;

export default graphql(userQuery, { options: {forceFetch: true }})(App);
