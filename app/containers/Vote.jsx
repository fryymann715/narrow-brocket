import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { createTask, typing, incrementCount,
  decrementCount, destroyTask, toggleTask } from 'actions/tasks';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  render() {
    const { newTask, tasks, typing, createTask, destroyTask, incrementCount, decrementCount, toggleTask } = this.props;
    return (
      <div className={cx('vote')}>
        <EntryBox task={newTask}
          onEntryChange={typing}
          onEntrySave={createTask} />
        <MainSection tasks={tasks}
          onIncrement={incrementCount}
          onDecrement={decrementCount}
          onDestroy={destroyTask}
          onToggle={toggleTask}/>
        <Scoreboard tasks={tasks} />
      </div>
    );
  }
}

Vote.propTypes = {
  tasks: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  destroyTask: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newTask: PropTypes.string,
  toggleTask: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  return {
    tasks: state.task.tasks,
    newTask: state.task.newTask
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createTask, typing, incrementCount, decrementCount, destroyTask, toggleTask })(Vote);
