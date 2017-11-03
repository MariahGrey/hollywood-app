import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Button } from "semantic-ui-react";

class EditMovie extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false,
      movie: {
        rating: "G",
        language: "English"
      }
    };
  }
  // sets initial state of rating to G to prevent error if it remains unchanged
  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    let movieId = this.props.match.params.movieId;

    api.movies.update(movieId, this.state.movie).then(() => {
      this.props.history.push(`/movies/${movieId}`);
    });
  };
  // calls update function and then pushes user to the edited page after clicking submit
  componentDidMount() {
    this.fetchMovieAndActors();
  }

  fetchMovieAndActors = () => {
    let movieId = this.props.match.params.movieId;
    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This is not the movie you are looking for", movie);

        movie = {};

        this.setState(state => {
          return {
            error: "Unable to fetch movie."
          };
        });
      }
      this.setState(state => {
        return {
          movie: movie
        };
      });

      api.actors.getAll().then(actors => {
        if (!actors.length && actors.length !== 0) {
          return;
        }
        // error and success responses
        this.setState(state => {
          return {
            actors: actors
          };
        });
      });
    });
  };

  addToCast = id => {
    let movieId = this.props.match.params.movieId;

    api.movies.addActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };
  // allows you to add an actor to the movie
  removeFromCast = id => {
    let movieId = this.props.match.params.movieId;

    api.movies.removeActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };
  // allows you to remove an actor from the movie
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Edit Movie</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <Button basic color={"black"} as={Link} to={`/movies`}>
          All Movies
        </Button>
        <br />
        <hr />
        <br />
        <form onSubmit={this.onFormSubmit}>
          <label>Title: </label>
          <br />
          <input
            type={"text"}
            name={"title"}
            placeholder={"title"}
            onChange={this.onInputChange}
            value={this.state.movie.title}
            required
          />
          <br />
          <label>Poster URL: </label>
          <br />
          <input
            type={"text"}
            name={"poster"}
            placeholder={"poster"}
            onChange={this.onInputChange}
            value={this.state.movie.poster}
            required
          />
          <br />
          <label>Summary: </label>
          <br />
          <input
            type={"text"}
            name={"summary"}
            placeholder={"summary"}
            onChange={this.onInputChange}
            value={this.state.movie.summary}
            required
          />
          <br />
          <label>Runtime in minutes: </label>
          <br />
          <input
            type={"number"}
            name={"runtime"}
            placeholder={"runtime"}
            min={0}
            onChange={this.onInputChange}
            value={this.state.movie.runtime}
            required
          />
          <br />
          <label>Release Year: </label>
          <br />
          <input
            type={"number"}
            name={"releaseYear"}
            placeholder={"releaseYear"}
            max={2020}
            onChange={this.onInputChange}
            value={this.state.movie.releaseYear}
            required
          />
          <br />
          <label>Rating: </label>
          <br />
          <select
            value={this.state.movie.rating}
            name="rating"
            onChange={this.onInputChange}
            required
          >
            <option value={"G"}>G</option>
            <option value={"PG"}>PG</option>
            <option value={"PG13"}>PG13</option>
            <option value={"R"}>R</option>
            <option value={"NR"}>NR</option>
          </select>
          <br />
          <label>Language: </label>
          <br />
          <select
            value={this.state.movie.language}
            name={"language"}
            onChange={this.onInputChange}
            required
          >
            <option value={"English"}>English</option>
            <option value={"French"}>French</option>
            <option value={"Spanish"}>Spanish</option>
            <option value={"Other"}>Other</option>
          </select>
          <br />
          <br />
          <Button basic color={"black"} type={"submit"}>
            Update Movie
          </Button>
        </form>
        <br />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <br />
            <label>Current Cast: </label>
            <br />
            {this.state.movie.actors &&
              this.state.movie.actors.map(a => (
                <div>
                  <Button
                    basic
                    color={"black"}
                    onClick={() => this.removeFromCast(a.id)}
                  >
                    Fire
                  </Button>{" "}
                  {a.name}
                </div>
              ))}
          </div>
          <hr />
          <div style={{ flex: 1 }}>
            <br />
            <label>Actors for hire: </label>
            <br />
            {this.state.actors &&
              this.state.actors.map(a => (
                <div>
                  <Button
                    basic
                    color={"black"}
                    onClick={() => this.addToCast(a.id)}
                  >
                    Cast
                  </Button>{" "}
                  {a.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
// sets inputs and submit, as well as the area allowing you to submit and remove
// cast members from movie

export default EditMovie;
