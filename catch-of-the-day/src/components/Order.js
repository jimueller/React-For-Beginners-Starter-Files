import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrderItems = (fishId) => {
    const fish = this.props.fishes[fishId];

    // If fish was deleted, don't render anything
    if (!fish) return null;

    const quantity = this.props.order[fishId];
    const isAvailable = fish && fish.status === "available";

    if (!isAvailable) {
      return (
        <li key={fishId}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }
    return (
      <li key={fishId}>
        {quantity} lbs {fish.name}
        {formatPrice(quantity * fish.price)}
        <button onClick={() => this.props.removeFromOrder(fishId)}>X</button>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);

    const total = Object.entries(this.props.order).reduce(
      (prevTotal, [fishId, quantity]) => {
        const fish = this.props.fishes[fishId];

        if (fish && fish.status === "available") {
          return prevTotal + quantity * fish.price;
        }
        return prevTotal;
      },
      0
    );

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrderItems)}</ul>
        <div className="total">
          Total:<strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
