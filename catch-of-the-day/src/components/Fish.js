import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func.isRequired,
  };

  onAddToOrderClick = () => {
    this.props.addToOrder(this.props.fishId);
  };

  render() {
    const { image, name, price, desc, status } = this.props.fish;
    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={this.onAddToOrderClick} disabled={!isAvailable}>
          {isAvailable ? "Add to Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
