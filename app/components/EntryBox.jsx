import React, { PropTypes } from 'react';
import TaskTextInput from 'components/TaskTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to TaskTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TaskTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, task}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Vote for your top hack idea</h1>
      <TaskTextInput
        className={cx('input')}
        value={task}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  task: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
