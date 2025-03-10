import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, file, history) => async (dispatch) => {
  const uploadConfig = await axios.get('/api/upload');

  await axios.put(uploadConfig.data.url, file, {
    headers: {
      'content-type': file.type,
    },
  }); // the url is undefined coz i couldn't sign up to aws s3
  //there will be an error

  const res = await axios.post('/api/blogs', {
    ...values,
    imageUrl: uploadConfig.data.key,
  });

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async (dispatch) => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = (id) => async (dispatch) => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
