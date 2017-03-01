import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Actions() {
  return (
    <View style={styles.container}>
      <Text>
        Here is a list of actions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
