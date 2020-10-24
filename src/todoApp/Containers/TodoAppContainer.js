import TodoApp from "../Components/TodoApp.js";
import TodoInputContainer from "../Containers/TodoInputContainer.js";
import TodoListContainer from "../Containers/TodoListContainer.js";
import TodoFooterContainer from "../Containers/TodoFooterContainer.js";
import todoStore from "../Store/todoStore.js";

export default function TodoAppContainer($target) {
  function initComponents() {
    console.log("TodoAppContainer.initComponents::");
    const $todoInput = $target.querySelector(".input-container");
    const $todoList = $target.querySelector(".todo-list");
    const $todoFooter = $target.querySelector(".todo-footer");

    todoStore.subscribe(TodoInputContainer($todoInput));
    todoStore.subscribe(TodoListContainer($todoList));
    todoStore.subscribe(TodoFooterContainer($todoFooter));
  }

  let prevTarget = null;
  return () => {
    if (prevTarget === $target) {
      return;
    }
    prevTarget = $target;
    $target.innerHTML = TodoApp();
    initComponents();
  };
}
