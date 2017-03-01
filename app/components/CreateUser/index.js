import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { getAuth0IdToken } from '../../config/auth0';

import styles from './styles';

class CreateUser extends Component {
  static propTypes = {
    createUser: React.PropTypes.func,
    data: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object,
    idToken: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    console.log(`constructing CreateUser`);

    const emailAddress = props.profile ? props.profile.email : '';
    const name = props.profile ? props.profile.name : '';

    console.log(`props.profile: ${JSON.stringify(props.profile)}`);

    this.state = {
      emailAddress,
      name,
    };
  }

  componentWillReceiveProps(nextProps) {
    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (nextProps.data.user || getAuth0IdToken() === null) {
      console.warn('not a new user or already logged in')
      this.props.navigator.pop();
      return;
    }
  }

  createUser = () => {
    const variables = {
      idToken: this.props.idToken,
      emailAddress: this.state.emailAddress,
      name: this.state.name,
    };

    console.log(`about to call createUser mutation, variables: ${JSON.stringify(variables)}`);

    this.props.createUserMutation({ variables })
      .then((response) => {
        this.props.navigator.push({name: 'ActionList'});
      }).catch((e) => {
        console.error(`Caught error creating user: ${e}`);
        this.props.navigator.pop();
      });
  }

  render() {
    console.log(`in CreateUser render`);
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>);
    }

    return (
      <View style={styles.container}>
        <Text>Just one more step</Text>
        <Text>Email</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(emailAddress) => this.setState({emailAddress})}
          value={this.state.emailAddress}
        />
        <Text>Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        {this.state.name && this.state.emailAddress &&
          <TouchableHighlight
            style={styles.signInButton}
            underlayColor='#949494'
            onPress={this.createUser}>
            <Text>Sign Up</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

const createUser = gql`
  mutation createUser ($idToken: String!, $name: String!, $emailAddress: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress) {
      id
    }
  }
`;

const userQuery = gql`
  query getUser {
    user {
      id
    }
  }
`;

export default graphql(createUser, {name: 'createUserMutation'})(
  graphql(userQuery, { options: { forceFetch: true }})(CreateUser)
)
