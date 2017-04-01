import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import { api } from './Api'
import { userStore } from './UserStore'
import { Habit } from './Habit'
import _ from 'lodash'
import { Link } from 'react-router';

export default class HabitListWeekly extends Component {

  constructor(props) {
    super(props)
    axios.defaults.headers.common['token'] = userStore.getToken()
    this.state = {
      habits: [],
      loading: true,
      shareTargets: {}
    }
    this.shareUpdate = this.shareUpdate.bind(this)
    this.shareHabit = this.shareHabit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`${api.endpoint}/habits`)
      .then((d) => {
        let habitz = d.data.map((h) => {
          return new Habit(h.uuid, h.name, h.instances, h.type, h.goal)
        }).filter((h) => h.type === 'weekly')
        this.setState({habits: habitz, loading: false})
      })
  }

  constructDates() {
    let day = moment()
    var start = moment(day).startOf('month').startOf('isoWeek')
    var end = moment(day).endOf('month').endOf('isoWeek')
    let dates = []
    while(start <= end) {
      dates.push(start.clone())
      start.add(1, 'days')
    }
    return _.chunk(dates, 7)
  }

  shareUpdate(habit, event) {
    let shareTargets = this.state.shareTargets
    shareTargets[habit.id] = event.target.value
    let state = this.state
    this.setState(state, () => console.log(this.state.shareTargets))
  }

  shareHabit(h) {
    axios.post(`${api.endpoint}/habit_pools`, {habit: h, target: this.state.shareTargets[h.id]})
      .then((answ) => console.log)
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

        let dateChunkPassed = h.instances.filter((hi) => {
          let hiMom = moment(hi)
          let dcs = dateChunk.map((dc) => dc.format('MMM Do'))
          return dcs.indexOf(hiMom.format('MMM Do')) !== -1
        })
        let tds = dateChunk.map((d, idx) => (
          <td key={d}>
            <div className="calc-date-name">
              <span>{d.format('MMM Do')}</span>
            </div>
            <div className="calc-date-field" onClick={() => this.addHabitInstance(h, d.toDate())}>
             {h.hasInstance(d.toDate()) ? '•' : ' '}
            </div>
          </td>
        ))
        return (
          <tr key={idx} className={dateChunkPassed.length >= h.goal ? 'week-passed' : ''}>
            {tds}
          </tr>
        )
      })
      return trs
    }
    const dateHeads = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',' Sun'].map(d => (<th key={d}>{d}</th>))
    return (
      <div>
        <h2>Weekly habits</h2>
        <hr />
        <div className={this.state.loading ? 'loader' : ''}></div>
        {this.state.habits.map((h, idx) => {
          return (
            <div key={idx}>
              <h2><Link to={`/habits/${h.id}`}>{h.name}</Link></h2>
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
              <button onClick={() => this.shareHabit(h)}>Share to</button><input type="text" onChange={this.shareUpdate.bind(this, h)} />
            </div>
          )
        })}
      </div>
    )
  }
}

