import React, { Component } from 'react'
import { Habit } from './Habit'
import { hashHistory } from 'react-router';
import { api } from './Api'
import axios from 'axios'
import { userStore } from './UserStore'
import moment from 'moment'

export default class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goals: []
    }
    axios.defaults.headers.common['token'] = userStore.getToken()
  }

  componentDidMount() {
    axios.get(`${api.endpoint}/goals`)
      .then((goals) => {
        this.setState({
          goals: goals.data
        })
      })
      .catch((e) => console.log)
  }

  markAsDone(uuid) {
    axios.put(`${api.endpoint}/goals/${uuid}/done`)
  }

  render() {

    return (
      <div>
        <h2>Goals</h2>
          {this.state.goals.map((goal) => {
            return (
              <div key={goal.uuid}>
                <h3>{goal.name}</h3>
                <p>Completed at {goal.completed_at}</p>
                <pre>{goal.description}</pre>
                <button onClick={() => this.markAsDone(goal.uuid)}>Mark as done</button>
                <hr />
              </div>
            )
          })}
      </div>
    )
  }
}