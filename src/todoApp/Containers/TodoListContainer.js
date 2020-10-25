import TodoList from "../Components/TodoList.js";
import todoStore from "../Store/todoStore.js";

export default function TodoListContainer($target) {
  let prevActiveUserId = null;
  let prevTodoList = null;

  return () => {
    const { activeUser } = todoStore.getState();
    const activeUserId = activeUser?._id;
    const todoList = activeUser?.todoList;
    if (prevActiveUserId === activeUserId && prevTodoList === todoList) {
      return;
    }
    prevActiveUserId = activeUserId;
    prevTodoList = todoList;
    $target.innerHTML = TodoList({ todoList });
  };
}
