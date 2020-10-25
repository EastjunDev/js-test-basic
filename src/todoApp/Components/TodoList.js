import { isValidTodoList } from "../utils/validate.js";
export default function TodoList(props) {
  if (!isValidTodoList(props?.todoList)) {
    return "";
  }
  console.log(props.todoList);
  return `
  `;
}
