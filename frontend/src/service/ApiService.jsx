import { getCookie, urlServer } from '../helpers/utils';

class API {
  async post(route, data) {
    try {
      const response = await fetch(`${urlServer}/${route}/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(data),
      });
      const dataServer = await response.json();
      if (response.status === 401) throw { status: 401, error: 'Session expired, please re-login to your account' };
      if (response.status >= 400) throw dataServer;
      return dataServer;
    } catch (e) {
      throw e;
    }
  }
  async get(route) {
    try {
      const response = await fetch(`${urlServer}/${route}/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      const dataServer = await response.json();
      if (response.status === 401) throw { status: 401, error: 'Session expired, please re-login to your account' };
      if (response.status >= 400) throw dataServer;
      return dataServer;
    } catch (e) {
      throw e;
    }
  }
  async delete(route) {
    try {
      const response = await fetch(`${urlServer}/${route}/`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
      const dataServer = await response.json();
      if (response.status === 401) throw { status: 401, error: 'Session expired, please re-login to your account' };
      if (response.status >= 400) throw dataServer;
      return dataServer;
    } catch (e) {
      throw e;
    }
  }
  async put(route, data) {
    try {
      const response = await fetch(`${urlServer}/${route}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(data),
      });
      const dataServer = await response.json();
      if (response.status === 401) throw { status: 401, error: 'Session expired, please re-login to your account' };
      if (response.status >= 400) throw dataServer;
      return dataServer;
    } catch (e) {
      throw e;
    }
  }
  async patch(route, data) {
    try {
      const response = await fetch(`${urlServer}/${route}/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(data),
      });
      const dataServer = await response.json();
      if (response.status === 401) throw { status: 401, error: 'Session expired, please re-login to your account' };
      if (response.status >= 400) throw dataServer;
      return dataServer;
    } catch (e) {
      throw e;
    }
  }
}

export default new API();
