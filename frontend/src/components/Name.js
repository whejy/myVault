import React, { Component } from "react";

class Name extends Component {
  constructor() {
    super();
    this.state = {
      name: "John Wheldale",
    };
  }

  clickedMe = () => {
    this.setState({
      name: this.state.name === "John Wheldale" ? "John Doe" : "John Wheldale",
    });
  };

  render() {
    return (
      <div>
        <h1 className="bg-primary text-white text-center">{this.state.name}</h1>
        <button onClick={this.clickedMe} className="btn btn-success">
          Change Text
        </button>
      </div>
    );
  }
}

export default Name;
