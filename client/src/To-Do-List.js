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
      [event.target.name] : event.target.value
    })
   }

   onSubmit = () => {
    let {task} = this.state;
    if (task){
      axios.post(endpoint + "/api/tasks",
        {task},
        {headers:{
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((res) => {
      this.getTasks();
      this.setState({
        task:"", 
      });
      console.log(res);
      });
    }
};

getTasks = () => {
  axios.get(endpoint + "/api/task").then((res) => {
    if (res.data) {
      this.setState({
        items: res.data.map((item) => { 
          let color = "yellow";
          let style = {
            wordWrap: "break-word"
          };
          if (item.status) { 
            color = "green";
            style["textDecorationLine"] = "line-through";
          }

          return (
            <Card key={item.id} color={color} fluid className="rough">
              <Card.Content>
                <Card.Header textAlign="left">
                  <div style={style}>{item.task}</div>
                </Card.Header>

                <Card.Meta textAlign="right">
                  <Icon
                    name="check circle"
                    color="blue"
                    onClick={() => this.updateTask(item._id)}
                  />
                  <span style={{ paddingRight: 10 }}>Undo</span>
                  <Icon
                    name="delete"
                    color="red"
                    onClick={() => this.deleteTask(item._id)}
                  />
                  <span style={{ paddingRight: 10 }}>Delete</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        }),
      });
    } else {
      this.setState({
        items: [],
      });
    }
  });
};
updateTask = (id) => {
  axios.put(endpoint + "/api/tasks/" + id, { 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    this.getTasks(); 
  });
};

undoTask = (id) => {
  axios.put(endpoint + "/api/undoTask/" + id, { 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log(res);
    this.getTasks(); 
  });
};

deleteTask = (id) => {
  axios.delete(endpoint + "/api/deleteTask/" + id, { 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log(res);
    this.getTasks(); 
  });
};


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
