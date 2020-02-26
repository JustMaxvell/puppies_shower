import React, { Component } from 'react';

import {AutorisationPage} from './AutarisationPage';
import {ApplicationPage} from './ApplicationPage';

export default class MaxvellsApp extends Component {
  constructor (props) {
    super (props);

    this.state = {
      wasAutorised : false
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  login () {
    this.setState({
      wasAutorised: true
    })
  }

  logout () {
    this.setState({
      wasAutorised: false
    })
  }
    

  render() {

    const {wasAutorised} = this.state;

    if (!wasAutorised) {
      return <AutorisationPage login = { this.login } />
    } 
      return <ApplicationPage logout = { this.logout }/>    
  }
}
