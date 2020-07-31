// a mock for all note note object for the test 
const notes = [
  {
    id: '5e53ef7cac89a61e98173786',
    content: 'continue with the Harvard CS50 course',
    important: true,
    date: '2020-02-24T15:45:00.502+00:00',
    user: {
      _id: '5e53eede2a0fff23e4d5f336',
      username: 'damigreen',
      name: 'damilola faseun'
    }
  },
  {
    id: '5e53efef5c220411e4830502',
    content: 'kill crash bandicot and tiny tiger',
    date: '2020-02-24T15:46:55.185+00:00',
    important: false,
    user: {
      _id: '92309727709723b3b83b62',
      username: 'Dr. Cortex',
      name: 'Dr Evel Cortex'
    }
  }
];

const getAll = () => {
  return Promise.resolve(notes);
};

export default { getAll }