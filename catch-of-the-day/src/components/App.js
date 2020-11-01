import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  addFish = (fish) => {
    console.log("Adding a fish", fish);
    // 1. take a copy of the existing state (never mutate state)
    const fishes = { ...this.state.fishes };
    // 2. add new fish
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object in state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Jim is cool" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
