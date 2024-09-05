import axios from 'axios'
import { toast } from 'react-toastify'
import { StatusCodes } from 'http-status-codes'
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: `http://localhost:4040/v1`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// set include cookie
instance.defaults.withCredentials = true;
instance.interceptors.response.use(
  function (response) {
    console.log(response)
    return response;
  },
  function (error) {
    toast.error(error?.response?.data?.message);
    toast.error(error?.response?.data?.error);
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      console.log('Unauthorized');
    }
    return null
  }
);

export default instance;
