import todoStore from "../Store/todoStore";

function UserTitle($target) {
  todoStore.subscribe(render);

  function render() {
    const { activeUser } = todoStore.getState();

    $target.innerHTML = `
      <span>
        <strong>${activeUser}</strong>'s Todo List
      </span>
    `;
  }
}

export default UserTitle;
