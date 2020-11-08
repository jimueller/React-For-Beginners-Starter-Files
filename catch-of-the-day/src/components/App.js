import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    // Save a copy of order from localStorage, otherwise will be set
    // to nothing when componentDidUpdate fires after syncState
    const order = localStorage.getItem(params.storeId);

    const restoreOrderFromLocalStorage = () => {
      if (order) {
        this.setState({ order: JSON.parse(order) });
      }
    };

    // keep this handle so we can unbind it on unmount
    this.dbRef = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
      then: restoreOrderFromLocalStorage,
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.dbRef);
  }

  addFish = (fish) => {
    // 1. take a copy of the existing state (never mutate state)
    const fishes = { ...this.state.fishes };
    // 2. add new fish
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object in state
    this.setState({ fishes });
  };

  updateFish = (fishId, fish) => {
    const fishes = { ...this.state.fishes };
    fishes[fishId] = fish;
    this.setState({ fishes });
  };

  deleteFish = (fishId) => {
    // must set to null to delete in firebase
    this.updateFish(fishId, null);
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Eh, it's just fish" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                fishId={key}
                fish={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
