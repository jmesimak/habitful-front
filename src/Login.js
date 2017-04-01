import React, { Component } from 'react'
import { api } from './Api'
import { userStore } from './UserStore'
import axios from 'axios'
import { hashHistory } from 'react-router';

export default class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
      password: this.state.password
    })
  }

  onPasswordChange(e) {
    this.setState({
      email: this.state.email,
      password: e.target.value
    })
  }

  submitLogin(e) {
    axios.post(`${api.endpoint}/users/sessions`, {
      email: this.state.email,
      password: this.state.password
    })
    .then((answer) => {
      console.log(answer)
      userStore.setToken(answer.data.token)
      userStore.setCurrentUser(this.state.email)
      hashHistory.push(`/habits/daily`)
    })
    .catch((e) => {
      this.setState({
        fail: true
      })
    })
  }

  render() {
    let warn = ''
    if (this.state.fail) warn = (<p>Wrong user / password</p>)
    return (
      <div className="container">
        <h1>Enter your credentials</h1>
        {warn}
        <input type="text" placeholder="email" onChange={this.onEmailChange} />
        <input type="password" placeholder="password" onChange={this.onPasswordChange} />
        <button onClick={this.submitLogin}>Sign in</button>
      </div>
    )
  }
}

