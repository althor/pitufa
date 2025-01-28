import React from 'react';

import NewItemForm from "./NewItemForm"
import GroceryItem from "./GroceryItem"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          name: "Broccoli",
          number: 3,
          purchased: false,
        },
        {
          name: "Bananas",
          number: 6,
          purchased: true,
        }
      ]
    }

    this.addGroceryItem = this.addGroceryItem.bind(this)
    this.toggleItem = this.toggleItem.bind(this)
  }

  addGroceryItem(groceryItem) {
    let items = this.state.items.slice()
    items.push(groceryItem)
    this.setState({items: items})
  }

  toggleItem(index) {
    let items = this.state.items.slice()
    let item = items[index]
    item.purchased = !item.purchased
    this.setState({
      items: items
    })
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h1 className="title">Grocery List</h1>

              <NewItemForm addItem={this.addGroceryItem} />

              <div className="my-5">
                <ul>
                  {this.state.items.map((item, index) => (
                    <GroceryItem key={index} item={item} toggleItem={() => this.toggleItem(index)} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
