import UserTitle from "./Components/UserTitle";

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
    new UserTitle(document.querySelector("#user-title"), this.store);
    document.querySelector("#user-list");
    document.querySelector("#todoapp");
  }
}
