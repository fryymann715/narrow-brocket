import React, { PropTypes } from 'react';
import TaskItem from 'components/TaskItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = ({ tasks, onIncrement, onDecrement, onDestroy, onToggle }) => {
  const taskItems = tasks.map((task, key) => {
    return (
      <TaskItem
        index={key}
        id={task.id}
        key={key}
        text={task.text}
        completed={task.completed}
        incrementCount={onIncrement}
        decrementCount={onDecrement}
        destroyTask={onDestroy}
        toggleTask={onToggle}/>);
  });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Vote for your favorite hack day idea</h3>
      <ul className={cx('list')}>{taskItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default MainSection;
