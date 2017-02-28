import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateUser extends Component {
  static propTypes = {
    createUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object,
    idToken: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    console.log(`constructing CreateUser`);

    console.log(`createUser: ${JSON.stringify(props.createUser)}`);

    const emailAddress = props.profile ? props.profile.emailAddress : '';
    const name = props.profile ? props.profile.name : '';

    console.log(`props.profile: ${JSON.stringify(props.profile)}`);

    this.state = {
      emailAddress,
      name,
    };
  }

  createUser = () => {
    const variables = {
      idToken: this.props.idToken,
      emailAddress: this.state.emailAddress,
      name: this.state.name,
    }

    console.log(`about to call createUser mutation, variables: ${JSON.stringify(variables)}`);

    this.props.createUser({ variables })
      .then((response) => {
        this.props.navigator.push({name: 'ActionList'});
      }).catch((e) => {
        console.error(`Caught error creating user: ${e}`);
        this.props.navigator.pop();
      });
  }

  render() {
    if (this.props.data.loading) {
      return (<View style={styles.container}><Text>Loading</Text></View>);
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in')
      this.props.navigator.pop();
    }

    return (
      <View style={style.container}>
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

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(CreateUser)
)
