import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Auth0Lock from 'react-native-lock';
import { auth0, setAuth0IdToken } from '../../config/auth0';
import Button from '../Button';

import styles from './styles';

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
        <Button
          onPress={this.onLogin}
          text="Log In">
        </Button>
      </View>
    );
  }
}
