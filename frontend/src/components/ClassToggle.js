import React, { Component } from "react";

export class ClassToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeID: null,
    };
  }

  changeClass = (id) => {
    this.setState({
      activeID: id,
    });
  };

  render() {
    return (
      <div>
        <button
          className={
            this.state.activeID === this.props.article.id
              ? "btn btn-info btn-sm"
              : "btn btn-outline-info btn-sm"
          }
          onClick={() => {
            navigator.clipboard.writeText(this.props.article.password);
            this.changeClass(this.props.article.id);
          }}
        >
          Copy To Clipboard
        </button>
      </div>
    );
  }
}

export default ClassToggle;
