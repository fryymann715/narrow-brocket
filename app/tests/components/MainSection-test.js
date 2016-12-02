import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainSection from 'components/MainSection';
import TaskItem from 'components/TaskItem';

const emptyData = [];
const taskItemData = [{
  text: '',
  id: '',
  index: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
}];
const stubFunctions = {
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
};

describe('<MainSection />', () => {
  describe('With Tasks', () => {
    it('should render <TaskItem> list items', () => {
      expect(mount(<MainSection tasks={taskItemData} {...stubFunctions} />).find(TaskItem).length).toBe(1);
    });
  });

  describe('Without Tasks', () => {
    it('should not render <TaskItem> list items', () => {
      expect(mount(<MainSection tasks={emptyData} {...stubFunctions} />).find(TaskItem).length).toBe(0);
    });
  });
});
