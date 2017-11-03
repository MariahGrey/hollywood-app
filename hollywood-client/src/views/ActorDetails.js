import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
// imports files for use
class ActorDetails extends Component {
  constructor() {
    super();

    this.state = {
      actor: {},
      error: false
    };
  }
  // sets initial state
  componentDidMount() {
    let actorId = this.props.match.params.actorId;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not the actor you are looking for", actor);
        // sets error response
        actor = {};
        // sets actor as an object
        this.setState(state => {
          return {
            error: "Unable to fetch actor."
          };
        });
      }
      this.setState(state => {
        return {
          actor: actor
        };
      });
    });
  }
  // sets state of error and actor
  render() {
    let { actor, error } = this.state;
    return (
      <div>
        <div style={styles.container}>
          <div style={styles.header}>
            <div>
              <h1>{actor.name}</h1>
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
                  <img width={350} src={actor.photo} alt={actor.name} />
                  <br />
                  <br />
                  <Button
                    as={Link}
                    basic
                    color={"black"}
                    to={`/actors/${actor.id}/edit`}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div>
                <div style={styles.actor}>
                  <p>
                    <label>Gender: </label>
                    {actor.gender}
                  </p>
                  <br />
                  <p>
                    <label>Age: </label>
                    {actor.age}
                  </p>
                  <p style={styles.biography}>{actor.biography}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={styles.footer}>
          <hr />
          <h3>Movies that {actor.name} appears in:</h3>
          {actor.movies &&
            actor.movies.map(m => (
              <div>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
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
  actor: {
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
  },
  biography: {
    fontSize: 15
  }
};

// renders actor details if no error, if error, renders error message and hides info
// displays actor (in movie) name links
export default ActorDetails;
