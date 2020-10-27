import { isValidTodoItem } from "../utils/validate.js";
export default function TodoItem(props) {
  if (!isValidTodoItem(props)) {
    return "";
  }
  const { contents, isCompleted, _id, priority } = props;
  const maybeCompleted = isCompleted ? "completed" : "";
  const maybeChecked = isCompleted ? "checked" : "";

  return `
      <li data-id = ${_id} class="${maybeCompleted}">
          <div class="view">
            <input class="toggle" type="checkbox" ${maybeChecked}/>
            <label class="label">
              ${priorityTemplate(priority)}
              ${contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
        </li>
  `;
}

function priorityTemplate(priority) {
  switch (priority) {
    case "1":
      return `
        <select class="chip select primary">
            <option value="0">순위</option>
            <option value="1" selected>1순위</option>
            <option value="2">2순위</option>
        </select>`;
    case "2":
      return `
        <select class="chip select secondary">
            <option value="0">순위</option>
            <option value="1">1순위</option>
            <option value="2" selected>2순위</option>
        </select>`;
    default:
      return `
        <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
        </select>`;
  }
}
