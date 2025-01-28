import React from "react";

import Header from "./Header.jsx";
import Item from "./Item.jsx";

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
          {this.state.items.map((item) => (
            <Item key={item.id} done={item.done} text={item.text} />
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
