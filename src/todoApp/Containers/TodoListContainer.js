import TodoList from "../Components/TodoList.js";
import todoStore from "../Store/todoStore.js";

export default function TodoListContainer($target) {
  let prevActiveUserId = null;
  let prevTodoList = null;

  return () => {
    const { activeUserId, todoList } = todoStore.getState();
    if (prevActiveUserId === activeUserId && prevTodoList === todoList) {
      return;
    }
    prevActiveUserId = activeUserId;
    prevTodoList = todoList;
    $target.innerHTML = TodoList();
  };
}
