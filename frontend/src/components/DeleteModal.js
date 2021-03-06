import React, { Component } from "react";
import APIService from "../APIService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withCookies } from "react-cookie";

export class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.cookies.get("mytoken"),
    };
  }

  deleteConfirm = (article = null) => {
    let token = this.state.token;

    if (article) {
      APIService.DeleteArticle(article.id, token).catch((error) =>
        console.log(error)
      );
    } else {
      APIService.DeleteAll(token).catch((error) => console.log(error));
    }

    this.props.handleModal();
    this.props.handleArticleList(article, "delete");
  };

  render() {
    return (
      <div>
        <Modal isOpen={true} toggle={this.props.handleModal}>
          <ModalHeader toggle={this.props.handleModal}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>{this.props.body}</ModalBody>
          <ModalFooter>
            {this.props.article ? (
              <Button
                color="danger"
                onClick={() => this.deleteConfirm(this.props.article)}
              >
                Delete
              </Button>
            ) : (
              <Button color="danger" onClick={() => this.deleteConfirm()}>
                Delete All Storage
              </Button>
            )}
            <Button onClick={this.props.handleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default withCookies(MyModal);
