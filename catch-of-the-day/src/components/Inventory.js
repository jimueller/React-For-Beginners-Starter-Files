import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";
import { AuthProvider } from "../helpers";

class Inventory extends Component {
  static propTypes = {
    storeId: PropTypes.string.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    console.log(authData);
    // 1. lookup store in firebase db
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner/`, {
        data: authData.user.uid,
      });
    }
    // 4. set state of inventory to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    let authProvider;
    switch (provider) {
      case AuthProvider.GITHUB:
      case AuthProvider.TWITTER:
        authProvider = new firebase.auth[`${provider}AuthProvider`]();
        break;
      case AuthProvider.MICROSOFT:
        authProvider = new firebase.auth.OAuthProvider(AuthProvider.MICROSOFT);
        authProvider.setCustomParameters({
          tenant: "consumers",
        });
        break;

      default:
        authProvider = new firebase.auth.OAuthProvider(provider);
    }
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("logging out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // check if they're not the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store.</p>
          {logout}
        </div>
      );
    }

    // they are the owner, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map((fishId) => (
          <EditFishForm
            key={fishId}
            fishId={fishId}
            fish={this.props.fishes[fishId]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
        {logout}
      </div>
    );
  }
}

export default Inventory;
