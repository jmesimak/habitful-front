import React, { Component } from 'react'
import { Habit } from './Habit'
import { hashHistory } from 'react-router';
import { api } from './Api'
import axios from 'axios'
import { userStore } from './UserStore'

export default class HabitView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      habit: {},
      loading: true
    }
    axios.defaults.headers.common['token'] = userStore.getToken()
    this.deleteHabit = this.deleteHabit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api.endpoint}/habits/${this.props.params.id}`)
      .then((habit) => {
        this.setState({
          habit: habit.data,
          loading: false
        })
      })
  }

  deleteHabit() {
    axios
      .delete(`${api.endpoint}/habits/${this.state.habit.uuid}`)
      .then(() => {
        hashHistory.push('/habits/daily')
      })
  }

  render() {
    return (
      <div>
        <div className={this.state.loading ? 'loader' : ''}></div>
        <h1>{this.state.habit.name}</h1>
        <pre>{this.state.habit.description}</pre>
        <ul>
          <h2>Actions</h2>
          <button onClick={this.deleteHabit}>Delete</button>
        </ul>
      </div>
    )
  }
}