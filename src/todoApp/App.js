import todoStore from "./Store/todoStore.js";
import UserTitleContainer from "./Containers/UserTitleContainer.js";
import UserListContainer from "./Containers/UserListContainer.js";

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
    todoStore.subscribe(() =>
      UserTitleContainer(document.querySelector("#user-title"))
    );

    todoStore.subscribe(() =>
      UserListContainer(document.querySelector("#user-list"))
    );
    document.querySelector("#todoapp");
  }
}
