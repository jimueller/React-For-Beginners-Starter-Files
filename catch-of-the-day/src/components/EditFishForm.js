import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fishId: PropTypes.string.isRequired,
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    this.props.updateFish(this.props.fishId, updatedFish);
  };

  render() {
    const { name, price, status, desc, image } = this.props.fish;

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={price}
        />
        <select name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.fishId)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
