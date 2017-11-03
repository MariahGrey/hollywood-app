import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class ListActors extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false
    };
  }

  componentDidMount() {
    api.actors.getAll().then(actors => {
      if (!actors.length && actors.length !== 0) {
        console.log("Return value was not an array of actors", actors);
        actors = [];

        this.setState(state => {
          return {
            error: "Unable to Fetch Actors. Sorry, Dude."
          };
        });
      }

      this.setState(state => {
        return {
          actors: actors
        };
      });
    });
  }
  // error and success messages
  render() {
    let { actors, error } = this.state;

    return (
      <div>
        <h1>Actors</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <Button basic color={"black"} as={Link} to={`/actors/new`}>
          Create New Actor
        </Button>
        {error && <div>{error}</div>}
        {actors.map(a => (
          <div style={{ padding: 10 }}>
            <Link to={`/actors/${a.id}`}>
              {a.name} - {a.movies.length} Movie{a.movies.length === 1 ? "" : "s"}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
// renders list of actors and how many movies they are in
export default ListActors;
