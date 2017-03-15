import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import { api } from './Api'
import { userStore } from './UserStore'
import { Habit } from './Habit'

export default class HabitListWeekly extends Component {

  constructor(props) {
    super(props)
    axios.defaults.headers.common['token'] = userStore.getToken()
    this.state = {
      habits: [],
      loading: true
    }
  }

  componentDidMount() {
    console.log('mnt')
    let today = moment()
    axios
      .get(`${api.endpoint}/habits`)
      .then((d) => {
        console.log(d)
        let habitz = d.data.map((h) => {
          return new Habit(h.uuid, h.name, h.instances, h.type, h.goal)
        }).filter((h) => h.type === 'weekly')


        habitz.forEach((h) => {
          console.log(h)
          h.instances = h.instances.filter((hi) => { hi = moment(hi); return hi.isoWeek() === today.isoWeek() && hi.year() && today.year() })
        })
        this.setState({habits: habitz, loading: false})
      })
      .catch((e) => {
        console.log(e)
      })
  }

  constructDates() {
    let dates = []
    for (var i = 13; i >= 0; i--) {
      dates.push(moment().subtract(i, 'days'))
    }
    return dates.reverse()
  }

  addHabitInstance(habit, date) {
    axios
      .post(`${api.endpoint}/habits/${habit.id}/instance`, {created_at: new Date()})
      .then((answ) => {
        habit.instances.push(new Date())
        this.setState({habits: this.state.habits})
      })
  }

  render() {

    return (
      <div>
        <h2>Weekly habits</h2>
        <hr />
        <div className={this.state.loading ? 'loader' : ''}></div>
        <ul>
          {this.state.habits.map((habit, idx) => {
            return (
              <div key={idx} className="single-habit">
                <h3>{habit.name}</h3>
                <p>{`${habit.instances.length} out of ${habit.goal} this week`}</p>
                <button onClick={() => this.addHabitInstance(habit)}>+</button>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

