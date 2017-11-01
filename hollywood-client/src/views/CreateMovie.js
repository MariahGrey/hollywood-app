import React, { Component } from "react";

import api from "../api";

class CreateMovie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {}
    };
  }

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

  render() {
    return (
      <div>
        <h1>CreateMovie</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type={"text"}
            name={"title"}
            placeholder={"title"}
            onChange={this.onInputChange}
          />
          <input
            type={"text"}
            name={"rating"}
            placeholder={"rating"}
            onChange={this.onInputChange}
          />
          <input
            type={"number"}
            name={"rottenTomatoes"}
            placeholder={"rottenTomatoes"}
            min={0}
            max={100}
            onChange={this.onInputChange}
          />
          <input
            type={"text"}
            name={"poster"}
            placeholder={"poster"}
            onChange={this.onInputChange}
          />
          <input
            type={"text"}
            name={"summary"}
            placeholder={"summary"}
            onChange={this.onInputChange}
          />
          <input type={"submit"} value={"Create Movie"} />
        </form>
      </div>
    );
  }
}

export default CreateMovie;
