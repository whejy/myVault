import React, { Component, useContext } from "react";
import APIService from "../APIService";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export class MyModal extends Component {
  deleteConfirm = (article = null) => {
    console.log(this.mycontext);
    if (article) {
      APIService.DeleteArticle(article.id, this.props.token.mytoken)
        .then(() => console.log(article))
        .catch((error) => console.log(error));
    } else {
      APIService.DeleteAll(this.props.token.mytoken).catch((error) =>
        console.log(error)
      );
    }
    this.props.handleModal();
    this.props.handleArticleList(article);
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
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
