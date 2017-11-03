import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Form, Button, Input, TextArea } from "semantic-ui-react";

class CreateActor extends Component {
  constructor() {
    super();

    this.state = {
      actor: {
        gender: "Female"
      }
    };
  }
  //sets state of gender to prevent error if none is selected
  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        actor: {
          ...state.actor,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors");
    });
  };
  // pushes user to actors page after submiting form
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Create Actor</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <hr />
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Name: </label>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"name"}
              onChange={this.onInputChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Photo URL: </label>
            <Input
              type={"text"}
              name={"photo"}
              placeholder={"photo"}
              onChange={this.onInputChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Age: </label>
            <Input
              type={"number"}
              name={"age"}
              placeholder={"age"}
              onChange={this.onInputChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Biography: </label>
            <TextArea
              type={"text"}
              name={"biography"}
              placeholder={"biography"}
              onChange={this.onInputChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Gender: </label>
            <select
              name={"gender"}
              placeholder={"gender"}
              onChange={this.onInputChange}
              value={this.state.actor.gender}
              required
            >
              <option value={"Female"}>Female</option>
              <option value={"Male"}>Male</option>
            </select>
          </Form.Field>
          <br />
          <br />
          <Button basic color={"black"} type={"submit"}>
            Create Actor
          </Button>
        </Form>
      </div>
    );
  }
}
// renders create movie form
export default CreateActor;
