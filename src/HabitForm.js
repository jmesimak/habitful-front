import React, { Component } from 'react'
import Formo from './Formo'
import axios from 'axios'
import { api } from './Api'
import { userStore } from './UserStore'
import { hashHistory } from 'react-router';

class HabitForm extends Component {
  constructor(props) {
    super(props)

    this.axios = axios.create({
      baseUrl: api.endpoint,
      headers: {'token': userStore.getToken()}
    })

    this.contents = {}
    this.submit = this.submit.bind(this)
  }

  submit(contents) {
    console.log(contents)
    this.axios
      .post(`${api.endpoint}/habits`, contents)
      .then((answ) => {
        hashHistory.push(`/habits/${contents.type}`)
      })
  }

  render() {
    let config = {
      inputs: [
        {
          type: 'text',
          name: 'name'
        },
        {
          type: 'number',
          name: 'goal'
        },
        {
          type: 'select',
          name: 'type',
          options: ['Daily', 'Weekly', 'Monthly']
        },
        {
          type: 'button',
          name: 'submit',
          text: 'Submit',
          action: this.submit
        }
      ]
    }

    return (
      <div>
        <h2>Add a new habit</h2>
          <Formo config={config} />
      </div>
    )
  }
}

export { HabitForm };