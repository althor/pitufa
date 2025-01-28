import React from "react";

import Header from "./Header.jsx";
import Item from "./Item.jsx";
import Header2 from "./Header2.jsx";
import Item2 from "./Item2.jsx";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItemValue: "",
      items: [
        {
          text: "First Todo",
          done: false,
        },
        {
          text: "Second Todo",
          done: true,
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toogleTodo = this.toogleTodo.bind(this);
  }

  handleChange(event) {
    this.setState({ newItemValue: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let items = this.state.items.slice();

    items.push({
      text: this.state.newItemValue,
      done: false,
    });

    this.setState({
      newItemValue: "",
      items: items,
    });
    console.log(this.state);
  }

  toogleTodo(index) {
    let items = this.state.items.slice();
    let item = items[index];
    item.done = !item.done;
    this.setState({ items: items });
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newItemValue}
            placeholder="New todo..."
            onChange={this.handleChange}
          />
          <input type="submit" value="Add Item" />
        </form>
        <ol>
          {this.state.items.map((item, index) => (
            <Item key={item.id} clickHandler={() => this.toogleTodo(index)} done={item.done} text={item.text} />
          ))}
        </ol>
        <Header2 />
        <ol>
          {this.state.items.map((item, index) => (
            <Item2 key={item.id} clickHandler={() => this.toogleTodo(index)} done={item.done} text={item.text} />
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
