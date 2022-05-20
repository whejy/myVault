import React, { Component } from "react";
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
import Form from "./Form";

export class FormModal extends Component {
  render() {
    return (
      <div>
        {this.props.modal.isOpen ? (
          <Modal isOpen={true} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              {this.props.modal.title}
            </ModalHeader>
            <ModalBody>
              {this.props.deleteConfirm ? (
                <div>
                  Are you sure you want to delete your storage item for{" "}
                  <b>Username: {this.props.article.username}</b>?
                  <div>
                    <Button
                      onClick={() => this.props.deleteBtn(this.props.article)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <Form
                  article={this.props.article}
                  updatedInformation={this.props.updatedInformation}
                  insertedInformation={this.props.insertedInformation}
                  toggle={this.props.toggle}
                />
              )}
            </ModalBody>
            {/* <ModalFooter>
              <Button color="success" onClick={() => console.log("test")}>
                Save
              </Button>
            </ModalFooter> */}
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default FormModal;
