import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/task';
import * as types from 'types';

describe('Tasks reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createTask() {
    return Array(5).join().split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
  }

  const task = createTask();

  function createData() {
    return {
      text: createTask(),
      id: md5.hash(createTask()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createTasks(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        tasks: [],
        newTask: ''
      }
    );
  });

  it('Should add a new task to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TASK_REQUEST,
        id: data.id,
        count: 1,
        text: task
      })
    ).toEqual({
        tasks: [
          {
            id: data.id,
            count: 1,
            text: task
          }
        ],
        newTask: ''
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newTask: task
      })
    ).toEqual({
        tasks: [],
        newTask: task
    });
  });

  it('Should handle CREATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_REQUEST
      })
    ).toEqual({
        tasks: [],
        newTask: ''
    });
  });

  it('Should handle REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_SUCCESS,
        data: task
      })
    ).toEqual({
        tasks: task,
        newTask: ''
    });
  });

  it('Should handle CREATE_TASK_REQUEST', () => {
    const tasks = createTasks(20);
    const newTasks = [...tasks, data];
    expect(
      reducer({
        tasks
      },
      {
        type: types.CREATE_TASK_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newTask: '',
        tasks: newTasks
    });
  });

  it('should handle CREATE_TASK_FAILURE', () => {
    const tasks = createTasks(20);
    tasks.push(data);
    const newTasks = [...tasks];
    expect(
      reducer({
        tasks,
        newTask: task
      },
      {
        type: types.CREATE_TASK_FAILURE,
        id: data.id
      })
    ).toEqual({
        tasks: newTasks.pop() && newTasks,
        newTask: task
    });
  });

  it('should handle DESTROY_TASK', () => {
    const tasks = createTasks(20);
    tasks.push(data);
    const newTasks = [...tasks];
    expect(
      reducer({
        tasks,
        newTask: task
      },
      {
        type: types.DESTROY_TASK,
        id: tasks[tasks.length - 1].id,
      })
    ).toEqual({
        tasks: newTasks.pop() && newTasks,
        newTask: task
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const tasks = createTasks(20);
    const newTasks = [...tasks];
    tasks.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newTasks.push(newData);

    expect(
      reducer({
        tasks,
        newTask: task
      },
      {
        type: types.INCREMENT_COUNT,
        id: tasks[tasks.length - 1].id,
      })
    ).toEqual({
        tasks: newTasks,
        newTask: task
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const tasks = createTasks(20);
    const newTasks = [...tasks];
    tasks.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newTasks.push(newData);

    expect(
      reducer({
        tasks,
        newTask: task
      },
      {
        type: types.DECREMENT_COUNT,
        id: tasks[tasks.length - 1].id,
      })
    ).toEqual({
        tasks: newTasks,
        newTask: task
    });
  });
});
