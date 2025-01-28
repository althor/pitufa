
import React from "react";

class Item extends React.Component {
  render() {
    return (
      <li>
        <label>
          <input type="checkbox" checked={this.props.done || false} />
          <span>{this.props.text}</span>
        </label>
      </li>
    );
  }
}

export default Item;