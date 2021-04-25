import React from "react";
import { Card } from "react-bootstrap";
import { Task } from "../Models/Task";

interface Props {
    task: Task,
    containerId: string
}
export default function TaskComponent(props: Props): JSX.Element {
    function onDragStart(event: any)
    { 
        //TODO: change to DragEvent
        event?.dataTransfer?.setData("task",JSON.stringify(props.task));
        event?.dataTransfer?.setData("fromContainer",props.containerId);

    }

    return <Card draggable={true} onDragStart={onDragStart}>{props.task.title}</Card>;
}