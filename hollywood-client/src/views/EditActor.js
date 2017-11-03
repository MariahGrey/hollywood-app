import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Input, TextArea } from "semantic-ui-react";
import api from "../api";

class EditActor extends Component {
  constructor() {
    super();

    this.state = {
      actor: {
        gender: "Female"
      }
    };
  }
  // sets initial state to prevent error if gender is unchanged
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

    let actorId = this.props.match.params.actorId;
    api.actors.update(actorId, this.state.actor).then(() => {
      this.props.history.push(`/actors/${actorId}`);
    });
  };
  // pushes user to created page after submitting
  componentDidMount() {
    let actorId = this.props.match.params.actorId;

    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not the actor you are looking for.", actor);
        actor = {};
        this.setState(state => {
          return {
            error: "Unable to fetch actor"
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
  // error/success responses
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Edit Actor</h1>
        <Button basic color={"black"} as={Link} to={`/`}>
          Home
        </Button>
        <Button basic color={"black"} as={Link} to={`/actors`}>
          All Actors
        </Button>
        <br />
        <hr />
        <br />
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Name: </label>
            <br />
            <Input
              type={"text"}
              name={"name"}
              placeholder={"name"}
              onChange={this.onInputChange}
              value={this.state.actor.name}
            />
          </Form.Field>
          <Form.Field>
            <br />
            <label>Photo URL: </label>
            <br />
            <Input
              type={"text"}
              name={"photo"}
              placeholder={"photo"}
              onChange={this.onInputChange}
              value={this.state.actor.photo}
            />
          </Form.Field>
          <Form.Field>
            <br />
            <label>Age: </label>
            <br />
            <Input
              type={"number"}
              name={"age"}
              placeholder={"age"}
              onChange={this.onInputChange}
              value={this.state.actor.age}
            />
          </Form.Field>
          <Form.Field>
            <br />
            <label>Biography: </label>
            <br />
            <TextArea
              type={"text"}
              name={"biography"}
              onChange={this.onInputChange}
              value={this.state.actor.biography}
              required
            />
          </Form.Field>
          <Form.Field>
            <br />
            <label>Gender: </label>
            <br />
            <select
              required
              name={"gender"}
              placeholder={"gender"}
              onChange={this.onInputChange}
              value={this.state.actor.gender}
            >
              <option value={"Female"}>Female</option>
              <option value={"Male"}>Male</option>
            </select>
          </Form.Field>
          <br />
          <br />
          <Button type={"submit"}>Update</Button>
        </Form>
      </div>
    );
  }
}
// renders create page
export default EditActor;
