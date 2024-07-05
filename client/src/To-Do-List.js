import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
    };
  }

  componentDidMount() {
    this.getTasks();
  }
   onChange = (event) => {
    this.setState ({
      [event.target.name] : event.targe.value
    })
   }

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2" color="yellow">
            To Do List
          </Header>
        </div>
        <div className="row">
            <Form onSubmit={this.onSubmit}>
                <input
                type="text"
                name="task"
                onChange={this.onChange}
                value={this.state.task}
                fluid
                placeholder="Create Task"
                />
                {/*<Button> Create Task</Button>*/}
            </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
