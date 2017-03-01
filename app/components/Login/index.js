import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

import Auth0Lock from 'react-native-lock';
import { auth0, setAuth0IdToken } from '../../config/auth0';
import { colors } from '../../config/styles';

var lock = new Auth0Lock(auth0);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      setAuth0IdToken(token.idToken);
      this.props.navigator.push({
        name: 'Signup',
        passProps: {
          profile,
          idToken: token.idToken,
        },
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.signInButton}
          underlayColor='#949494'
          onPress={this.onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
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
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: colors.blue2,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
