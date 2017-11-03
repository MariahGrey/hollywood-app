import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Button } from "semantic-ui-react";

class CreateMovie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {
        rating: "G",
        language: "English"
      }
    };
  }
  // sets rating to G to prevent error if none is selected
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

    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
    });
  };
  // sends user to movies page after submitting movie
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Create Movie</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <hr />
        <form onSubmit={this.onFormSubmit}>
          <label>Title:</label>
          <br />
          <input
            type={"text"}
            name={"title"}
            placeholder={"Lion King"}
            onChange={this.onInputChange}
            required
          />
          <br />
          <label>Poster URL:</label>
          <br />
          <input
            type={"text"}
            name={"poster"}
            placeholder={"lionking.com/JPEG"}
            onChange={this.onInputChange}
            required
          />
          <br />
          <label>Summary:</label>
          <br />
          <input
            type={"text"}
            name={"summary"}
            placeholder={"A young lion ..."}
            onChange={this.onInputChange}
            required
          />
          <br />
          <label>Runtime in minutes:</label>
          <br />
          <input
            type={"number"}
            name={"runtime"}
            placeholder={"104"}
            min={0}
            onChange={this.onInputChange}
            required
          />
          <br />
          <label>Release Year:</label>
          <br />
          <input
            type={"number"}
            name={"releaseYear"}
            placeholder={"1993"}
            max={2020}
            onChange={this.onInputChange}
            required
          />
          <br />
          <label>Rating:</label>
          <br />
          <select
            value={this.state.movie.rating}
            name={"rating"}
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
          <label>Language:</label>
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
            Create Movie
          </Button>
        </form>
      </div>
    );
  }
}

// renders create movie form
export default CreateMovie;
