import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      posts: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  usernameHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <input
          type="text"
          value={this.state.username}
          placeholder="Enter Your Username"
          className="form-control"
          onChange={this.usernameHandler}
        />
        <input
          type="password"
          value={this.state.password}
          placeholder="Enter Your Password"
          className="form-control"
          onChange={this.passwordHandler}
        />
        <button className="btn btn-primary">Click Me</button>

        {posts.map((post) => (
          <h2 key={post.id}>{post.title}</h2>
        ))}
      </div>
    );
  }
}

export default Form;
