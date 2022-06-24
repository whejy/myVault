export default class APIService {
  static async ValidateUrl(url) {
    // Check input url validity
    var valid = true;
    try {
      const resp = await fetch(`${url}/favicon.ico`, {
        method: "GET",
        mode: "no-cors",
      });
      if (!resp) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      valid = false;
    }
    return valid;
  }

  static UpdateArticle(article_id, body, token) {
    return fetch(`http://127.0.0.1:8000/vault/${article_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((error) => {
        console.log(error);
      });
  }

  static InsertArticle(body, token) {
    return fetch("http://127.0.0.1:8000/vault/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(resp.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static DeleteAll(token) {
    return fetch("http://127.0.0.1:8000/vault/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
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
