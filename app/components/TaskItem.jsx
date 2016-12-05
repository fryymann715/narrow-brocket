import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/task-item';
import TaskTextInput from './TaskTextInput';

const cx = classNames.bind(styles);

const TaskItem = ({ text, id, completed, updating, incrementCount, decrementCount, destroyTask, toggleTask, editTask, updateText, typing}) => {

  const becomeEntryBox = () => {
    console.log('beb updating: ', updating);
    editTask(id);
  };

  const itemText = (updating === true) ?
    <TaskTextInput
      className={cx('input')}
      value={text}
      id={id}
      onEntryChange={typing}
      onEntrySave={updateText} />: <div className={cx('task')} onClick={becomeEntryBox}>{text}</div>

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
    <span>{itemText}</span>
      <button
        className={cx('button', 'increment')}
        onClick={onIncrement}>^</button>
      <button
        className={cx('button', 'decrement')}
        onClick={onDecrement}>v</button>
      <button
        className={cx('button', 'destroy')}
        onClick={onDestroy}>{String.fromCharCode(215)}</button>
      <input className={cx('checkbox')} type='checkbox' defaultChecked={completed} onClick={onToggle}/>
    </li>
  );
};

TaskItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  typing: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  destroyTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired
};

export default TaskItem;
