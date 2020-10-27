import { request, createAxiosConfig } from "./request.js";
import { BASE_URL, METHOD } from "../utils/constants.js";

export const fetchTodoUsers = async () => {
  try {
    const url = `${BASE_URL}/api/users`;
    return await request(url);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchTodoUserById = async (userId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}`;
    return await request(url, createAxiosConfig());
  } catch (error) {
    console.log(error);
  }
};

export const addTodoUser = async (name) => {
  try {
    const url = `${BASE_URL}/api/users`;
    const user = await request(url, createAxiosConfig(METHOD.POST, { name }));
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const removeTodoUserById = async (userId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}`;
    return await request(url, createAxiosConfig(METHOD.DELETE));
  } catch (error) {
    console.log(error);
  }
};

export const fetchTodoItemsById = async (userId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items`;
    return await request(url);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodoItem = async (userId, contents) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items`;
    return await request(url, createAxiosConfig(METHOD.POST, { contents }));
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTodoItemById = async (userId, todoId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items/${todoId}`;
    return await request(url, createAxiosConfig(METHOD.DELETE));
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteAllTodoItems = async (userId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items`;
    return await request(url, createAxiosConfig(METHOD.DELETE));
  } catch (error) {
    return { error: error.message };
  }
};

export const toggleTodoItemById = async (userId, todoId) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items/${todoId}/toggle`;
    return await request(url, createAxiosConfig(METHOD.PUT));
  } catch (error) {
    return { error: error.message };
  }
};

export const setTodoItemContentsById = async (userId, todoId, contents) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items/${todoId}`;
    return await request(url, createAxiosConfig(METHOD.PUT, { contents }));
  } catch (error) {
    return { error: error.message };
  }
};

export const setTodoItemPriorityById = async (userId, todoId, priority) => {
  try {
    const url = `${BASE_URL}/api/users/${userId}/items/${todoId}/priority`;
    return await request(url, createAxiosConfig(METHOD.PUT, { priority }));
  } catch (error) {
    return { error: error.message };
  }
};
