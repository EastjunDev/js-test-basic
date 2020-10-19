import UserList from "../Components/UserList.js";
import todoStore from "../Store/todoStore.js";

export default function UserListContianer($target) {
  let prevActiveUserId;
  let prevUsers;

  return () => {
    const { users, activeUserId } = todoStore.getState();
    if (activeUserId === prevActiveUserId && users === prevUsers) {
      return;
    }
    prevActiveUserId = activeUserId;
    prevUsers = users;
    target.innerHTML = UserList({ activeUser, users });
  };
}
