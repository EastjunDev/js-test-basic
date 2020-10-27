export function isValidUserList(userList) {
  if (!Array.isArray(userList)) {
    return false;
  }
  return userList.every(isValidUser);
}

export function isValidUser(user) {
  if (typeof user?._id !== "string") {
    return false;
  }
  if (typeof user?.name !== "string") {
    return false;
  }
  return isValidTodoList(user?.todoList);
}

export function isValidTodoList(todoList) {
  if (!Array.isArray(todoList)) {
    return false;
  }
  return todoList.every(isValidTodoItem);
}

export function isValidTodoItem(todoItem) {
  if (typeof todoItem?._id !== "string") {
    return false;
  }
  if (typeof todoItem?.contents !== "string") {
    return false;
  }
  if (typeof todoItem?.priority !== "string") {
    return false;
  }
  if (typeof todoItem?.isCompleted !== "boolean") {
    return false;
  }
  return true;
}
