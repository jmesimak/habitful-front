import React, { Component } from 'react'
import { Link } from 'react-router';
import { userStore } from './UserStore'
import axios from 'axios'

class App extends Component {

  componentDidMount() {
    axios.defaults.headers.common['token'] = userStore.getToken()
  }

  render() {
    let links = ["daily", "weekly", "monthly"].map((t) => (
        <Link to={`/habits/${t}`} activeClassName="active" key={t}> {t} </Link>
      )
    )

    return (
      <div>
        <div className="container">
          <div className="nav">
            <div className="nav-container">
              <p>Hi,</p>
              <p>{userStore.getCurrentUser()}</p>
              <br />
              {links}
              <br />
              <button className="button-outline"><Link to="/habits/new">Create a new habit</Link></button>
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;
