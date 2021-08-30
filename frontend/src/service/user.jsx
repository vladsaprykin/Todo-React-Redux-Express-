import API from './ApiService';

export const getUserService = async () => {
  const data = await API.get('users/auth');
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
export const deleteUserService = async () => {
  const data = await API.get('users/delete');
  return data;
};
