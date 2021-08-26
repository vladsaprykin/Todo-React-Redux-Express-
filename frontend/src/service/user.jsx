import API from './ApiService';

export const getUserService = async (token) => {
  const data = await API.get('users/auth', { token: token });
  return data;
};
export const loginUserService = async (dataUser) => {
  const data = await API.post('users/login', dataUser);
  return data;
};
export const createUserService = async (dataUser) => {
  const data = await API.post('users/create', dataUser);
  return data;
};
