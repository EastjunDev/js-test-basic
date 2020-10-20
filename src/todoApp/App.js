import todoStore, { setUserList } from "./Store/todoStore.js";
import UserTitleContainer from "./Containers/UserTitleContainer.js";
import UserListContainer from "./Containers/UserListContainer.js";
import { fetchTodoUsers } from "./api/todoAPI.js";

export default class App {
  #$target;
  constructor($target) {
    this.#$target = $target;
    this.render();
    this.initComponents();
  }

  render() {
    this.#$target.innerHTML = `
        <h1 id="user-title"></h1>

        <section>
          <div id="user-list"></div>
        </section>

        <main>
            <section id="todoapp" class="todoapp">
            </section>
        </main>
    `;
  }

  initComponents() {
    const $userTitle = document.querySelector("#user-title");
    const $userList = document.querySelector("#user-list");
    const $todoApp = document.querySelector("#todoapp");

    todoStore.subscribe(UserTitleContainer($userTitle));
    todoStore.subscribe(UserListContainer($userList));

    (async function () {
      const newUsers = await fetchTodoUsers();
      console.log(newUsers);
      const action = setUserList(newUsers);
      console.log(action);
      todoStore.dispath(setUserList(newUsers));
    })();
  }
}
