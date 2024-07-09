import React from"react";
import "./App.css";
import { Container, Card, Header, Form, Icon } from 'semantic-ui-react';
import ToDoList from "./To-Do-List";



function App(){
  return(
    <div>
      <Container>
        <ToDoList/>
        {/* <>HEKLLLO</> */}
      </Container>
    </div>
  );
}

export default App;