import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrderItems = (fishId) => {
    const fish = this.props.fishes[fishId];
    const transitionOptions = {
      classNames: "order",
      key: fishId,
      timeout: {
        enter: 250,
        exit: 250,
      },
    };

    // If fish was deleted, don't render anything
    if (!fish) return null;

    const quantity = this.props.order[fishId];
    const isAvailable = fish && fish.status === "available";

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={fishId}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={fishId}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames={"count"}
                key={quantity}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span>{quantity}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <span class="price">{formatPrice(quantity * fish.price)}</span>
            <button onClick={() => this.props.removeFromOrder(fishId)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrderItems)}
        </TransitionGroup>
        <div className="total">
          Total:<strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
