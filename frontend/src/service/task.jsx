import API from './ApiService';

export const getTasksService = async () => {
  const data = await API.get('tasks');
  return data;
};
export const createTaskService = async (task) => {
  const data = await API.post('tasks', task);
  return data;
};
export const toggleTaskService = async (task) => {
  const data = await API.put(`tasks/${task._id}`, { isCompleted: !task.isCompleted });
  return data;
};
export const deleteTaskService = async (id) => {
  const data = await API.delete(`tasks/${id}`);
  return data;
};
export const completeAllTasksService = async () => {
  const data = await API.patch(`tasks/bulk_update`);
  return data;
};
export const deleteCompletedTasksService = async () => {
  const data = await API.delete(`tasks/bulk_delete`);
  return data;
};
export const changeTaskService = async (id, todo) => {
  const data = await API.put(`tasks/${id}`, todo);
  return data;
};
