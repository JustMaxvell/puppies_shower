import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

export function Button ({style, textStyle, onPress, title}) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View style = {styles[style]}>
        <Text style = {styles[textStyle]}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
  
}

const styles = StyleSheet.create({  
  button: {
    marginBottom: 15,
    width: 120,
    alignItems: 'center',
    backgroundColor: '#d13667',
    borderRadius: 5,
    alignSelf: 'center'
  },

  inactiveButton: {
    marginBottom: 15,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#505a8b',
    alignSelf: 'center'
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff'
  },

  inactiveButtonText: {
    textAlign: 'center',
    padding: 10,
    color: '#505a8b'
  }
});