import React, { Component } from 'react'
import { Habit } from './Habit'
import { hashHistory } from 'react-router';
import { api } from './Api'
import axios from 'axios'

export default class HabitView extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      habit: {}
    }
    this.deleteHabit = this.deleteHabit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api.endpoint}/habits/${this.props.params.id}`)
      .then((habit) => {
        this.setState({
          habit: habit.data
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
        <h1>{this.state.habit.name}</h1>

        <ul>
          <h2>Actions</h2>
          <button onClick={this.deleteHabit}>Delete</button>
        </ul>
      </div>
    )
  }
}