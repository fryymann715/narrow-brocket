import { combineReducers } from 'redux';
import * as types from 'types';

const task = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_TASK_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    case types.TOGGLE_TASK:
      return {
        id: action.id,
        completed: action.completed
       }
    case types.INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
    case types.TOGGLE_TASK_SUCCESS:
      console.log(state);
      if (state.id === action.id) {
        return { ...state, completed: state.completed };
      }
      return state;
    default:
      return state;
  }
};

const tasks = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_TASK_REQUEST:
      return [...state, task(undefined, action)];
    case types.CREATE_TASK_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_TASK:
      return state.filter(t => t.id !== action.id);
    case types.INCREMENT_COUNT:
    case types.DECREMENT_COUNT:
    case types.TOGGLE_TASK:
      return state.map(t => task(t, action));
    case types.TOGGLE_TASK_SUCCESS:
      return [...state]
    default:
      return state;
  }
};

const newTask = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newTask;
    case types.CREATE_TASK_REQUEST:
      return '';
    default:
      return state;
  }
};

const taskReducer = combineReducers({
  tasks,
  newTask
});

export default taskReducer;
