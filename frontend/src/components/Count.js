import React, { Component } from "react";

export default class Count extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  clicked = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  reset = () => {
    this.setState({
      count: 0,
    });
  };

  render() {
    return (
      <div>
        <h3>{this.state.count}</h3>
        <button onClick={this.clicked}>Click Me</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}
