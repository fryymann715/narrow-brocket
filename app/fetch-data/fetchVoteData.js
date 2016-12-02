import { voteService } from 'services';

const fetchData = () => {
  return voteService.getTasks()
          .then(res => res.data);
};

export default fetchData;

