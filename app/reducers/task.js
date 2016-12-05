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
    if (state.id === action.id){
      return {
        id: action.id,
        completed: action.completed
       }
       return state
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
      return state
    case types.TOGGLE_TASK_SUCCESS:
      if (state.id === action.id) {
        return { ...state, completed: action.completed };
      }
      return state;
    case types.UPDATE_TASK_SUCCESS:
      if (state.id === action.id) {
        return { ...state };
      }
      return state;
    case types.EDIT_TASK:
    console.log('EDIT_TASK reducer', state.id, ' >>> ' , action.id );
      if (state.id === action.id) {
        console.log('in EDIT_TASK reducer', state);
        return { id: action.id, updating: true }
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
    case types.EDIT_TASK:
    case types.UPDATE_TASK_SUCCESS:
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
