import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
// imports files for use
class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      error: false
    };
  }
  // sets initial state
  componentDidMount() {
    let movieId = this.props.match.params.movieId;
    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This is not the movie you are looking for", movie);
        // error message
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
    });
  }
  // sets state of movie and error
  render() {
    let { movie, error } = this.state;
    return (
      <div>
        <div style={styles.container}>
          <div style={styles.header}>
            <div>
              <h1>{movie.title}</h1>
            </div>
            <br />
            <Button basic color={"black"} as={Link} to={`/`}>
              Home
            </Button>
            <Button basic color={"black"} as={Link} to={`/movies`}>
              All Movies
            </Button>
            <Button basic color={"black"} as={Link} to={`/actors`}>
              All Actors
            </Button>
          </div>

          {error && <div>{error}</div>}
          {!error && (
            <div style={{ display: "flex" }}>
              <div>
                <div style={styles.image}>
                  <img width={350} src={movie.poster} alt={"Movie Poster"} />
                  <br />
                  <br />
                  <Button
                    basic
                    color={"black"}
                    as={Link}
                    to={`/movies/${movie.id}/edit`}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div>
                <div style={styles.movie}>
                  <p>{movie.summary}</p>
                  <p>Rating: {movie.rating}</p>
                  <br />
                  <p>Language: {movie.language}</p>
                  <br />
                  <p>Runtime: {movie.runtime} minutes</p>
                  <br />
                  <p>Release Year: {movie.releaseYear}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={styles.footer}>
          <hr />
          <h3>Actors in {movie.title}: </h3>
          {movie.actors &&
            movie.actors.map(actor => (
              <div>
                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flexDirection: "column",
    display: "flex"
  },
  header: {
    flexDirection: "row",
    padding: 20
  },
  movie: {
    flex: 2,
    padding: 25,
    fontSize: 30
  },
  image: {
    flex: 1,
    padding: 20
  },
  footer: {
    flexDirection: "column",
    padding: 20
  }
};

// renders movie details if no error, if error, renders error message and hides info
// displays movie (that actor is in) name links
export default MovieDetails;
