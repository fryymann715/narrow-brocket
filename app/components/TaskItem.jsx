import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/task-item';

const cx = classNames.bind(styles);

const TaskItem = ({ text, id, completed, incrementCount, decrementCount, destroyTask, toggleTask }) => {
  const onIncrement = () => {
    incrementCount(id);
  };
  const onDecrement = () => {
    decrementCount(id);
  };
  const onDestroy = () => {
    destroyTask(id);
  };
  const onToggle = () => {
    const newCompleted = ! completed
    return toggleTask(id, newCompleted);
  };

  return (
    <li className={cx('task-item')} key={id}>
      <span className={cx('task')}>{text}</span>
      <button
        className={cx('button', 'increment')}
        onClick={onIncrement}>+</button>
      <button
        className={cx('button', 'decrement')}
        onClick={onDecrement}>-</button>
      <button
        className={cx('button', 'destroy')}
        onClick={onDestroy}>{String.fromCharCode(215)}</button>
      <input type='checkbox' onClick={onToggle} />
    </li>
  );
};

TaskItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  destroyTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired
};

export default TaskItem;
