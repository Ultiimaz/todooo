import * as DateUtils from '../../utils/DateUtils';
import * as FileUtils from '../../utils/FileUtils';


export default function taskReducer(state = FileUtils.getStorage(), action) {
    switch (action.type) {
      case "todo/addContainer": {
          state = {
            ...state,
            [action.payload]: { tasks: {}}
        } 
        break;
      }
      case "todo/deleteTask": {
        state[action.payload.container_id].tasks[action.payload.task_id] = undefined;
        break;
      }
      case "todo/deleteContainer": {
        state = {
          ...state,
          [action.payload]: undefined
      } 
      break;
    }
      case "todo/addTask": {
        const id = action.payload.id ?? DateUtils.Now();
        const container_id = action.payload.container_id;
        state[container_id].tasks[id] = {
            id,
            title: action.payload.title,
            description: action.payload.description
        }
        break;
      }

      default: {
          // no code
      }
      
    }
    if(Object.keys(state).length !== 0) // never save an empty state...
      {
        // save changes
        FileUtils.save(state);
      }
    return state;
  }
  