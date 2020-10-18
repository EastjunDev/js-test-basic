export default class App {
  #$target;
  constructor($target) {
    this.#$target = $target;
    this.render();
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
    document.querySelector("#user-title");
    document.querySelector("#user-list");
    document.querySelector("#todoapp");
  }
}
