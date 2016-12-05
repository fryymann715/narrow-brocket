import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreboard';

const cx = classNames.bind(styles);

const Scoreboard = ({tasks}) => {
  const taskListItems = tasks.map((task, key) => {
    return (
    <li className={cx('item')} key={key}>
      <span className={cx('task')}>{task.text}</span>
      <span className={cx('count')}>{task.count}</span>
    </li>);
  });
  return (
    <div className={cx('scoreboard')}>
      <h3 className={cx('header')}>Vote count</h3>
      <ul className={cx('list')}>
        {taskListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default Scoreboard;
