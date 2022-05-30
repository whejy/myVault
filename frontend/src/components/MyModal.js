import React, { Component } from "react";
import APIService from "../APIService";
import Form from "./Form";
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
import { withCookies } from "react-cookie";
// import { TokenContext } from "../TokenContext";

export class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.cookies.get("mytoken"),
    };
  }

  deleteConfirm = (article = null) => {
    // let token = this.context.mytoken;
    let token = this.state.token;

    if (article) {
      APIService.DeleteArticle(article.id, token)
        .then(() => console.log(article))
        .catch((error) => console.log(error));
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
          <ModalBody>
            {this.props.body ? (
              this.props.body
            ) : (
              <Form
                handleModal={this.props.handleModal}
                article={this.props.article}
                handleArticleList={this.props.handleArticleList}
              />
            )}
          </ModalBody>
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
// MyModal.contextType = TokenContext;
export default withCookies(MyModal);
