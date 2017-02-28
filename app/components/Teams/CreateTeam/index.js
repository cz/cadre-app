import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateTeam extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    mutate: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string.isRequired,
  };

  state = {
    name: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name} />
        <Button
          onPress={this.createTeam}
          title='Done'
          disabled={!this.canSave()} />
      </View>
    );
  }

  canSave = () => {
    return this.state.name !== '';
  }

  createTeam = () => {
    const variables = {
      name: this.state.name,
      usersIds: [this.props.userId],
    };

    this.props.mutate({ variables })
      .then((response) => {
        console.log(`got response: ${JSON.stringify(response)}`);
        this.props.navigator.replace({
          name: 'ShowTeam',
          passProps: {
            teamId: response.data.createTeam.id,
          }
        });
      }).catch((e) => {
        console.error(`Caught error creating team: ${e}`);
      });
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

const createTeam = gql`
  mutation createTeam ($name: String!, $usersIds: [ID!]){
    createTeam(name: $name, usersIds: $usersIds) {
      id
      name
      users {
        id
        name
      }
    }
  }
`;

export default graphql(createTeam)(CreateTeam);
