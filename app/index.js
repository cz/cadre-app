import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, TouchableHighlight } from 'react-native';

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import networkInterface from './config/networkInterface';
const client = new ApolloClient({ networkInterface })

import App from './components/App';
import ActionList from './components/ActionList';
import CreateUser from './components/CreateUser';
import CreateTeam from './components/Teams/CreateTeam';
import ShowTeam from './components/Teams/ShowTeam';

export default class Assemble extends Component {
  renderScene(route, navigator) {
    if (route.name == "App") {
      return <App navigator={navigator} {...route.passProps} />
    }
    if (route.name == "Signup") {
      return <CreateUser navigator={navigator} {...route.passProps} />
    }
    if (route.name == "ActionList") {
      return <ActionList navigator={navigator} {...route.passProps} />
    }
    if (route.name == "CreateTeam") {
      return <CreateTeam navigator={navigator} {...route.passProps} />
    }
    if (route.name == "ShowTeam") {
      return <ShowTeam navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator style={styles.navigator}
          initialRoute={{ name: "App"}}
          renderScene= { this.renderScene }
          navigationBar={
            <Navigator.NavigationBar
              style={ styles.nav }
              routeMapper={NavigationBarRouteMapper} />
          }
        />
      </ApolloProvider>
    )
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
    return null
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>Assemble</Text>
  }
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  title: {
    marginTop:4,
    fontSize:16
  },
  leftNavButtonText: {
   	fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 60,
    backgroundColor: '#efefef'
  }
});
