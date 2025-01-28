import React from 'react'

class GroceryItem extends React.Component {
    render() {
        let { item, toggleItem } = this.props
        return (
            <li>
                <label
                className="checkbox"
                style={{
                    textDecoration: item.purchased
                    ? "line-through"
                    : "none",
                }}
                >
                <input onClick={toggleItem} checked={item.purchased} className="mr-3" type="checkbox"/>
                {item.name} <span className="has-text-weight-light">({item.number})</span>
                </label>
            </li>
        )
    }
}

export default GroceryItem
