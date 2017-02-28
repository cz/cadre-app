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

  _logout = () => {
    setAuth0IdToken(null);
    // do something to reload the app
  }

  _isLoggedIn = () => {
    return this.props.data.user;
  }

  render () {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>);
    }

    if (this._isLoggedIn()) {
      this.props.navigator.push({
        name: 'ActionList',
      });
    } else {
      return (<Login navigator={this.props.navigator} />);
    }
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
    }
  }
`;

export default graphql(userQuery, { options: {forceFetch: true }})(App);
