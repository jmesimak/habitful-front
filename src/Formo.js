import React, { Component } from 'react'

export default class Formo extends Component {

  constructor(props) {
    super(props)

    let initState = {}
    this.props.config.inputs.forEach((input) => {
      if (input.type !== 'select') {
        initState[input.name] = ''
      } else {
        initState[input.name] = input.options[0]
      }
    })
    this.state = initState
    this.registerChange = this.registerChange.bind(this)
  }

  registerChange(name, event) {
    let newState = this.state
    newState[name] = event.target.value
    this.setState(newState)
  }

  getContents() {
    this.props.getContents(this.state)
  }

  render() {
    let inputs = this.props.config.inputs.map((input) => {
      if (input.type === 'text') {
        return (
          <input type="text" onChange={this.registerChange.bind(this, input.name)} key={input.name} placeholder={input.placeholder} />
        )
      }

      if (input.type === 'textarea') {
        return (
          <textarea  onChange={this.registerChange.bind(this, input.name)} key={input.name} placeholder={input.placeholder} />
        )
      }

      if (input.type === 'number') {
        return (
          <input type="number" onChange={this.registerChange.bind(this, input.name)} key={input.name} placeholder={input.placeholder} />
        )
      }

      if (input.type === 'select') {
        return (
          <select key={input.name} onChange={this.registerChange.bind(this, input.name)}>
            {input.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        )
      }

      if (input.type === 'button') {
        return (
          <button onClick={() => input.action(this.state)} key={input.name}>{input.text}</button>
        )
      }

      return (<p>Error</p>)

    })

    return (
      <div>
      {inputs}
      </div>
    )
  }
}