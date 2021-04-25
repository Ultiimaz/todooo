import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { addTask } from '../redux/actions/TaskActions';
import { Form } from 'react-bootstrap';
interface Props {
  onHide: any;
  containerId: string;
  show: boolean;
}
export function CreateTaskDialog(props: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function createTask() {
    if (title === "") {
      alert("title or desc cannot be empty");
      return;
    }

    dispatch(addTask(title, description, props.containerId));
    setTitle("");
    setDescription("");
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>title</Form.Label>
            <Form.Control value={title} onChange={(event: any) => setTitle(event.target.value)} />
          </Form.Group>
       
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={() => createTask()}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}