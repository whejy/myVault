export default class APIService {
  static UpdateArticle(article_id, body, token) {
    return fetch(`http://127.0.0.1:8000/vault/${article_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertArticle(body, token) {
    return fetch("http://127.0.0.1:8000/vault/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteArticle(article_id, token) {
    return fetch(`http://127.0.0.1:8000/vault/${article_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  static LoginUser(body) {
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Incorrect username or password");
      }
    });
  }

  static RegisterUser(body) {
    return fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Username already exists");
      }
    });
  }
}
