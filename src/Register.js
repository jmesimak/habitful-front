import React, { Component } from 'react'
import { api } from './Api'
import { userStore } from './UserStore'
import axios from 'axios'
import { hashHistory } from 'react-router';

export default class Register extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.submitRegister = this.submitRegister.bind(this)
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

  submitRegister(e) {
    axios.post(`${api.endpoint}/users`, {
      email: this.state.email,
      password: this.state.password
    })
    .then((answer) => {
      console.log(answer)
      userStore.setToken(answer.data.token)
      userStore.setCurrentUser(this.state.email)
      hashHistory.push(`/habits/daily`)
    })
    .catch((e) => console.log)
  }

  render() {
    return (
      <div className="container">
        <h1>Enter your credentials</h1>
        <input type="text" placeholder="email" onChange={this.onEmailChange} />
        <input type="password" placeholder="password" onChange={this.onPasswordChange} />
        <button onClick={this.submitRegister}>Sign up</button>
      </div>
    )
  }
}

