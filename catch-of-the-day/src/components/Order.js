import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrderItems = (fishId) => {
    const fish = this.props.fishes[fishId];

    // avoid flash of unresolved fish on page reload
    // order state is retrieved from localstate (quickly)
    // but fish data is fetch from firebase, so order details will
    // be present before fish details, resulting in a flash of missing fish
    // this prevents that, but still seems like a moderate hack
    //if (!fish) return null;

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
