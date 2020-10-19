import UserList from "../Components/UserList.js";
import todoStroe from "../Store/todoStore.js";

export default class UserListContianer {
  constructor($target) {
    this.$target = $target;
    todoStroe.subscribe(this.render, this);
  }

  render() {
    const { activeUser, users } = todoStroe.getState();
    this.$target.innerHTML = UserList({ activeUser, users });
  }
}
