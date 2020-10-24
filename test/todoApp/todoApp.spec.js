import {
  addTodoUser,
  fetchTodoUsers,
  fetchTodoUserById,
  fetchTodoItemsById,
  addTodoItem,
  deleteAllTodoItems,
  deleteTodoItemById,
  setTodoItemContentsById,
} from "../../src/todoApp/api/todoAPI.js";
import App from "../../src/todoApp/App.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL } from "../../src/todoApp/utils/constants.js";
import {
  isValidTodoList,
  isValidUser,
  isValidUserList,
} from "../../src/todoApp/utils/validate.js";

const mockAxios = new MockAdapter(axios);
let $root;

beforeEach(() => {
  $root = document.createElement("div", { id: "app" });
  document.body.appendChild($root);
  new App($root);
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Test TodoAPI", () => {
  it("fetch users.", async () => {
    mockAxios
      .onGet(`${BASE_URL}/api/users`)
      .reply(200, [createDummyUser(), createDummyUser()]);
    const users = await fetchTodoUsers();
    expect(isValidUserList(users)).toBe(true);
  });

  it("add user.", async () => {
    const name = "testUserName";
    mockAxios
      .onPost(`${BASE_URL}/api/users`, { name })
      .reply(200, createDummyUser({ name }));
    const user = await addTodoUser(name);
    expect(isValidUser(user)).toBe(true);
    expect(user.name).toEqual(name);
  });

  it("get user.", async () => {
    const _id = createUniqueStr();
    mockAxios
      .onGet(`${BASE_URL}/api/users/${_id}`)
      .reply(200, createDummyUser({ _id }));
    const user = await fetchTodoUserById(_id);
    expect(isValidUser(user)).toBe(true);
    expect(user._id).toEqual(_id);
  });

  //TODO : remove user
  it("remove user.", async () => {
    const _id = createUniqueStr();
    mockAxios.onDelete(`${BASE_URL}/api/users/${_id}`).reply(200, {});
  });

  it("fetch todoList.", async () => {
    const userId = createUniqueStr();
    mockAxios
      .onGet(`${BASE_URL}/api/users/${userId}`)
      .reply(200, [createDummyTodo(), createDummyTodo()]);
    const todoList = await fetchTodoItemsById(userId);
    expect(isValidTodoList(todoList)).toBe(true);
  });

  it("add todoItem.", async () => {
    const user = createDummyUser();
    mockAxios
      .onPost(`${BASE_URL}/api/users/${user._id}/items`)
      .reply(200, user);
    const res = await addTodoItem(user._id, user.contents);
    expect(isValidUser(res)).toBe(true);
    expect(res).toEqual(user);
  });

  it("remove all todoItems.", async () => {
    const user = createDummyUser();
    mockAxios
      .onDelete(`${BASE_URL}/api/users/${user._id}/items`)
      .reply(200, { ...user, todoList: [] });
    const res = await deleteAllTodoItems(user._id);
    expect(isValidUser(res)).toBe(true);
    expect(res?.todoList?.length).toBe(0);
  });

  it("remove todoItem.", async () => {
    const user = createDummyUser();
    const todoId = user.todoList[0]._id;
    mockAxios
      .onDelete(`${BASE_URL}/api/users/${user._id}/items/${todoId}`)
      .reply(200, {
        ...user,
        todoList: user.todoList.filter(({ _id }) => _id !== todoId),
      });
    const res = await deleteTodoItemById(user._id, todoId);
    expect(isValidUser(res)).toBe(true);
    expect(res?.todoList.findIndex(({ _id }) => _id === todoId)).toBe(-1);
  });

  it("set todoItem contents.", async () => {
    const user = createDummyUser();
    const todoId = user.todoList[0]._id;
    const contents = "changed contents";
    mockAxios
      .onPut(`${BASE_URL}/api/users/${user._id}/items/${todoId}`)
      .reply(200, {
        ...user,
        todoList: user.todoList.map((todoItem) =>
          todoItem._id === todoId ? { ...todoItem, contents } : todoItem
        ),
      });
    const res = await setTodoItemContentsById(user._id, todoId);
    const changedTodoItem = res?.todoList.find(({ _id }) => _id === todoId);
    expect(isValidUser(res)).toBe(true);
    expect(changedTodoItem?.contents).toEqual(contents);
  });

  it("set todoItem priority.", async () => {
    const user = createDummyUser();
    const todoId = user.todoList[0]._id;
    const priority = "1";
    mockAxios
      .onPut(`${BASE_URL}/api/users/${user._id}/items/${todoId}`)
      .reply(200, {
        ...user,
        todoList: user.todoList.map((todoItem) =>
          todoItem._id === todoId ? { ...todoItem, priority } : todoItem
        ),
      });
    const res = await setTodoItemContentsById(user._id, todoId);
    const changedTodoItem = res?.todoList.find(({ _id }) => _id === todoId);
    expect(isValidUser(res)).toBe(true);
    expect(changedTodoItem?.priority).toEqual(priority);
  });
});

function createDummyTodo(options) {
  const _id = options?._id || createUniqueStr();
  const contents = options?.contents || createUniqueStr();
  const priority = options?.priority || "0";
  const isCompleted = options?.isCompleted || false;
  return { _id, contents, priority, isCompleted };
}

function createDummyUser(options) {
  const _id = options?._id || createUniqueStr();
  const name = options?.name || createUniqueStr();
  const todoList = options?.todoList || [createDummyTodo(), createDummyTodo()];
  return { _id, name, todoList };
}

function createUniqueStr() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}
