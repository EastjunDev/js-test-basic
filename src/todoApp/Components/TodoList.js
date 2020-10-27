import { isValidTodoList } from "../utils/validate.js";
import TodoItem from "./TodoItem.js";
export default function TodoList(props) {
  if (!isValidTodoList(props?.todoList)) {
    return "";
  }
  const { todoList } = props;
  return todoList.map((todoItem) => TodoItem(todoItem)).join(" ");
}
