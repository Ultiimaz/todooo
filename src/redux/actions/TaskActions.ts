import { ReduxAction } from "../../interfaces/ReduxAction";
import { Task } from "../../Models/Task";

export function addContainer(title: string, storeName: string | null = null) {
    if (storeName == null) {
        storeName = title.trim();
    }

    const returnValue: ReduxAction = {
        type: "todo/addContainer",
        payload: storeName
    }
    return returnValue
}
export function deleteList(container_id: string) {
    const returnValue: ReduxAction = {
        type: "todo/deleteContainer",
        payload: container_id
    }
    return returnValue
}

export function deleteTask(container_id: string, task: Task) {
    return {
        type: 'todo/deleteTask',
        payload: {
            container_id,
            task_id: task.id
        }
    };
}
export function addExistingTask(container_id: string, task: Task) {
    return {
        type: 'todo/addTask',
        payload: {
            container_id: container_id,
            task_id: task.id,
            ...task
        }
    };
}

export function addTask(title: string, description: string, container_id: string) {

    const returnValue: ReduxAction = {
        type: "todo/addTask",
        payload: {
            title,
            description,
            container_id
        }
    }
    return returnValue
}
