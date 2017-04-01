import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import { api } from './Api'
import { userStore } from './UserStore'
import { Habit } from './Habit'
import { Link } from 'react-router';

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
        let habitz = d.data.map((h) => {
          return new Habit(h.uuid, h.name, h.instances, h.type, h.goal)
        }).filter((h) => h.type === 'monthly')


        habitz.forEach((h) => {
          console.log(h)
          h.instances = h.instances.filter((hi) => { hi = moment(hi); return hi.isoWeek() === today.isoWeek() && hi.year() && today.year() })
        })
        this.setState({habits: habitz, loading: false})
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
    console.log(`Adding ${date} to ${habit.name}`)
    if (habit.hasInstance(date)) {
      axios
        .delete(`${api.endpoint}/habits/${habit.id}/instances`, {data: {created_at: date}})
        .then((answ) => {
          habit.instances = habit.instances.filter(hi => moment(hi).format() !== moment(date).format())
          this.setState({habits: this.state.habits})
        })
        .catch((e) => console.log)
    } else {
      axios
        .post(`${api.endpoint}/habits/${habit.id}/instance`, {created_at: date})
        .then((answ) => {
          habit.instances.push(date)
          this.setState({habits: this.state.habits})
        })
    }
  }

  render() {

    return (
      <div>
        <h2>Monthly habits</h2>
        <hr />
        <div className={this.state.loading ? 'loader' : ''}></div>
        <ul>
          {this.state.habits.map((habit, idx) => {
            return (
              <div key={idx} className="single-habit">
                <h2><Link to={`/habits/${habit.id}`}>{habit.name}</Link></h2>
                <p>{`${habit.instances.length} out of ${habit.goal} this month`}</p>
                <button onClick={() => this.addHabitInstance(habit)}>+</button>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

