import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class TeamList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectedTeamIds: PropTypes.array.isRequired,
    selectTeam: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading || !nextProps.data.user) return;

    const teams = nextProps.data.user.teams.map((team) => { return {id: team.id, name: team.name}});
    this.setState({dataSource: this.state.dataSource.cloneWithRows(teams)});
  }

  _pressRow(teamId) {
    this.props.selectTeam(teamId);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowData.id);
        }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { loading, user } = this.props.data;
    if (loading || !user) return null;

    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

const userTeamsQuery = gql`
  query getMyTeams {
    user {
      teams {
        id
        name
      }
    }
  }
`;

export default graphql(userTeamsQuery)(TeamList);
