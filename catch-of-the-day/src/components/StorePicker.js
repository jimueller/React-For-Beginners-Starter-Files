import React from 'react';
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
  /* old school
  constructor(){
      super();
      this.goToStore = this.goToStore.bind(this);
  }
   */

  // Refs (simple handle on components)
  storeNameInput = React.createRef();

  // Setting as property so this is bound without using the constructor bind
  goToStore = event => {
    // 1. stop default submit
    event.preventDefault();
    // 2. get the store name from the ref
    const storeName = this.storeNameInput.current.value;
    // 3. change url
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref={this.storeNameInput} required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store </button>
      </form>
    );
  }
}

export default StorePicker;