import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
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

  render () {
    const { Action, loading } = this.props.data;
    if (loading && !Action) { return (<View style={styles.container}><Text>Loading</Text></View>); }

    const buttonTitle = `Challenge ${this.state.teamIds.length} teams`;

    return (
      <View style={styles.container}>
        <ActionCard action={Action} />
        <TeamList
          selectedTeamIds={this.state.teamIds}
          selectTeam={this.selectTeam} />
        <Text>Optional Message</Text>
        <TextInput multiline={true} />
        <Button title={buttonTitle} onPress={() => {}} />
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
    }
  }
`;

export default graphql(actionQuery, {
  options: (props) => ({ variables: { actionId: props.actionId } })
})(CommitAndShare);
