import axios from 'axios';

const baseURL = 'https://express-training.herokuapp.com/api';

const token = localStorage.getItem('token');

const callApi = async (method, url, data) => {
  try {
    return await axios({
      method: method,
      url: `${baseURL}${url}`,
      data: data,
      headers: {
        Authorization: token,
      }
    });
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

export default callApi;
