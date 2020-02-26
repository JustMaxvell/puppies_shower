import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

import {Button} from './Button';

const imageApi = 'https://dog.ceo/api/breeds/image/random';


async function getRandomDog() {
  const { data } = await axios(imageApi);
  return data.message;
}

export function ApplicationPage ({logout}) {
  return (
    <View style = {styles.container}>
      <AplicationForm logout = {logout}/>
    </View>
  )
}

class AplicationForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      dogImage : '',
      step : 1000
    }
  }

  componentDidMount() {
    this.start()
  }

  async showDog() {
    const url = await getRandomDog();
    
    this.setState({ dogImage: url });
  }

  onChange(step) {
    this.setState({ step: Number(step*1000) }, () => {
      this.stop();
      this.start();
    });
  }

  start() {
    this.timerId = setInterval(() => {
      this.showDog();
    }, this.state.step);
  }

  stop() {
    clearInterval(this.timerId)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render () {

    const {logout} = this.props;
    if (this.state.dogImage === '') {
      return <Text style = {{color: 'white'}}>Loading...</Text>
    }
    return (
    <KeyboardAvoidingView behavior="padding">
      <View style = {styles.imageBox}>
      <Image style = {styles.image} source={{uri: this.state.dogImage}} />
      </View>
      <TextInput 
          value = {`${this.state.step/1000}`}
          style = {styles.input} 
          onChangeText={(text) => this.onChange(text)}
          placeholder = "Change timer"
          placeholderTextColor="#505a8b"
          keyboardType = 'numeric'
      />
      <Button style = 'button' textStyle = 'buttonText' onPress = {logout} title = "EXIT" />
    </KeyboardAvoidingView>
      );
  }

}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#222743',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBox: {
    flex: 1,
    width: 500
  },

  image: {
      width: '100%',
      height: '100%'
  },

  input: { 
    height: 30,
    width: 120,  
    left: 190,
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    marginBottom: 20,
    textAlign: 'center',
    color: '#5acbdc'
  },
  
  button: {
    marginBottom: 15,
    width: 120,
    alignItems: 'center',
    backgroundColor: '#d13667',
    borderRadius: 5,
    alignSelf: 'center'
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff'
  }

});