import { combineReducers, createStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskReducer.js'

import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools()
export const store = createStore(
  combineReducers({
    containers: taskReducer,
  }),
  composedEnhancer);