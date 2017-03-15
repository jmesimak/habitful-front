import React, { Component } from 'react'
import { HabitForm } from './HabitForm'
import { Habit } from './Habit'
import './App.css'
import uuid from 'uuid'

class Entry extends Component {
  constructor() {
    super()
    this.state = {
      habits: this.loadHabits()
    }

    this.addHabit = this.addHabit.bind(this)
    this.addHabitInstance = this.addHabitInstance.bind(this)
  }

  loadHabits() {
    return (JSON.parse(localStorage.getItem("habits")) || []).map((h) => new Habit(h.id, h.name, h.instances))
  }

  addHabit(name) {
    let newHabit = new Habit(uuid.v4(), name, [])

    this.setState({
      habits: this.state.habits.concat(newHabit)
    }, () => {
      localStorage.setItem("habits", JSON.stringify(this.state.habits))
    })
  }

  addHabitInstance(habit, date) {
    habit.flipInstance(date)
    localStorage.setItem("habits", JSON.stringify(this.state.habits))
    this.setState({
      habits: this.state.habits
    })
  }

  render() {
    return (
      <div className="Row">
        <HabitForm addHabit={this.addHabit}  />
      </div>
    );
  }
}

export default Entry;