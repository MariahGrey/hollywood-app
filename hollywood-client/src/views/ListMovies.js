import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class ListMovies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      error: false
    };
  }

  componentDidMount() {
    api.movies.getAll().then(movies => {
      if (!movies.length && movies.length !== 0) {
        console.log("Return value was not an array of movies", movies);
        movies = [];
        // if the error isn't an empty array, returns the error, then sets movie to []
        this.setState(state => {
          return {
            error: "Unable to Fetch Movies. Sorry, Dude."
          };
        });
      }
      // error message
      this.setState(state => {
        return {
          movies: movies
        };
      });
    });
  }

  render() {
    let { movies, error } = this.state;

    return (
      <div>
        <h1>Movies</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <Button basic color={"black"} as={Link} to={`/movies/new`}>
          Create New Movie
        </Button>
        {error && <div>{error}</div>}
        {movies.map(m => (
          <div style={{ padding: 10 }}>
            <Link to={`/movies/${m.id}`}>
              {m.title} - {m.actors.length} Actor{m.actors.length === 1 ? "" : "s"}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
// lists movies in database, and states how many actors are attatched to that movie
export default ListMovies;
