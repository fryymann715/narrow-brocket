import axios from 'axios';

const service = {
  getTasks: () => axios.get('/task')
};

export default service;

