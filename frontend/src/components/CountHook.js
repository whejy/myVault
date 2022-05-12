import React, { useState, useEffect } from "react";

function CountHook() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Text example");
  const [info, setInfo] = useState({ name: "", email: "" });
  const [articles, setArticles] = useState([
    "Article One",
    "Article Two",
    "Article Three",
  ]);

  const addArticle = () => {
    setArticles([...articles, "New Article"]);
  };

  //   useEffect(() => {
  //     console.log("use effect called");
  //   }, [count, text]);

  //   useEffect(() => {
  //     console.log("use effect called");
  //     document.title = `You have clicked ${count} times`;
  //   });

  return (
    <div>
      <h3> {count} </h3>
      <button onClick={() => setCount(count + 1)} className="btn btn-primary">
        Click
      </button>
      <button onClick={() => setCount(count - 1)} className="btn btn-success">
        -1
      </button>
      <button onClick={() => setCount(0)} className="btn btn-danger">
        Reset
      </button>
      <br />
      <h2>{text}</h2>
      <button onClick={() => setText("CHANGED")} className="btn btn-secondary">
        Change Text
      </button>
      <br />
      <br />

      <input
        type="text"
        className="form-control"
        value={info.name}
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
      />
      <input
        type="text"
        className="form-control"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <h2>Name: {info.name}</h2>
      <h2>Email: {info.email}</h2>

      <br />
      <br />

      {articles.map((article) => {
        return <h2 key={article}>{article}</h2>;
      })}

      <button onClick={addArticle} className="btn btn-primary">
        Add Article
      </button>

      <button onClick={() => setCount(count + 1)} className="btn btn-primary">
        Change Title
      </button>
    </div>
  );
}

export default CountHook;
