import _ from 'lodash';
import Models from '../models';
const Task = Models.Task;
const sequelize = Models.sequelize;

/**
 * List
 */
export function all(req, res) {
  Task.findAll().then((tasks) => {
    res.json(tasks);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Task
 */
export function add(req, res) {
  Task.create(req.body).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
}

/**
 * Update a task
 */
export function update(req, res) {
  const query = { id: req.params.id};
  const completed = req.body.completed
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);
  console.log('completion?', req.body);

  if (isFull) {
    Task.update(data, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      res.status(500).send('We failed to save for some reason');
    });
  } else if(data.completed !== undefined){
    Task.update(data, {where: query}).then(()=>{
      res.status(200).send('Task marked as completed')
    }).catch((err) => {
      res.status(500).send('Task could not be marked as completed')
    })
  } else if (data.updating !== undefined){
    Task.update(data, {where: query}).then(()=>{
      res.status(200).send('Task marked as updating')
    }).catch((err) => {
      res.status(500).send('Task could not be marked as updating')
    })
  }else {
    console.log(data);
    const sign = isIncrement ? '+' : '-';
    Task.update({
      count: sequelize.literal(`count${sign}1`)
    }, { where: query }).then(() => {
      res.status(200).send('Updated successfully');
    }).catch((err) => {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
}

/**
 * Remove a task
 */
export function remove(req, res) {
  Task.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
}

export default {
  all,
  add,
  update,
  remove
};
