import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div>
          <Link to={`/actors`}>All Actors</Link>
          <br />
          <br />
          <Link to={`/movies`}>All Movies</Link>
        </div>
      </div>
    );
  }
}

export default Home;
