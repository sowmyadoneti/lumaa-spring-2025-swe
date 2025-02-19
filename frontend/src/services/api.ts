import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getTasks = async (token: string) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addTask = async (token: string, title: string, description: string) => {
  return axios.post(
    `${API_URL}/tasks`,
    { title, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateTask = async (token: string, taskId: number, title: string, description: string, isComplete: boolean) => {
  return axios.put(
    `${API_URL}/tasks/${taskId}`,
    { title, description, isComplete },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


export const deleteTask = async (token: string, taskId: number) => {
  return axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
