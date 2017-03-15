import React, { Component } from 'react'
import { Link } from 'react-router';

class Front extends Component {

  render() {
    return (
      <div className="entry-area">
        <Link to="/login"><button className="button-outline">Log in</button></Link>
        <br />
        <Link to="/signup"><button className="button-outline">Sign up</button></Link>
      </div>
    )
  }
}

export default Front;
