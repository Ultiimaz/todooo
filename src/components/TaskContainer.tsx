import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../Models/Task";
import { addExistingTask, deleteList as deleteContainer, deleteTask } from "../redux/actions/TaskActions";
import { CreateTaskDialog } from "./CreateTaskDialog";
import TaskComponent from "./TaskComponent";

interface Props {
    containerId: string;
    containerTitle: string | null;
}

export function TaskContainer(props: Props): ReactElement {
    const dispatch = useDispatch();
    const tasks: Task[] = useSelector((state: any) => state.containers[props.containerId]?.tasks);
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(true);
    
    function Tasks(): JSX.Element[] {
        if (!tasks) {
            return []
        }

        const elements: JSX.Element[] = Object.values(tasks).map((task: Task) => <TaskComponent task={task} containerId={props.containerId} />)

        return elements
    }
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function onDrop(event: any): void {
        event.preventDefault();
        if (event == null || event.dataTransfer == null) return;

        const task = JSON.parse(event.dataTransfer.getData("task"));
        const fromContainer = event.dataTransfer.getData("fromContainer");
        const toContainer = props.containerId;
        dispatch(addExistingTask(toContainer, task));
        dispatch(deleteTask(fromContainer, task));
    };

    function allowDrop(ev: any) {
        ev.preventDefault();
    }

    function deleteList(container_id: string) {
        dispatch(deleteContainer(container_id));
        setMounted(false);
    }

    if (!mounted) {
        return <></>
    }

    return (
        <Card
            bg={"success"}
            className="mb-2"
            onDrop={onDrop}
            onDragOver={allowDrop}
        >
            <Card.Header>
                <Row>
                    <Col>{props.containerTitle}</Col>
                    <Col xs={8}></Col>
                    <Col>
                        <Button variant="secondary" onClick={() => deleteList(props.containerId)}>×</Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <CreateTaskDialog containerId={props.containerId} show={show} onHide={handleClose} />
                <Button variant="primary" onClick={handleShow}>Create Task</Button>
                {Tasks()}
            </Card.Body>
        </Card>
    )
}