import React, { Component } from 'react'
import { Habit } from './Habit'
import { browserHistory } from 'react-router';
import moment from 'moment'

export default class HabitView extends Component {
  constructor(props) {
    super(props)

    let habit = this.loadHabit()
    this.state = {
      habit: habit
    }

    this.deleteHabit = this.deleteHabit.bind(this)
  }

  loadHabit() {
    return (JSON.parse(localStorage.getItem("habits")) || [])
      .map((h) => new Habit(h.id, h.name, h.instances))
      .find((h) => h.id === this.props.params.id)
  }

  constructDates() {
    let dates = []
    for (var i = 13; i >= 0; i--) {
      dates.push(moment().subtract(i, 'days'))
    }
    return dates.reverse()
  }

  deleteHabit() {
    let toSave = (JSON.parse(localStorage.getItem("habits")) || [])
      .filter((h) => h.id !== this.props.params.id)
    localStorage.setItem("habits", JSON.stringify(toSave))
    browserHistory.push('/habits');
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