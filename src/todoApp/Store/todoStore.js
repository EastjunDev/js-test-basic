import { createStore, actionCreator } from "../utils/tiny-redux.js";

const SET_USER_LIST = "setUserList";
const SET_ACITVE_USER_ID = "setAcitveUserId";
const ADD_USER = "addUser";
const REMOVE_USER = "removeUser";

const SET_TODO_LIST = "setTodoList";
const ADD_TODO_ITEM = "addTodoItem";
const SET_TODO_ITEM = "setTodoItem";
const TOGGLE_TODO_ITEM = "toggleTodoItem";
const SET_TODO_FILTER = "setTodoFilter";

export const setUserList = (users) => actionCreator(SET_USER_LIST, { users });
export const setAcitveUserId = (activeUserId) =>
  actionCreator(SET_ACITVE_USER_ID, { activeUserId });
export const addUser = (user) => actionCreator(ADD_USER, { user });
export const removeUser = (userId) => actionCreator(REMOVE_USER, { userId });
export const addTodoItem = (todoItem) =>
  actionCreator(ADD_TODO_ITEM, { todoItem });

const initState = {
  activeUserId: "",
  users: [],
  todoList: [],
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USER_LIST:
      const { users } = payload;
      return {
        ...state,
        users: [...users],
      };
    case ADD_USER:
      const { user } = payload;
      return {
        ...state,
        users: [...state.users, user],
      };
    case REMOVE_USER:
      const { userId } = payload;
      return {
        ...state,
        activeUserId: activeUserId === userId && activeUserId,
        users: state.users.filter(({ _id }) => userId !== _id),
      };
    case ADD_TODO_ITEM:
      const { todoItem } = payload;
      return {
        ...state,
        todoList: [...state.todoList, todoItem],
      };
    case SET_ACITVE_USER_ID:
      const { activeUserId } = payload;
      return {
        ...state,
        activeUserId,
      };
  }
};

const todoStore = createStore(reducer);

export default todoStore;
