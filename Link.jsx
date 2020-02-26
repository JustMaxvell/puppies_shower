import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

export function Link ({style, onPress, title}) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View>
        <Text style={styles[style]}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
  
}

const styles = StyleSheet.create({  
  link: {
    marginBottom: 15,
    color: '#505a8b',
    alignSelf: 'center'
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff'
  }
});