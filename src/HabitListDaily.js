import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import { api } from './Api'
import { userStore } from './UserStore'
import { Link } from 'react-router';
import { Habit } from './Habit'
import _ from 'lodash'

export default class HabitListDaily extends Component {

  constructor(props) {
    super(props)
    axios.defaults.headers.common['token'] = userStore.getToken()
    this.state = {
      habits: [],
      loading: true
    }
  }

  componentDidMount() {
    axios
      .get(`${api.endpoint}/habits`)
      .then((d) => {
        let habitz = d.data.map((h) => {
          return new Habit(h.uuid, h.name, h.instances, h.type)
        }).filter((h) => h.type === 'daily')
        this.setState({habits: habitz, loading: false})
      })
  }

  constructDates() {
    let day = moment()
    var start = moment(day).startOf('month').startOf('isoWeek')
    var end = moment(day).endOf('month').endOf('isoWeek')
    let dates = []
    while(start <= end) {
      dates.push(start.clone().hours(12))
      start.add(1, 'days')
    }
    return _.chunk(dates, 7)
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

    let getTrs = (h) => {
      let dateChunks = this.constructDates()
      let trs = dateChunks.map((dateChunk, idx) => {
        let tds = dateChunk.map((d, idx) => (
          <td key={d} >
            <div className="calc-date-name">
              <span>{d.format('MMM Do')}</span>
            </div>
            <div className="calc-date-field" onClick={() => this.addHabitInstance(h, d.toDate())}>
             {h.hasInstance(d.toDate()) ? '•' : ' '}
            </div>
          </td>
        ))
        return (
          <tr key={idx}>
            {tds}
          </tr>
        )
      })
      return trs
    }
    const dateHeads = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',' Sun'].map(d => (<th key={d}>{d}</th>))
    return (
      <div>
        <h2>Daily habits</h2>
        <hr />
        <div className={this.state.loading ? 'loader' : ''}></div>
        {this.state.habits.map((h, idx) => {
          return (
            <div key={idx}>
              <h2><Link to={`/habits/${h.id}`}>{h.name}</Link></h2>
              <p>Streak: {h.calcStreak(h.instances)}</p>
              <table>
                <thead>
                  <tr>
                    {dateHeads}
                  </tr>
                </thead>
                <tbody>
                  {getTrs(h)}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    )
  }
}