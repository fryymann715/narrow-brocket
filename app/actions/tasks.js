/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

export function makeTaskRequest(method, id, data, api = '/task') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function increment(id) {
  return { type: types.INCREMENT_COUNT, id };
}

export function decrement(id) {
  return { type: types.DECREMENT_COUNT, id };
}

export function destroy(id) {
  return { type: types.DESTROY_TASK, id };
}

export function typing(text) {
  return {
    type: types.TYPING,
    newTask: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createTaskRequest(data) {
  return {
    type: types.CREATE_TASK_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createTaskSuccess() {
  return {
    type: types.CREATE_TASK_SUCCESS
  };
}

export function createTaskFailure(data) {
  return {
    type: types.CREATE_TASK_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function toggleTaskSuccess(data) {
  return {
    type: types.TOGGLE_TASK_SUCCESS,
  }
}

export function toggleTaskFailure(data) {
  return {
    type: types.TOGGLE_TASK_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createTaskDuplicate() {
  return {
    type: types.CREATE_TASK_DUPLICATE
  };
}


// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTask(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { task } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the task already exists, make sure we emit a dispatch event
    if (task.tasks.filter(taskItem => taskItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate task
      return dispatch(createTaskDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createTaskRequest(data));

    return makeTaskRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TASK_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createTaskSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTaskFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your task'}));
      });
  };
}

export function incrementCount(id) {
  return dispatch => {
    return makeTaskRequest('put', id, {
        isFull: false,
        isIncrement: true
      })
      .then(() => dispatch(increment(id)))
      .catch(() => dispatch(createTaskFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function decrementCount(id) {
  return dispatch => {
    return makeTaskRequest('put', id, {
        isFull: false,
        isIncrement: false
      })
      .then(() => dispatch(decrement(id)))
      .catch(() => dispatch(createTaskFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function destroyTask(id) {
  return dispatch => {
    return makeTaskRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createTaskFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function toggleTask(id, completed) {
  return dispatch => {
    const data = {id , completed}
    return makeTaskRequest('put', id, {
      isFull: false,
      isIncremement: false,
      completed: completed
    })
    .then(() => dispatch(toggleTaskSuccess(data)))
    .catch((error) => dispatch(toggleTaskFailure({id, error: error})));
  };
}
