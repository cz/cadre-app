import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput, Button, Alert, Clipboard, TouchableHighlight } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ActionCard from './ActionCard';
import TeamList from './TeamList';

class CommitAndShare extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    actionId: PropTypes.string.isRequired,
  }

  state = {
    teamIds: [],
    committedTeams: false,
  }

  selectTeam = (teamId) => {
    let { teamIds } = this.state;
    const index = teamIds.indexOf(teamId);
    if (index === -1) {
      teamIds = teamIds.concat(teamId);
    } else {
      teamIds.splice(index, 1);
    }
    this.setState({teamIds});
  }

  commitTeamsToAction = () => {
    this.props.mutate({ variables: { actionId: this.props.actionId, teamIds: this.state.teamIds } })
      .then(({ data }) => {
        this.setState({committedTeams: true});
      }).catch((error) => {
        console.warn(`there was an error commiting teams ${JSON.stringify(this.state.teamIds)} to action ${this.props.actionId}`, error);
      });
  }

  sharePublicly = () => {
    Alert.alert(
      'Challenge Link',
      'Share this link so more people can commit to this challenge',
      [
        {text: 'Copy to Clipboard', onPress: () => Clipboard.setString(`http://www.example.com/action/${this.props.actionId}`)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    );
  }

  done = () => {
    this.props.navigator.pop();
  }

  render () {
    const { Action, loading } = this.props.data;
    if (loading && !Action) { return (<View style={styles.container}><Text>Loading</Text></View>); }

    const buttonTitle = `Challenge ${this.state.teamIds.length} teams`;

    return (
      <View style={styles.container}>
        <ActionCard action={Action} />
        {!this.state.committedTeams &&
          <View style={styles.container}>
            <TeamList
              selectedTeamIds={this.state.teamIds}
              selectTeam={this.selectTeam} />
            <Text>Optional Message</Text>
            <TextInput multiline={true} />
            <Button title={buttonTitle} onPress={this.commitTeamsToAction} />
          </View>
        }
        {this.state.committedTeams &&
          <View style={styles.container}>
            <Text>Challenge Sent!</Text>
            <Text>Want to have an even bigger impact?</Text>
            <Text>Share your challenge publicly:</Text>
            <TouchableHighlight onPress={this.sharePublicly}>
              <Text>Share Publicly</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.done}>
              <Text>Not Now</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
};

const actionQuery = gql`
  query showAction ($actionId: ID!) {
    Action(id: $actionId) {
      id
      title
      teams {
        id
      }
    }
  }
`;

const commitTeamsToActionMutation = gql`
  mutation commitTeamsToAction($actionId: ID!, $teamIds: [ID!]!) {
    updateAction(id: $actionId, teamsIds: $teamIds) {
      id
      title
      teams {
        id
      }
    }
  }
`;

export default graphql(actionQuery, {
  options: (props) => ({ variables: { actionId: props.actionId } })
})(
  graphql(commitTeamsToActionMutation)(CommitAndShare)
);
