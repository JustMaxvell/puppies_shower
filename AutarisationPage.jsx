import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

import {Button} from './Button';
import {Link} from './Link';
import users from './users.json';

let blinkId;

export function AutorisationPage ({login}) {
  return (
    <View style = {styles.container}>
      <ApplicationName />
      <RegistrationForm 
        login = {login}
        />
    </View>
  )
}

class ApplicationName extends Component {

  state = {
    isBlink : true
  }

  componentDidMount () {
    blinkId = setInterval(() => (
      this.setState(previousState => (
        { isBlink: !previousState.isBlink }
      ))
    ), 1500);
  }

  componentWillUnmount () {
    clearInterval(blinkId);
  }

  render () {
    if (this.state.isBlink) {
      return (
        <View style = {styles.neonStyle}>
          <View style = {styles.neonBorder}>
            <Text style = {styles.applicationName}>Maxvell's App</Text>
          </View>
        </View>
      );
    } else {
      return  <View style = {styles.neonStyle}></View>
    }

  }
}

class RegistrationForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',

      isValid: {
        username: true,
        password: true
      },

      isActive: {
        username: false,
        password: false
      }

    }
  }

  setStyleInput (name) {
    if ( this.state.isActive[name] ) {
      return styles.inputActive
    } 
    else if ( !this.state.isValid[name] ) {
      return styles.inputError
    } else {
      return styles.input
    }
  }

  onChange (name, value) {
    this.setState ({
      [name]: value,
      isValid: { ...this.state.isValid, [name]: true}
    })
  }

  onFocus (name) {
    this.setState ({
      isActive : { ...this.state.isActive, [name] : true }
    })
  }

  onBlur (name) {
    this.setState ({
      isActive : { ...this.state.isActive, [name] : false }
    })
  }

  approvedAutarisation () {
    this.props.login ();
    this.setState({
      isValid: {...this.state.isValid, username: true, password: true},
      isActive: {...this.state.isActive, username: false, password: false},
      username: '',
      password: ''
    })
  }

  verifyValidation = () => {
    users.forEach( user => {
      if (user.username === this.state.username && user.password === this.state.password) {
        this.approvedAutarisation ();
      } else if (user.username !== this.state.username && user.password !== this.state.password){
        this.setState({
          isValid: {...this.state.isValid, username: false, password: false},
        })
      } else if (user.username !== this.state.username){
        this.setState({
          isValid: {...this.state.isValid, username: false},
        })
      } else if (user.password !== this.state.password){
        this.setState({
          isValid: {...this.state.isValid, password: false},
        })
      }
    })
  }



  _onPressButton() {
    alert('This feature is not available in an earlier version of the application')
  }

  _onPressLink() {
    alert('This feature is not available in an earlier version of the application')
  }

  render () {
    const { login } = this.props;
    const { username, password } = this.state;

    return (
      <View style = {styles.registrationForm}>
        <TextInput 
          style={this.setStyleInput ('username')}
          value = {username}
          placeholder = "User name"
          placeholderTextColor="#505a8b"
          onChangeText = {value => this.onChange( 'username', value )}
          onFocus = {() => this.onFocus ('username')}
          onBlur = {() => this.onBlur ('username')} 
          />
          
        <TextInput 
          style={this.setStyleInput ('password')}
          value = {password}
          secureTextEntry = { true }
          placeholder = "Password"
          placeholderTextColor="#505a8b"
          onChangeText = {value => this.onChange( 'password', value )} 
          onFocus = {() => this.onFocus ('password')}
          onBlur = {() => this.onBlur ('password')} 
          />
            
        <Link style = 'link' onPress={this._onPressLink} title = 'Forgot password?'/>
        <Button style = 'button' textStyle = 'buttonText' onPress = {this.verifyValidation} title = "SIGN IN" />
        <Button style = 'inactiveButton' textStyle = 'inactiveButtonText' onPress = {this._onPressButton} title = "SIGN UP" />
        <Link style = 'buttonText' onPress={login} title = 'SKIP REGISTRATION >'/>

      </View>
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

  applicationName: {
    fontSize: 30,
    color: '#5acbdc',
    textShadowColor: '#5acbdc',
    textShadowRadius: 10
  },

  neonStyle: {
    width: 220,
    height: 80,
    position: "absolute",
    top: 140,
    borderWidth: 3,
    borderColor: '#505a8b',
  },

  neonBorder: {
    position: "absolute",
    padding: 15,
    borderColor: '#5acbdc',
    borderWidth: 3,
    width: 220,
    height: 80,
    top: -3,
    left: -3,
  },

  registrationForm: {
    position: "absolute",
    bottom: 100
  },
  
  input: { 
    height: 30,
    width: 200,  
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    marginBottom: 20,
    textAlign: 'center',
    color: '#5acbdc'
  },

  inputActive: {
    height: 30,
    width: 200,  
    borderBottomWidth: 1, 
    marginBottom: 20,
    textAlign: 'center',
    color: '#5acbdc',
    borderColor: '#5acbdc'
  },

  inputError: {
    height: 30,
    width: 200,  
    borderBottomWidth: 1, 
    marginBottom: 20,
    textAlign: 'center',
    color: '#5acbdc',
    borderColor: 'red'
  }

});
