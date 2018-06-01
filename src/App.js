import React, { Component } from "react";
import { observer } from "mobx-react";
import { Checkbox, Divider, Input, Layout, List, notification } from "antd";
import TodoStore from "./stores/TodoStore";

import "antd/dist/antd.css";

class App extends Component {
  constructor() {
    super();
    this.todoStore = TodoStore.create({ todos: [] });
  }

  handleAddTodo = e => {
    if (e.key === "Enter") {
      this.todoStore.addTodo({
        title: e.currentTarget.value,
        done: false
      });
      notification.success({
        message: "New Todo Added",
        description: e.currentTarget.value,
        duration: 2
      });
    }
  };

  render() {
    return (
      <Layout>
        <Layout.Content style={{ padding: "0 50px", margin: "1rem 0" }}>
          <Input
            placeholder="New Todo"
            size="large"
            type="text"
            onKeyDown={this.handleAddTodo}
            style={{ margin: "1rem 0" }}
          />

          <div className="todos-stats">
            <h4>Total: {this.todoStore.todoCount}</h4>
            <h4>Completed: {this.todoStore.completedCount}</h4>
          </div>
          <Divider />

          <List
            header={<h3>Todo List</h3>}
            bordered
            dataSource={this.todoStore.todos}
            size="large"
            renderItem={todo => (
              <List.Item onClick={todo.toggleDone} key={todo.title}>
                <Checkbox checked={todo.done} />
                <span>{todo.title}</span>
              </List.Item>
            )}
          />
        </Layout.Content>
      </Layout>
    );
  }
}

export default observer(App);
