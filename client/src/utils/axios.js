import axios from 'axios';

const Axios = (url, option) => {
  return axios({
    url: url,
    method: option.method,
    headers: option.headers,
    data: option.body,
  });
};

export default Axios;
