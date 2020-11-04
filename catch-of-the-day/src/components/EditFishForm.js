import React, { Component } from "react";

class EditFishForm extends Component {
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
      </div>
    );
  }
}

export default EditFishForm;
